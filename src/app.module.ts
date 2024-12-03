import { Module } from '@nestjs/common';
import { LoggerModule } from '@app/common/logger';
import { ConfigModule } from '@app/common/config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from '@app/common/database';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { EventsModule } from './events/events.module';
import { VolunteersModule } from './volunteers/volunteers.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule,
    UsersModule,
    DatabaseModule,
    AuthModule,
    ProjectsModule,
    EventsModule,
    VolunteersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
