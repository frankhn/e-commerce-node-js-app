import { Joi } from 'celebrate';

export const userSignupSchema = Joi.object().keys({
  name: Joi.string().lowercase().min(3).max(20)
    .trim()
    .required(),
  email: Joi.string().email().trim()
    .required(),
  password: Joi.string().trim().required()
});

export const userLogin = Joi.object().keys({
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required()
});
