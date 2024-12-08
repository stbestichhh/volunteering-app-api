import { ForbiddenException, Injectable } from '@nestjs/common';
import { EventsRepository } from './events.repository';
import { WhereOptions } from 'sequelize';
import { EventModel, VolunteerModel } from '@app/common/database/models';
import { CreateEventDto, UpdateEventDto } from './dto';
import { CreationAttributes } from 'sequelize/types/model';

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  public async getOneById(eventId: string, project_id: string) {
    return await this.eventsRepository.findOne(
      {
        id: eventId,
        project_id,
      },
      VolunteerModel
    );
  }

  public async getAll(project_id: string, options?: WhereOptions<EventModel>) {
    return await this.eventsRepository.findAll({
      ...options,
      project_id,
    });
  }

  public async create(project_id: string, dto: CreateEventDto) {
    const found = await this.eventsRepository
      .findOne({
        project_id,
        name: dto.name,
      })
      .catch(() => false);
    if (found) {
      throw new ForbiddenException(`Event ${dto.name} already exists`);
    }

    return await this.eventsRepository.create({
      ...dto,
      project_id,
    } as CreationAttributes<EventModel>);
  }

  public async update(projectId: string, eventId: string, dto: UpdateEventDto) {
    const event = await this.getOneById(eventId, projectId);
    return await event.set(dto).save();
  }

  public async delete(eventId: string, project_id: string) {
    const event = await this.getOneById(eventId, project_id);
    return await event.destroy();
  }
}
