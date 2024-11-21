import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { ProjectModel } from '@app/common/database/models/project.model';

export enum EventStatus {
  OPENED = 'OPENED',
  CLOSED = 'CLOSED',
  IN_PROGRESS = 'IN_PROGRESS',
}

export interface EventCreationAttributes {
  name: string;
  description?: string;
  status?: EventStatus;
  start_date: string;
  end_date: string;
  project_id: string;
}

@Table({ tableName: 'events', timestamps: true })
export class EventModel extends Model<EventModel, EventCreationAttributes> {
  @ApiProperty({
    type: 'string',
    description: 'Event uuid',
    example: 'eventuuidv7',
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
    description: 'Event name',
    example: 'MyEvent',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'Event description',
    example: 'MyEvent description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string;

  @ApiProperty({
    type: 'string',
    description: 'Event status',
    example: 'OPENED',
  })
  @Column({
    type: DataType.ENUM(
      EventStatus.OPENED,
      EventStatus.CLOSED,
      EventStatus.IN_PROGRESS
    ),
    allowNull: true,
  })
  status?: EventStatus;

  @ApiProperty({
    type: 'string',
    description: 'Event start date in format (YYYY-MM-DD)',
    example: '2024-12-31',
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  start_date: string;

  @ApiProperty({
    type: 'string',
    description: 'Event end date in format (YYYY-MM-DD)',
    example: '2025-12-31',
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  end_date: string;

  @ApiProperty({
    type: 'string',
    description: 'Project id',
    example: 'projectuuidv7',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ForeignKey(() => ProjectModel)
  project_id: string;

  @BelongsTo(() => ProjectModel)
  project: ProjectModel;
}
