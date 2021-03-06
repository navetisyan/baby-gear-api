const Joi = require('@hapi/joi');
const JoiStringExtension = require('../extensions/joi-string-extension');

const addressSchema = Joi.object({
  zipCode: Joi.string().trim().max(100).required(),
  street: Joi.string().trim().max(100).required(),
  country: JoiStringExtension.string().countryCode().length(2).required(),
  city: Joi.string().trim().max(100).required(),
});

const shippingSchema = Joi.object({
  name: Joi.string().trim().max(100).required(),
  phone: Joi.string().trim().max(100).required(),
});

const registerUserSchema = Joi.object({
  body: Joi.object({
    firstName: Joi.string().trim().max(100).required(),
    lastName: Joi.string().trim().max(100).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')).required(),
    mobilePhone: JoiStringExtension.string().phoneNumber().required(),
    address: addressSchema.required(),
    shipping: shippingSchema,
  }),
});

const loginUserSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')).required(),
  }),
});

const userIdSchema = Joi.object({
  params: Joi.object({
    userId: Joi.string().hex().length(24),
  }),
});

const updateUserSchema = Joi.object({
  body: Joi.object({
    firstName: Joi.string().trim().max(100),
    lastName: Joi.string().trim().max(100),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')),
    mobilePhone: JoiStringExtension.string().phoneNumber(),
    email: Joi.string().trim().email(),
    address: addressSchema,
  }),
  params: Joi.object({
    userId: Joi.string().hex().length(24).required(),
  }),
});

const limitSkipSchema = Joi.object({
  query: Joi.object({
    limit: Joi.number().positive(),
    skip: Joi.number().positive(),
  }),
});

module.exports = {
  registerUserSchema,
  updateUserSchema,
  userIdSchema,
  loginUserSchema,
  limitSkipSchema,
};
