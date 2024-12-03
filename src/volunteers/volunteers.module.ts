import { Module } from '@nestjs/common';
import { VolunteersService } from './volunteers.service';
import { VolunteersController } from './volunteers.controller';
import { VolunteersRepository } from './volunteers.repository';
import { DatabaseModule } from '@app/common/database';
import { VolunteerModel } from '@app/common/database/models';

@Module({
  imports: [DatabaseModule.forFeature([VolunteerModel])],
  controllers: [VolunteersController],
  providers: [VolunteersService, VolunteersRepository],
})
export class VolunteersModule {}
