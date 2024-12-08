import { AbstractRepository } from '@app/common/database';
import { ProjectModel } from '@app/common/database/models';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsRepository extends AbstractRepository<ProjectModel> {
  constructor(
    @InjectModel(ProjectModel) protected readonly model: typeof ProjectModel
  ) {
    super(model);
  }
}
