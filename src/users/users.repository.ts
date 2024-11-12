import { AbstractRepository } from '@app/common/database';
import { UserModel } from '@app/common/database/models/user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersRepository extends AbstractRepository<UserModel> {
  constructor(
    @InjectModel(UserModel) protected readonly model: typeof UserModel
  ) {
    super(model);
  }
}
