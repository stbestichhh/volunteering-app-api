import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { WhereOptions } from 'sequelize';
import { UserModel } from '@app/common/database/models/user.model';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'libs/common/src/guards';
import { Private } from '@app/common/decorators';

@ApiTags('Users')
@ApiCookieAuth()
@ApiUnauthorizedResponse({ description: 'User unauthorized' })
@UseGuards(AuthGuard)
@Private()
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get one user by user_id' })
  @ApiResponse({ status: HttpStatus.OK, type: UserModel })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found by id',
  })
  public async getOneById(@Param('id') userId: string) {
    return await this.userService.getOneById(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiQuery({ type: UserModel })
  @ApiResponse({ status: HttpStatus.OK, type: [UserModel] })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Users not found by query options',
  })
  public async getAll(@Query() options: WhereOptions<UserModel>) {
    return await this.userService.getAll(options);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserModel })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User already exists',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error while creating user',
  })
  public async create(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user data' })
  @ApiResponse({ status: HttpStatus.OK, type: UserModel })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found by id',
  })
  public async update(@Param('id') userId: string, @Body() dto: UpdateUserDto) {
    return await this.userService.update(userId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found by id',
  })
  public async delete(@Param('id') userId: string) {
    return await this.userService.delete(userId);
  }
}
