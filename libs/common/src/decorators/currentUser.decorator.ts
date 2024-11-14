import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserModel } from '@app/common/database/models';

export const CurrentUser = createParamDecorator(
  (data: keyof UserModel, context: ExecutionContext) => {
    const user: UserModel = context.switchToHttp().getRequest().user;
    return data ? user[data] : user;
  }
);
