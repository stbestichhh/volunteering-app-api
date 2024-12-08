import {
  ProjectCreationAttributes,
  ProjectStatus,
} from '@app/common/database/models/project.model';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto implements ProjectCreationAttributes {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Project name',
    example: 'MyProject',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    description: 'Project description',
    example: 'MyProject description',
  })
  description?: string;

  @IsString()
  @IsOptional()
  @IsEnum(ProjectStatus)
  @ApiProperty({
    type: 'string',
    description: 'Project status',
    example: 'OPENED',
    enum: ProjectStatus,
  })
  status: ProjectStatus;

  @IsDateString({ strict: true })
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Project start date in format (YYYY-MM-DD)',
    example: '2024-12-31',
  })
  start_date: string;

  @IsDateString({ strict: true })
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Project start date in format (YYYY-MM-DD)',
    example: '2025-12-31',
  })
  end_date: string;
}
