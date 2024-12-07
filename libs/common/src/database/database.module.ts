import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoggerModule } from '@app/common/logger';
import { Logger as PinoLogger } from 'nestjs-pino';
import {
  EventModel,
  EventVolunteer,
  ProjectModel,
  VolunteerModel,
  UserModel,
} from '@app/common/database/models';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().hostname().required(),
        POSTGRES_PORT: Joi.number().port().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService, logger: Logger) => ({
        dialect: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        models: [
          UserModel,
          ProjectModel,
          EventModel,
          VolunteerModel,
          EventVolunteer,
        ],
        autoLoadModels: true,
        sync: {
          alter: true,
          force: process.env.NODE_ENV === 'development',
        },
        logging: (msg) => logger.log(msg),
      }),
      imports: [ConfigModule, LoggerModule],
      inject: [ConfigService, PinoLogger],
    }),
  ],
})
export class DatabaseModule {
  public static forFeature(entities: any[]) {
    return SequelizeModule.forFeature(entities);
  }
}
