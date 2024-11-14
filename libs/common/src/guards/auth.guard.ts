import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PRIVATE_ACCESS_KEY } from '@app/common/decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request.isUnauthenticated()) {
      throw new UnauthorizedException();
    }

    const isPrivate = this.reflector.getAllAndOverride<boolean>(
      PRIVATE_ACCESS_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (isPrivate && process.env.NODE_ENV !== 'development') {
      throw new ForbiddenException();
    }

    return true;
  }
}
