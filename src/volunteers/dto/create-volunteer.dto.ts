import { VolunteerCreationAttributes } from '@app/common/database/models';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';

export class CreateVolunteerDto implements VolunteerCreationAttributes {
  @ApiProperty({
    type: 'string',
    description: 'Volunteers full name',
    example: 'Full Name',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z][a-zA-Z'-]+ [A-Z][a-zA-Z'-]+(?: [A-Z][a-zA-Z'-]+)*$/, {
    message: 'Fullname must be type of: Name Surname',
  })
  fullname: string;

  @ApiProperty({
    type: 'string',
    description: 'Volunteers email',
    example: 'volunteer@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'Volunteers phone number',
    example: '0987654321',
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;
}
