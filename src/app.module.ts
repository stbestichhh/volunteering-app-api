import { Module } from '@nestjs/common';
import { LoggerModule } from '@app/common/logger';
import { ConfigModule } from '@app/common/config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from '@app/common/database';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule,
    UsersModule,
    DatabaseModule,
    AuthModule,
    ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
