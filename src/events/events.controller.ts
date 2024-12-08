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
  UseInterceptors,
} from '@nestjs/common';
import { EventsService } from './events.service';
import {
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@app/common/guards';
import { EventModel, EventStatus } from '@app/common/database/models';
import { WhereOptions } from 'sequelize';
import { CreateEventDto, UpdateEventDto } from './dto';
import { ProjectOwnerInterceptor } from '../projects/projectOwner.interceptor';
import { VolunteersService } from '../volunteers/volunteers.service';

@UseInterceptors(ProjectOwnerInterceptor)
@UseGuards(AuthGuard)
@ApiTags('Events')
@ApiCookieAuth()
@ApiUnauthorizedResponse({ description: 'User unauthorized' })
@ApiForbiddenResponse({
  description: 'User has no access to events of project found by project_id',
})
@Controller('projects/:project_id/events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly volunteersService: VolunteersService
  ) {}

  @ApiOperation({ summary: 'Get one event by its id from project' })
  @ApiOkResponse({ type: EventModel })
  @ApiNotFoundResponse({ description: 'Event not found by id' })
  @Get(':id')
  public async getOneById(
    @Param('id') eventId: string,
    @Param('project_id') projectId: string
  ) {
    return await this.eventsService.getOneById(eventId, projectId);
  }

  @ApiOperation({ summary: 'Get all events by its properties' })
  @ApiQuery({ required: false, name: 'status', enum: EventStatus })
  @ApiOkResponse({ type: EventModel })
  @ApiNotFoundResponse({ description: 'Events not found by options' })
  @Get()
  public async getAll(
    @Param('project_id') projectId: string,
    @Query() options: WhereOptions<EventModel>
  ) {
    return await this.eventsService.getAll(projectId, options);
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
    @Body() dto: CreateEventDto
  ) {
    return await this.eventsService.create(projectId, dto);
  }

  @ApiOperation({ summary: 'Update event on project' })
  @ApiOkResponse({ type: EventModel })
  @ApiNotFoundResponse({ description: 'Event not found by id' })
  @Put(':id')
  public async update(
    @Param('project_id') projectId: string,
    @Param('id') eventId: string,
    @Body() dto: UpdateEventDto
  ) {
    return await this.eventsService.update(projectId, eventId, dto);
  }

  @ApiOperation({ summary: 'Delete event from project' })
  @ApiOkResponse({ description: 'Event deleted' })
  @ApiNotFoundResponse({ description: 'Event not found by id' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  public async delete(
    @Param('id') eventId: string,
    @Param('project_id') project_id: string
  ) {
    return await this.eventsService.delete(eventId, project_id);
  }

  @ApiOperation({ summary: 'Add volunteer to the event' })
  @ApiOkResponse({ description: 'Volunteer added' })
  @ApiNotFoundResponse({ description: 'Event not found by id' })
  @ApiNotFoundResponse({ description: 'Volunteer not found by volunteer_id' })
  @Post(':id/assign/:volunteer_id')
  public async assignVolunteer(
    @Param('project_id') projectId: string,
    @Param('id') event_id: string,
    @Param('volunteer_id') volunteer_id: string
  ) {
    const event = await this.eventsService.getOneById(event_id, projectId);
    return await this.volunteersService.assignToEvent(event.id, volunteer_id);
  }

  @ApiOperation({ summary: 'Remove volunteer from the event' })
  @ApiOkResponse({ description: 'Volunteer removed' })
  @ApiNotFoundResponse({ description: 'Event not found by id' })
  @ApiNotFoundResponse({ description: 'Volunteer not found by volunteer_id' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':event_id/remove/:volunteer_id')
  public async removeVolunteer(
    @Param('project_id') projectId: string,
    @Param('id') event_id: string,
    @Param('volunteer_id') volunteer_id: string
  ) {
    const event = await this.eventsService.getOneById(event_id, projectId);
    return await this.volunteersService.removeFromEvent(event.id, volunteer_id);
  }
}
