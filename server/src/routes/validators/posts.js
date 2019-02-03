import { Joi } from 'celebrate';

const createPost = {
  title: Joi.string()
    .trim()
    .required(),
  text: Joi.string()
    .trim()
    .required()
    .min(50),
  tags: Joi.array().items(Joi.string().trim())
};

const comment = {
  text: Joi.string()
    .required()
    .min(2)
};

export default { comment, createPost };
