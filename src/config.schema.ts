import * as Joi from 'joi';

export const configSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_PASSWORD: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
});
