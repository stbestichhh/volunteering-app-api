import { Module } from '@nestjs/common';
import { LoggerModule } from '@app/common/logger';
import { ConfigModule } from '@app/common/config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from '@app/common/database';

@Module({
  imports: [LoggerModule, ConfigModule, UsersModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
