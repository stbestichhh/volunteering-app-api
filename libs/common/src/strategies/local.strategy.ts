import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../../../src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string) {
    const [user] = await this.userService.getAll({ email });
    const pwMath = await bcrypt.compare(password, user.password);

    if (!pwMath) {
      throw new UnauthorizedException('Credentials are incorrect');
    }
    return user;
  }
}
