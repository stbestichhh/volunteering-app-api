import { Module } from '@nestjs/common';
import { VolunteersService } from './volunteers.service';
import { VolunteersController } from './volunteers.controller';
import { VolunteersRepository } from './volunteers.repository';
import { DatabaseModule } from '@app/common/database';
import {
  EventModel,
  EventVolunteer,
  VolunteerModel,
} from '@app/common/database/models';

@Module({
  imports: [
    DatabaseModule.forFeature([VolunteerModel, EventVolunteer, EventModel]),
  ],
  controllers: [VolunteersController],
  providers: [VolunteersService, VolunteersRepository],
  exports: [VolunteersService],
})
export class VolunteersModule {}
