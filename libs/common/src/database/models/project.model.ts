import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '@app/common/database/models/user.model';
import { EventModel } from '@app/common/database/models/event.model';

export enum ProjectStatus {
  OPENED = 'OPENED',
  CLOSED = 'CLOSED',
  IN_PROGRESS = 'IN_PROGRESS',
}

export interface ProjectCreationAttributes {
  name: string;
  description?: string;
  status?: ProjectStatus;
  start_date: string;
  end_date: string;
}

@Table({ tableName: 'projects', timestamps: true })
export class ProjectModel extends Model<
  ProjectModel,
  ProjectCreationAttributes
> {
  @ApiProperty({
    type: 'string',
    description: 'Project uuid',
    example: 'uuidv7',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  })
  id: string;

  @ApiProperty({
    type: 'string',
    description: 'Project name',
    example: 'MyProject',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'Project description',
    example: 'MyProject description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string;

  @ApiProperty({
    type: 'string',
    description: 'Project status',
    example: 'OPENED',
    enum: ProjectStatus,
  })
  @Column({
    type: DataType.ENUM(
      ProjectStatus.OPENED,
      ProjectStatus.CLOSED,
      ProjectStatus.IN_PROGRESS
    ),
    allowNull: true,
  })
  status?: ProjectStatus;

  @ApiProperty({
    type: 'string',
    description: 'Owner id',
    example: 'useruuidv7',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ForeignKey(() => UserModel)
  user_id: string;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @ApiProperty({
    type: 'string',
    description: 'Project start date in format (YYYY-MM-DD)',
    example: '2024-12-31',
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  start_date: string;

  @ApiProperty({
    type: 'string',
    description: 'Project end date in format (YYYY-MM-DD)',
    example: '2025-12-31',
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  end_date: string;

  @HasMany(() => EventModel)
  events: Array<EventModel>;
}
