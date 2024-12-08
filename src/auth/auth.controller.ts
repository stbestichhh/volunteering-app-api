import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto';
import { UsersService } from '../users/users.service';
import { UserModel } from '@app/common/database/models';
import e from 'express';
import { LocalGuard } from 'libs/common/src/guards';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create new user account' })
  @ApiOkResponse({ type: UserModel })
  @ApiForbiddenResponse({ description: 'User already exists' })
  @ApiInternalServerErrorResponse({
    description: 'Unexpected error while creating new user',
  })
  @Post('/signup')
  public async create(@Body() dto: CreateUserDto) {
    return await this.usersService.create(dto);
  }

  @ApiOperation({ summary: 'Login to user account' })
  @ApiOkResponse({ type: UserModel })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'myemail@email.com' },
        password: { type: 'string', example: 'mystrongpass' },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Email or password is incorrect' })
  @UseGuards(LocalGuard)
  @Post('/signin')
  public async login(@Request() req: e.Request) {
    return req.user;
  }

  @ApiOperation({ summary: 'Logout from current session' })
  @ApiOkResponse({ description: 'Destroy current user session' })
  @ApiInternalServerErrorResponse({
    description: 'Error on destroying current session',
  })
  @Get('/logout')
  public async logout(@Request() req: e.Request) {
    req.session.destroy((err: Error) => {
      if (err) throw new InternalServerErrorException(err);
    });
    return { message: 'User sesion has been destroyed' };
  }
}
