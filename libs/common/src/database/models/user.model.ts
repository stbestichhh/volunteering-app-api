import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

export interface UserCreationAttributes {
  fullname: string;
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, UserCreationAttributes> {
  @ApiProperty({ type: 'string', description: 'Users uuid', example: 'uuidv7' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  })
  id: string;

  @ApiProperty({
    type: 'string',
    description: 'Users first and second names',
    example: 'User Name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  fullname: string;

  @ApiProperty({
    type: 'string',
    description: 'Users email address',
    example: 'user@email.com',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'Users password',
    example: 'Strongpass123!',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
