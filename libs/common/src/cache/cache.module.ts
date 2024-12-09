import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      validationSchema: Joi.object({
        CACHE_TTL: Joi.number().required(),
        REDIS_HOST: Joi.string().hostname().required(),
        REDIS_PORT: Joi.number().port().required(),
      }),
    }),
  ],
})
export class CacheModule {
  public static registerAsync() {
    return NestCacheModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
          },
          ttl: configService.get<number>('CACHE_TTL'),
          password: configService.get<string>('REDIS_PASSWORD'),
        }),
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    });
  }
}
