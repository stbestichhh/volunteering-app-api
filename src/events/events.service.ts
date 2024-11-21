import { ForbiddenException, Injectable } from '@nestjs/common';
import { EventsRepository } from './events.repository';
import { WhereOptions } from 'sequelize';
import { EventModel } from '@app/common/database/models';
import { ProjectsRepository } from '../projects/projects.repository';
import { CreateEventDto, UpdateEventDto } from './dto';

@Injectable()
export class EventsService {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly projectsRepository: ProjectsRepository
  ) {}

  public async getOneById(
    ownerId: string,
    eventId: string,
    project_id: string
  ) {
    const event = await this.eventsRepository.findOne({
      id: eventId,
      project_id,
    });

    if (event.project.user_id !== ownerId) {
      throw new ForbiddenException();
    }
    return event;
  }

  public async getOne(
    ownerId: string,
    project_id: string,
    options?: WhereOptions<EventModel>
  ) {
    const event = await this.eventsRepository.findOne({
      ...options,
      project_id,
    });

    if (event.project.user_id !== ownerId) {
      throw new ForbiddenException();
    }
    return event;
  }

  public async getAll(
    ownerId: string,
    project_id: string,
    options?: WhereOptions<EventModel>
  ) {
    await this.checkProjectOwner(project_id, ownerId);
    return await this.eventsRepository.findAll({
      ...options,
      project_id,
    });
  }

  public async create(
    ownerId: string,
    project_id: string,
    dto: CreateEventDto
  ) {
    await this.checkProjectOwner(project_id, ownerId);
    const found = await this.eventsRepository
      .findOne({
        project_id,
        name: dto.name,
      })
      .catch();
    if (found) {
      throw new ForbiddenException(`Event ${dto.name} already exists`);
    }

    return await this.eventsRepository.create({
      ...dto,
      project_id,
    });
  }

  public async update(
    ownerId: string,
    projectId: string,
    eventId: string,
    dto: UpdateEventDto
  ) {
    await this.checkProjectOwner(projectId, ownerId);
    const event = await this.getOneById(ownerId, eventId, projectId);
    return await event.set(dto).save();
  }

  public async delete(ownerId: string, projectId: string, eventId: string) {
    await this.checkProjectOwner(projectId, ownerId);
    return await this.eventsRepository.delete(eventId);
  }

  private async checkProjectOwner(project_id: string, ownerId: string) {
    const project = await this.projectsRepository.findByPk(project_id);
    if (project.user_id !== ownerId) {
      throw new ForbiddenException();
    }
    return project;
  }
}
