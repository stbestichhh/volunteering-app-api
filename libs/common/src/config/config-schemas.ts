import * as Joi from 'joi';

const developmentSchema = Joi.object({
  HOST: Joi.string().hostname().optional(),
  PORT: Joi.number().port().optional(),
});

const productionSchema = developmentSchema.append({});

export const schemas = {
  development: developmentSchema,
  production: productionSchema,
};
