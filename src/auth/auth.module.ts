import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { SessionSerializer } from './session.serializer';
import { LocalStrategy } from '@app/common/strategies';

@Module({
  providers: [SessionSerializer, LocalStrategy],
  imports: [UsersModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
})
export class AuthModule {}
