import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserModel } from '@app/common/database/models';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  public serializeUser(
    user: UserModel,
    done: (err: Error, user: UserModel) => void
  ) {
    done(null, user);
  }

  deserializeUser(payload: any, done: (err: Error, payload: any) => void) {
    done(null, payload);
  }
}
