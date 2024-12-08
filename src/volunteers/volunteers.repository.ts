import { AbstractRepository } from '@app/common/database';
import { VolunteerModel } from '@app/common/database/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';

@Injectable()
export class VolunteersRepository extends AbstractRepository<VolunteerModel> {
  constructor(
    @InjectModel(VolunteerModel) protected readonly model: typeof VolunteerModel
  ) {
    super(model);
  }

  public override async findByPk(
    id: string,
    include?: sequelize.Includeable | sequelize.Includeable[]
  ): Promise<VolunteerModel> {
    return this.model.findByPk(id, { include });
  }
}
