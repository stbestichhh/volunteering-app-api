import { Module } from '@nestjs/common';
import { LoggerModule } from '@app/common/logger';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      validationSchema: Joi.object({
        HOST: Joi.string().hostname(),
        PORT: Joi.number().port(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
