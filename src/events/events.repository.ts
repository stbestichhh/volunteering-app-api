import { AbstractRepository } from '@app/common/database';
import { EventModel } from '@app/common/database/models';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsRepository extends AbstractRepository<EventModel> {
  constructor(
    @InjectModel(EventModel) protected readonly model: typeof EventModel
  ) {
    super(model);
  }
}
