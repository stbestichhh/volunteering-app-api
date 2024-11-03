import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { schemas } from './config-schemas';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      validationSchema: schemas[process.env.NODE_ENV],
    }),
  ],
})
export class ConfigModule {}
