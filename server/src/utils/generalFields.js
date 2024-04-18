import joi from "joi";
import { validateId } from "../DB/middlewares/validation.js";

const generalFields = {
  authorization: joi.string().required(),
  id: joi.string().custom(validateId).required(),
  _id: joi.string().custom(validateId),
  name: joi.string().trim(),
  password: joi
    .string()
    .pattern(new RegExp("^[A-Za-z0-9]{3,30}$"))
    .messages({
      "string.empty": "password can't be empty",
      "any.required": "password is required field",
    })
    .required(),
  email: joi
    .string()
    .email({ tlds: { allow: ["net", "com"] } })
    .required()
    .messages({
      "string.empty": "email can't be empty",
      "any.required": "email is required field",
    }),
  file: joi.object({
    filename: joi.string().required(),
    originalname: joi.string().required(),
    encoding: joi.string().required(),
    mimetype: joi.string().required(),
    destination: joi.string().required(),
    fieldname: joi.string().required(),
    path: joi.string().required(),
    size: joi.number().positive().required(),
  }),
};
export default generalFields;
