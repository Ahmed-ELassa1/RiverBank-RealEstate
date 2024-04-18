import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const addClientRequestSchema = joi
  .object({
    userName: joi
      .string()
      .min(2)
      .max(20)
      .messages({
        "string.empty": "UserName can't be empty",
        "string.min": "UserName can't be less than 2 char",
        "string.max": "UserName can't be greater than 20 char",
        "any.required": "UserName is required field",
      })
      .required(),
    email: generalFields.email,
    phone: joi
      .string()
      .length(11)
      .messages({
        "string.empty": "Phone can't be empty",
        "string.length": "Phone Number must be 11 digits",
        "any.required": "Phone is required field",
      })
      .required(),
    preferredLocation: joi
      .string()
      .messages({
        "string.empty": "Preferred Location can't be empty",
        "any.required": "Preferred Location is required field",
      })
      .required(),
    message: joi
      .string()
      .min(3)
      .max(500)
      .messages({
        "string.empty": "Message can't be empty",
        "string.min": "Message can't be less than 3 char",
        "any.required": "Message is required field",
      })
      .required(),
  })
  .required();
export const updateClientRequestSchema = joi
  .object({
    read: joi.string().valid("read", "unRead"),
    seen: joi.string().valid("seen", "unSeen"),
    id: generalFields.id,
  })
  .required();
export const getClientRequestByIdSchema = joi
  .object({
    id: generalFields.id,
  })
  .required();
export const deleteClientRequestSchema = joi
  .object({
    id: generalFields.id,
  })
  .required();
