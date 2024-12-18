import * as Joi from 'joi';

const developmentSchema = Joi.object({
  HOST: Joi.string().hostname().required(),
  PORT: Joi.number().port().required(),
  PUBLIC_CERTIFICATE_PATH: Joi.string().optional(),
  PRIVATE_KEY_PATH: Joi.string().optional(),
  SESSION_SECRET: Joi.string().required(),
  SESSION_RESAVE: Joi.boolean().optional().default(false),
  SESSION_SAVE_UNINITIALIZED: Joi.boolean().optional().default(false),
  SESSION_MAX_AGE: Joi.number().required(),
  REDIS_PASSWORD: Joi.string().required(),
  REDIS_HOST: Joi.string().hostname().optional(),
  REDIS_PORT: Joi.number().port().optional(),
  RAITO_HOST: Joi.string().hostname().optional(),
  RAITO_PORT: Joi.number().port().optional(),
});

const productionSchema = developmentSchema.append({});

export const schemas = {
  development: developmentSchema,
  production: productionSchema,
};
