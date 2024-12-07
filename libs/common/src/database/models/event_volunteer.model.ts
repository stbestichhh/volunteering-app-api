import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { VolunteerModel, EventModel } from '@app/common/database/models';

@Table({ tableName: 'event_volunteers', timestamps: false })
export class EventVolunteer extends Model<EventVolunteer> {
  @ApiProperty({
    type: 'number',
    description: 'Record id',
    example: 'recordid',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    type: 'string',
    description: 'User uuid',
    example: 'useruuidv7',
  })
  @Column({
    type: DataType.STRING,
  })
  @ForeignKey(() => VolunteerModel)
  volunteer_id: string;

  @ApiProperty({
    type: 'string',
    description: 'Event uuid',
    example: 'eventuuidv7',
  })
  @Column({
    type: DataType.STRING,
  })
  @ForeignKey(() => EventModel)
  event_id: string;
}
