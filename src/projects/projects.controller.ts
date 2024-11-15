import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import {
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@app/common/guards';
import { CurrentUser } from '@app/common/decorators';
import { ProjectModel } from '@app/common/database/models';
import { WhereOptions } from 'sequelize';
import { CreateProjectDto } from './dto';
import { UpdateProjectDto } from './dto/updateProject.dto';

@UseGuards(AuthGuard)
@ApiTags('Projects')
@ApiCookieAuth()
@ApiUnauthorizedResponse({ description: 'User unauthorized' })
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @ApiOperation({ summary: 'Get users project by id' })
  @ApiOkResponse({ type: ProjectModel })
  @ApiNotFoundResponse({ description: 'Project not found with id' })
  @Get(':id')
  public async getOneById(
    @CurrentUser('id') ownerId: string,
    @Param('id') projectId: string
  ) {
    return await this.projectService.getOneById(ownerId, projectId);
  }

  @ApiOperation({ summary: 'Get all projects by options' })
  @ApiQuery({ type: ProjectModel })
  @ApiOkResponse({
    type: [ProjectModel],
    description: 'Got all projects or found by options',
  })
  @ApiNotFoundResponse({ description: 'No projects found using options' })
  @Get()
  public async getAll(
    @CurrentUser('id') ownerId: string,
    @Query() options: WhereOptions<ProjectModel>
  ) {
    return await this.projectService.getAll(ownerId, options);
  }

  @ApiOperation({ summary: 'Create new project' })
  @ApiOkResponse({ type: ProjectModel })
  @ApiForbiddenResponse({ description: 'Project already exists' })
  @ApiInternalServerErrorResponse({
    description: 'Error while creating new project',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @CurrentUser('id') ownerId: string,
    @Body() dto: CreateProjectDto
  ) {
    return await this.projectService.create(ownerId, dto);
  }

  @ApiOperation({ summary: 'Update project properties' })
  @ApiOkResponse({ type: ProjectModel })
  @ApiNotFoundResponse({ description: 'Project not found by id' })
  @Put(':id')
  public async update(
    @CurrentUser('id') ownerId: string,
    @Param('id') projectId: string,
    @Body() dto: UpdateProjectDto
  ) {
    return await this.projectService.update(ownerId, projectId, dto);
  }

  @ApiOperation({ description: 'Delete project by id' })
  @ApiNotFoundResponse({ description: 'Project not found by id' })
  @ApiNoContentResponse({ description: 'Project deleted' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @CurrentUser('id') ownerId: string,
    @Param('id') projectId: string
  ) {
    return await this.projectService.delete(ownerId, projectId);
  }
}
