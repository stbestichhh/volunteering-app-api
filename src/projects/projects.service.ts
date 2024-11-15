import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from './projects.repository';
import { WhereOptions } from 'sequelize';
import { ProjectModel } from '@app/common/database/models';
import { ProjectDto } from './dto';
import { CreationAttributes } from 'sequelize/types/model';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectRespository: ProjectsRepository) {}

  public async getOneById(ownerId: string, projectId: string) {
    return await this.projectRespository.findOne({
      id: projectId,
      user_id: ownerId,
    });
  }

  public async getAll(ownerId: string, options: WhereOptions<ProjectModel>) {
    return await this.projectRespository.findAll({
      ...options,
      user_id: ownerId,
    });
  }

  public async create(ownerId: string, dto: ProjectDto) {
    return await this.projectRespository.create({
      ...dto,
      user_id: ownerId,
    } as CreationAttributes<ProjectModel>);
  }

  public async update(ownerId: string, projectId: string, dto: ProjectDto) {
    const project = await this.getOneById(ownerId, projectId);
    return await project.set(dto).save();
  }

  public async delete(ownerId: string, projectId: string) {
    const project = await this.getOneById(ownerId, projectId);
    return await project.destroy();
  }
}
