import { AbstractRepository } from '@app/common/database';
import { EventModel } from '@app/common/database/models';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
import sequelize from 'sequelize';

@Injectable()
export class EventsRepository extends AbstractRepository<EventModel> {
  constructor(
    @InjectModel(EventModel) protected readonly model: typeof EventModel
  ) {
    super(model);
  }

  public override async findOne(
    options: sequelize.WhereOptions<EventModel>,
    include?: sequelize.Includeable | sequelize.Includeable[]
  ): Promise<EventModel> {
    const entity = await this.model.findOne({ where: options, include });
    if (!entity) {
      throw new NotFoundException(
        `Entity ${this.model.name} not found by options: ${JSON.stringify(options)}`
      );
    }
    return entity as EventModel;
  }
}
