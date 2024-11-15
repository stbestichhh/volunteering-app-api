import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { DatabaseModule } from '@app/common/database';
import { ProjectModel } from '@app/common/database/models';
import { ProjectsRepository } from './projects.repository';

@Module({
  providers: [ProjectsService, ProjectsRepository],
  controllers: [ProjectsController],
  imports: [DatabaseModule.forFeature([ProjectModel])],
})
export class ProjectsModule {}
