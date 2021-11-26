// Dependencies
const Joi = require('joi');

const user = (userToValidate) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50).required().email(),
    username: Joi.string().min(3).max(25).required(),
    password: Joi.string().min(6).max(300).required()
  });

  return schema.validate(userToValidate);
}

const loginInput = (input) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(6).max(300).required()
  });

  return schema.validate(input);
}

const registerInput = (input) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50).required().email(),
    username: Joi.string().min(3).max(25).required(),
    password: Joi.string().min(6).max(300).required(),
    password2: Joi.string().min(6).max(300).required()
  });

  return schema.validate(input);
};

const email = (input) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50).required().email()
  });

  return schema.validate(input);
}

const password = (input) => {
  const schema = Joi.object({
    password: Joi.string().min(6).max(25).required()
  });

  return schema.validate(input);
};

const validateTool = {
  user: user,
  loginInput: loginInput,
  registerInput: registerInput,
  email: email,
  password: password,
}

module.exports = validateTool;