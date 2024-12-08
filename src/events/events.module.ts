import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsRepository } from './events.repository';
import { ProjectsRepository } from '../projects/projects.repository';
import { DatabaseModule } from '@app/common/database';
import {
  EventModel,
  ProjectModel,
  VolunteerModel,
} from '@app/common/database/models';
import { VolunteersModule } from '../volunteers/volunteers.module';

@Module({
  imports: [
    DatabaseModule.forFeature([EventModel, ProjectModel, VolunteerModel]),
    VolunteersModule,
  ],
  providers: [EventsService, EventsRepository, ProjectsRepository],
  controllers: [EventsController],
})
export class EventsModule {}
