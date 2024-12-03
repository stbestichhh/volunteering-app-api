import { Injectable } from '@nestjs/common';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { VolunteersRepository } from './volunteers.repository';
import { WhereOptions } from 'sequelize';
import { VolunteerModel } from '@app/common/database/models';

@Injectable()
export class VolunteersService {
  constructor(private readonly volunteersRepository: VolunteersRepository) {}

  public async create(createVolunteerDto: CreateVolunteerDto) {
    const volunteer =
      await this.volunteersRepository.create(createVolunteerDto);
    await volunteer.$set('events', []);
    return volunteer;
  }

  public async findAll(options: WhereOptions<VolunteerModel>) {
    return await this.volunteersRepository.findAll(options);
  }

  public async findOne(options: WhereOptions<VolunteerModel>) {
    return await this.volunteersRepository.findOne(options);
  }

  public async findOneByPk(volunteer_id: string) {
    return await this.volunteersRepository.findByPk(volunteer_id);
  }

  public async update(
    volunteer_id: string,
    updateVolunteerDto: UpdateVolunteerDto
  ) {
    return await this.volunteersRepository.update(
      volunteer_id,
      updateVolunteerDto
    );
  }

  public async delete(volunteer_id: string) {
    return await this.volunteersRepository.delete(volunteer_id);
  }

  public async assignToEvent(event_id: string, volunteer_id: string) {
    const volunteer = await this.volunteersRepository.findByPk(volunteer_id);
    await volunteer.$add('events', event_id);
  }

  public async removeFromEvent(event_id: string, volunteer_id: string) {
    const volunteer = await this.volunteersRepository.findByPk(volunteer_id);
    await volunteer.$remove('events', event_id);
  }
}
