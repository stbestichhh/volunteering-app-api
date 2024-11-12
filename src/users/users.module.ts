import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '@app/common/database';
import { UserModel } from '@app/common/database/models/user.model';
import { UsersRepository } from './users.repository';

@Module({
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  imports: [DatabaseModule.forFeature([UserModel])],
})
export class UsersModule {}
