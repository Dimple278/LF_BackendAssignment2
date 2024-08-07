import Joi from "joi";
import { TASK_STATUS } from "../constatnts/TaskStatus";

// Define the schema for the task query
export const createTaskBodySchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title must be a string",
  }),
  status: Joi.string()
    .required()
    .messages({
      "any.only": `Status must be one of ${Object.values(TASK_STATUS).join(
        ", "
      )}`,
    })
    .custom((value, helpers) => {
      if (!Object.values(TASK_STATUS).includes(value)) {
        return helpers.error("any.only");
      }

      return value;
    }),
}).options({ stripUnknown: true });

// Define the schema for the update task body
export const updateTaskBodySchema = Joi.object({
  title: Joi.string().optional().messages({
    "any.required": "Title must be a string",
  }),
  status: Joi.string()
    .optional()
    .messages({
      "any.only": `Status must be one of ${Object.values(TASK_STATUS).join(
        ", "
      )}`,
    })
    .custom((value, helpers) => {
      if (!Object.values(TASK_STATUS).includes(value)) {
        return helpers.error("any.only");
      }

      return value;
    }),
}).options({ stripUnknown: true });

// Define the schema for the task ID
export const taskIdSchema = Joi.object({
  id: Joi.number().required().messages({
    "number.base": "Id must be a number",
    "any.required": "Id is required",
  }),
}).options({ stripUnknown: true });

// Define the schema for the task query
export const getTaskQuerySchema = Joi.object({
  q: Joi.string().optional(),
  page: Joi.number()
    .min(1)
    .optional()
    .messages({
      "number.base": "Page must be a number",
      "number.min": "Page must be at least 1",
    })
    .default(1),

  size: Joi.number()
    .min(1)
    .max(10)
    .optional()
    .messages({
      "number.base": "Size must be a number",
      "number.min": "Size must be at least 1",
      "number.max": "Size must be at most 10",
    })
    .default(10),
}).options({ stripUnknown: true });
