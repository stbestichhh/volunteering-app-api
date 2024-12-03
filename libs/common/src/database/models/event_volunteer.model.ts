import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '@app/common/database/models/user.model';
import { EventModel } from '@app/common/database/models/event.model';

@Table({ tableName: 'event_volunteers' })
export class EventVolunteer extends Model<EventVolunteer> {
  @ApiProperty({
    type: 'string',
    description: 'Record uuid',
    example: 'recorduuidv7',
  })
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
  })
  id: string;

  @ApiProperty({
    type: 'string',
    description: 'User uuid',
    example: 'useruuidv7',
  })
  @Column({
    type: DataType.STRING,
  })
  @ForeignKey(() => UserModel)
  user_id: string;

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
