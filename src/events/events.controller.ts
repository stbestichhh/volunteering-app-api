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
import { EventsService } from './events.service';
import {
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@app/common/guards';
import { CurrentUser } from '@app/common/decorators';
import { EventModel } from '@app/common/database/models';
import { WhereOptions } from 'sequelize';
import { CreateEventDto, UpdateEventDto } from './dto';

@UseGuards(AuthGuard)
@ApiTags('Events')
@ApiCookieAuth()
@ApiUnauthorizedResponse({ description: 'User unauthorized' })
@ApiForbiddenResponse({
  description: 'User has no access to events of project found by project_id',
})
@Controller('projects/:project_id/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiOperation({ summary: 'Get one event by its id from project' })
  @ApiOkResponse({ type: EventModel })
  @ApiNotFoundResponse({ description: 'Event not found by id' })
  @Get(':id')
  public async getOneById(
    @Param('id') eventId: string,
    @Param('project_id') projectId: string,
    @CurrentUser('id') ownerId: string
  ) {
    return await this.eventsService.getOneById(ownerId, eventId, projectId);
  }

  @ApiOperation({ summary: 'Get one event by its properties' })
  @ApiOkResponse({ type: EventModel })
  @ApiNotFoundResponse({ description: 'Event not found by options' })
  @Get()
  public async getOne(
    @Param('project_id') projectId: string,
    @CurrentUser('id') ownerId: string,
    @Query() options: WhereOptions<EventModel>
  ) {
    return await this.eventsService.getOne(ownerId, projectId, options);
  }

  @ApiOperation({ summary: 'Get all events by its properties' })
  @ApiOkResponse({ type: EventModel })
  @ApiNotFoundResponse({ description: 'Events not found by options' })
  @Get('/all')
  public async getAll(
    @Param('project_id') projectId: string,
    @CurrentUser('id') ownerId: string,
    @Query() options: WhereOptions<EventModel>
  ) {
    return await this.eventsService.getAll(ownerId, projectId, options);
  }

  @ApiOperation({ summary: 'Create new event on project' })
  @ApiOkResponse({ type: EventModel })
  @ApiForbiddenResponse({
    description: 'Event with the same name already exists on project',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error while creating new event',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(
    @Param('project_id') projectId: string,
    @CurrentUser('id') ownerId: string,
    @Body() dto: CreateEventDto
  ) {
    return await this.eventsService.create(ownerId, projectId, dto);
  }

  @ApiOperation({ summary: 'Update event on project' })
  @ApiOkResponse({ type: EventModel })
  @ApiNotFoundResponse({ description: 'Event not found by id' })
  @Put(':id')
  public async update(
    @Param('project_id') projectId: string,
    @Param('id') eventId: string,
    @CurrentUser('id') ownerId: string,
    @Body() dto: UpdateEventDto
  ) {
    return await this.eventsService.update(ownerId, projectId, eventId, dto);
  }

  @ApiOperation({ summary: 'Delete event from project' })
  @ApiOkResponse({ description: 'Event deleted' })
  @ApiNotFoundResponse({ description: 'Event not found by id' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  public async delete(
    @Param('project_id') projectId: string,
    @Param('id') eventId: string,
    @CurrentUser('id') ownerId: string
  ) {
    return await this.eventsService.delete(ownerId, projectId, eventId);
  }
}
