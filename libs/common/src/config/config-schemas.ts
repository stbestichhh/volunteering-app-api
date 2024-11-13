import * as Joi from 'joi';

const developmentSchema = Joi.object({
  HOST: Joi.string().hostname().required(),
  PORT: Joi.number().port().required(),
  SESSION_SECRET: Joi.string().required(),
  SESSION_RESAVE: Joi.boolean().optional().default(false),
  SESSION_SAVE_UNINITIALIZED: Joi.boolean().optional().default(false),
  SESSION_MAX_AGE: Joi.number().required(),
});

const productionSchema = developmentSchema.append({});

export const schemas = {
  development: developmentSchema,
  production: productionSchema,
};
