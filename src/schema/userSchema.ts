import Joi from "joi";

export const createUserBodySchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.base": "Name must be a string",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid format",
  }),
  password: Joi.string()
    .required()
    .min(8)
    .messages({
      "any.required": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "password.uppercase":
        "Password must have at least one uppercase character",
      "password.lowercase":
        "Password must have at least one lowercase character",
      "password.special": "Password must have at least one special character",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }
      if (!/[!@#$%&]/.test(value)) {
        return helpers.error("password.special");
      }
      return value;
    }),
}).options({
  stripUnknown: true,
});

export const loginUserBodySchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid format",
  }),
  password: Joi.string().required().min(6).messages({
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
}).options({
  stripUnknown: true,
});

export const refreshTokenBodySchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    "any.required": "Refresh token is required",
    "string.base": "Refresh token must be a string",
  }),
}).options({
  stripUnknown: true,
});

export const userIdParamSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "number.base": "User ID must be a number",
    "number.integer": "User ID must be an integer",
    "any.required": "User ID is required",
  }),
}).options({
  stripUnknown: true,
});