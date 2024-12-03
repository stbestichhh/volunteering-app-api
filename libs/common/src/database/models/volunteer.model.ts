import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { EventModel } from '@app/common/database/models/event.model';
import { EventVolunteer } from '@app/common/database/models/event_volunteer.model';

export interface VolunteerCreationAttributes {
  fullname: string;
  email: string;
  phone_number: string;
}

@Table({ tableName: 'volunteers' })
export class VolunteerModel extends Model<
  VolunteerModel,
  VolunteerCreationAttributes
> {
  @ApiProperty({
    type: 'string',
    description: 'Volunteer uuid',
    example: 'volunteeruuidv7',
  })
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  })
  id: string;

  @ApiProperty({
    type: 'string',
    description: 'Volunteers full name',
    example: 'Full Name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  fullname: string;

  @ApiProperty({
    type: 'string',
    description: 'Volunteers email',
    example: 'volunteer@gmail.com',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'Volunteers phone number',
    example: '0987654321',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone_number: string;

  @ApiProperty({
    description: 'Events on which volunteers takes part',
  })
  @BelongsToMany(() => EventModel, () => EventVolunteer)
  events: Array<EventModel>;
}
