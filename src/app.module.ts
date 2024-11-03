import { Module } from '@nestjs/common';
import { LoggerModule } from '@app/common/logger';

@Module({
  imports: [LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
