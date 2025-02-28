import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Put,
  UseGuards,
  Request,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto';
import { UserModel } from '@app/common/database/models/user.model';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'libs/common/src/guards';
import { CurrentUser } from '@app/common/decorators';
import e from 'express';

@ApiTags('Current user')
@ApiCookieAuth()
@ApiUnauthorizedResponse({ description: 'User unauthorized' })
@UseGuards(AuthGuard)
@Controller('users/me')
export class CurrentUserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get current user data by id' })
  @ApiResponse({ status: HttpStatus.OK, type: UserModel })
  public async getCurrentUser(@CurrentUser('id') currentUserId: string) {
    return await this.userService.getOneById(currentUserId);
  }

  @Put()
  @ApiOperation({ summary: 'Update current user data' })
  @ApiResponse({ status: HttpStatus.OK, type: UserModel })
  public async update(
    @CurrentUser('id') currentUserId: string,
    @Body() dto: UpdateUserDto,
    @Request() req: e.Request
  ) {
    await this.userService.update(currentUserId, dto);
    req.session.destroy((err: Error) => {
      if (err) throw new InternalServerErrorException(err);
    });
  }
}
