import { Model, ModelCtor } from 'sequelize-typescript';
import { CreationAttributes } from 'sequelize/types/model';
import { v7 as uuidv7 } from 'uuid';
import {
  ForbiddenException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ValidationError, WhereOptions } from 'sequelize';

export abstract class AbstractRepository<TModel extends Model> {
  protected readonly logger: Logger = new Logger(AbstractRepository.name);

  protected constructor(protected readonly model: ModelCtor<TModel>) {}

  public async create(dto: CreationAttributes<TModel>) {
    return (await this.model
      .create({
        id: uuidv7(),
        ...dto,
      })
      .catch((e) => {
        if (e instanceof ValidationError) {
          throw new ForbiddenException(e.message);
        }
        this.logger.error(e);
        throw new InternalServerErrorException();
      })) as TModel;
  }

  public async findByPk(id: string) {
    const entity = await this.model.findByPk(id);
    if (!entity) {
      throw new NotFoundException(
        `Entity ${this.model.name} not found by id: ${id}`
      );
    }
    return entity as TModel;
  }

  public async findOne(options: WhereOptions<TModel>) {
    const entity = await this.model.findOne({ where: options });
    if (!entity) {
      throw new NotFoundException(
        `Entity ${this.model.name} not found by options: ${options}`
      );
    }
    return entity as TModel;
  }

  public async findAll(options?: WhereOptions<TModel>) {
    const entities = await this.model.findAll({ where: options });
    if (!entities.length) {
      throw new NotFoundException(
        `Entity ${this.model.name} not found by options: ${options}`
      );
    }
    return entities as Array<TModel>;
  }

  public async update(id: string, dto: Partial<TModel>) {
    const entity = await this.findByPk(id);
    return await entity.set(dto).save();
  }

  public async delete(id: string) {
    const entity = await this.findByPk(id);
    return await entity.destroy();
  }
}
