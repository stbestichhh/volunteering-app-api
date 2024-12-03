import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { VolunteersService } from './volunteers.service';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { AuthGuard } from '@app/common/guards';
import {
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { VolunteerModel } from '@app/common/database/models';
import { WhereOptions } from 'sequelize';
import { Private } from '@app/common/decorators';

@UseGuards(AuthGuard)
@ApiTags('Volunteers')
@ApiCookieAuth()
@ApiUnauthorizedResponse({ description: 'User unauthorized' })
@Controller('/volunteers')
export class VolunteersController {
  constructor(private readonly volunteersService: VolunteersService) {}

  @ApiOperation({
    summary: 'Add new volunteer to the public volunteers database',
  })
  @ApiOkResponse({ type: VolunteerModel })
  @ApiForbiddenResponse({ description: 'Volunteer already exists' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() createVolunteerDto: CreateVolunteerDto) {
    return await this.volunteersService.create(createVolunteerDto);
  }

  @ApiOperation({ summary: 'Get all volunteers from the public db' })
  @ApiOkResponse({ type: [VolunteerModel] })
  @ApiNotFoundResponse({ description: 'Volunteers not found by options' })
  @ApiQuery({ type: VolunteerModel })
  @Get('/all')
  public async findAll(@Query() options: WhereOptions<VolunteerModel>) {
    return await this.volunteersService.findAll(options);
  }

  @ApiOperation({ summary: 'Get volunteer from the public db by volunteer_id' })
  @ApiOkResponse({ type: VolunteerModel })
  @ApiNotFoundResponse({ description: 'Volunteer not found by volunteer_id' })
  @Get(':id')
  public async findOneById(@Param('id') volunteer_id: string) {
    return await this.volunteersService.findOneByPk(volunteer_id);
  }

  @ApiOperation({ summary: 'Get one volunteer from the public db' })
  @ApiOkResponse({ type: VolunteerModel })
  @ApiNotFoundResponse({ description: 'Volunteer not found by options' })
  @ApiQuery({ type: VolunteerModel })
  @Get()
  public async findOne(@Query() options: WhereOptions<VolunteerModel>) {
    return await this.volunteersService.findOne(options);
  }

  @ApiOperation({ summary: 'Update volunteer data' })
  @ApiOkResponse({ type: VolunteerModel })
  @ApiNotFoundResponse({ description: 'volunteer not found by id' })
  @Patch(':id')
  public async update(
    @Param('id') volunteer_id: string,
    @Body() updateVolunteerDto: UpdateVolunteerDto
  ) {
    return this.volunteersService.update(volunteer_id, updateVolunteerDto);
  }

  @ApiOperation({ summary: 'Delete volunteer from public db' })
  @ApiOkResponse({ description: 'Volunteer deleted' })
  @ApiNotFoundResponse({ description: 'Volunteer not found by id' })
  @Private()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async remove(@Param('id') volunteer_id: string) {
    return this.volunteersService.delete(volunteer_id);
  }
}
