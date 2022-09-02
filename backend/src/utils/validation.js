const Joi = require("joi");

const validateUser = (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      fullName: Joi.string().required(),
    });
  
    return schema.validate(data);
}

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  return schema.validate(data);
}

const validateAwards = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    poin: Joi.number().required(),
    type: Joi.string().valid("Vouchers", "Products", "Giftcard"),
    imageUrl: Joi.string().required()
  });

  return schema.validate(data);
}

module.exports = { validateUser, validateLogin, validateAwards }