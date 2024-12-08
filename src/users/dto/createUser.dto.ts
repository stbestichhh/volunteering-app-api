import { UserCreationAttributes } from '@app/common/database/models/user.model';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements UserCreationAttributes {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z][a-zA-Z'-]+ [A-Z][a-zA-Z'-]+(?: [A-Z][a-zA-Z'-]+)*$/, {
    message: 'Fullname must be type of: Name Surname',
  })
  @ApiProperty({
    type: 'string',
    description: 'Users name and surname',
    example: 'My Name',
  })
  fullname: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: 'string',
    description: 'Users email',
    example: 'myemail@email.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({}, { message: 'Password is not strong enough' })
  @Length(4, 16, {
    message: 'Password length must be between 4 and 16 characters length',
  })
  @ApiProperty({
    type: 'string',
    description: 'Users password',
    example: 'mystrongpass',
  })
  password: string;
}
