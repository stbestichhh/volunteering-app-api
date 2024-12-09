import { Module } from '@nestjs/common';
import { LoggerModule } from '@app/common/logger';
import { ConfigModule } from '@app/common/config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from '@app/common/database';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { EventsModule } from './events/events.module';
import { VolunteersModule } from './volunteers/volunteers.module';
import { AppController } from './app.controller';
import { CacheModule } from '@app/common/cache';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/cache-manager';

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
    CacheModule.registerAsync(),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
