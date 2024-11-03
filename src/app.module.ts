import { Module } from '@nestjs/common';
import { LoggerModule } from '@app/common/logger';
import { ConfigModule } from '@app/common/config';

@Module({
  imports: [LoggerModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
