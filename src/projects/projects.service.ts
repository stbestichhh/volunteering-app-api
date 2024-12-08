import { ForbiddenException, Injectable } from '@nestjs/common';
import { ProjectsRepository } from './projects.repository';
import { WhereOptions } from 'sequelize';
import { ProjectModel } from '@app/common/database/models';
import { CreateProjectDto } from './dto';
import { CreationAttributes } from 'sequelize/types/model';
import { UpdateProjectDto } from './dto/updateProject.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  public async getOneById(ownerId: string, projectId: string) {
    return await this.projectsRepository.findOne({
      id: projectId,
      user_id: ownerId,
    });
  }

  public async getAll(ownerId: string, options: WhereOptions<ProjectModel>) {
    return await this.projectsRepository.findAll({
      ...options,
      user_id: ownerId,
    });
  }

  public async create(ownerId: string, dto: CreateProjectDto) {
    const found = await this.projectsRepository
      .findOne({
        name: dto.name,
        user_id: ownerId,
      })
      .catch(() => false);
    if (found) {
      throw new ForbiddenException(`Project ${dto.name} already exists`);
    }

    return await this.projectsRepository.create({
      ...dto,
      user_id: ownerId,
    } as CreationAttributes<ProjectModel>);
  }

  public async update(
    ownerId: string,
    projectId: string,
    dto: UpdateProjectDto
  ) {
    const project = await this.getOneById(ownerId, projectId);
    return await project.set(dto).save();
  }

  public async delete(ownerId: string, projectId: string) {
    const project = await this.getOneById(ownerId, projectId);
    return await project.destroy();
  }
}
