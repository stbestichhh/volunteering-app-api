import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { RaitoModule } from '@raito-cache/nestjs';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      validationSchema: Joi.object({
        CACHE_TTL: Joi.number().required(),
        RAITO_HOST: Joi.string().hostname().required(),
        RAITO_PORT: Joi.number().port().required(),
      }),
    }),
  ],
})
export class CacheModule {
  public static registerAsync() {
    return RaitoModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        port: configService.get<number>('RAITO_PORT'),
        host: configService.get<string>('RAITO_HOST'),
        ttl: configService.get<number>('CACHE_TTL'),
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    });
  }
}
