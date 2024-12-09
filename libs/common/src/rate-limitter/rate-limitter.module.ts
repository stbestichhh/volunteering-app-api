import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      validationSchema: Joi.object({
        THROTTLE_TTL: Joi.number().required(),
        THROTTLE_LIMIT: Joi.number().required(),
      }),
    }),
    ThrottlerModule.forRootAsync({
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.get<number>('THROTTLE_TTL'),
          limit: configService.get<number>('THROTTLE_LIMIT'),
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
})
export class RateLimitterModule {}
