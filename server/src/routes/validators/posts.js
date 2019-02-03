import { Joi } from 'celebrate';

const comment = {
  text: Joi.string()
    .required()
    .min(2)
};

export default { comment };
