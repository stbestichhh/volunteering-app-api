import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsRepository } from './events.repository';
import { ProjectsRepository } from '../projects/projects.repository';
import { DatabaseModule } from '@app/common/database';
import { EventModel, ProjectModel } from '@app/common/database/models';

@Module({
  imports: [DatabaseModule.forFeature([EventModel, ProjectModel])],
  providers: [EventsService, EventsRepository, ProjectsRepository],
  controllers: [EventsController],
})
export class EventsModule {}
