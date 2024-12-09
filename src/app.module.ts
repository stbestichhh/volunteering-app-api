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
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ThrottlerGuard } from '@nestjs/throttler';
import { RateLimitterModule } from '@app/common/rate-limitter';

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
    RateLimitterModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
