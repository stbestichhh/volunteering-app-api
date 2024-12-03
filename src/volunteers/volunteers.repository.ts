import { AbstractRepository } from '@app/common/database';
import { VolunteerModel } from '@app/common/database/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class VolunteersRepository extends AbstractRepository<VolunteerModel> {
  constructor(
    @InjectModel(VolunteerModel) protected readonly model: typeof VolunteerModel
  ) {
    super(model);
  }
}
