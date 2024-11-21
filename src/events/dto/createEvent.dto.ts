import {
  EventCreationAttributes,
  EventStatus,
} from '@app/common/database/models';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEventDto implements EventCreationAttributes {
  @ApiProperty({
    type: 'string',
    description: 'Event name',
    example: 'MyEvent',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'Event description',
    example: 'MyEvent description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: 'string',
    description: 'Event status',
    example: 'OPENED',
  })
  @IsString()
  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;

  @ApiProperty({
    type: 'string',
    description: 'Event start date in format (YYYY-MM-DD)',
    example: '2024-12-31',
  })
  @IsDateString({ strict: true })
  @IsNotEmpty()
  start_date: string;

  @ApiProperty({
    type: 'string',
    description: 'Event end date in format (YYYY-MM-DD)',
    example: '2025-12-31',
  })
  @IsDateString({ strict: true })
  @IsNotEmpty()
  end_date: string;

  @ApiProperty({
    type: 'string',
    description: 'Project id',
    example: 'projectuuidv7',
  })
  @IsString()
  @IsNotEmpty()
  project_id: string;
}
