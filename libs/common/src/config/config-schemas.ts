import * as Joi from 'joi';

const developmentSchema = Joi.object({
  HOST: Joi.string().hostname().required(),
  PORT: Joi.number().port().required(),
});

const productionSchema = developmentSchema.append({});

export const schemas = {
  development: developmentSchema,
  production: productionSchema,
};
