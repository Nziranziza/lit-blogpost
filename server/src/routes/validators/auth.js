import { Joi } from 'celebrate';

const signup = {
  firstName: Joi.string()
    .required()
    .trim(),
  lastName: Joi.string()
    .required()
    .trim(),
  password: Joi.string()
    .required()
    .min(6),
  email: Joi.string()
    .email()
    .required()
    .trim(),
  gender: Joi.string().valid('Male', 'Female'),
  birthDate: Joi.date()
};

export default {
  signup
};
