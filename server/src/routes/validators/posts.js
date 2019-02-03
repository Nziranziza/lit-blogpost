import { Joi } from 'celebrate';

const post = {
  title: Joi.string()
    .trim()
    .required(),
  text: Joi.string()
    .trim()
    .required()
    .min(50),
  tags: Joi.array().items(Joi.string().trim())
};

export default post;
