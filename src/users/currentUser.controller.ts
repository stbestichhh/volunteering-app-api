import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
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
    @Body() dto: UserDto
  ) {
    return await this.userService.update(currentUserId, dto);
  }
}
