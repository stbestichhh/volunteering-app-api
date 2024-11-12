import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserDto } from './dto/user.dto';
import { WhereOptions } from 'sequelize';
import { UserModel } from '@app/common/database/models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  public async getOneById(userId: string) {
    return await this.userRepository.findByPk(userId);
  }

  public async getAll(options?: WhereOptions<UserModel>) {
    return await this.userRepository.findAll(options);
  }

  public async create(dto: UserDto) {
    const hash = await this.hashPassword(dto.password);
    return await this.userRepository.create({
      password: hash,
      ...dto,
    });
  }

  public async update(userId: string, dto: UserDto) {
    return await this.userRepository.update(userId, dto);
  }

  public async delete(userId: string) {
    return await this.userRepository.delete(userId);
  }

  private async hashPassword(password: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }
}
