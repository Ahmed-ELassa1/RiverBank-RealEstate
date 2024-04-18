import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const loginSchema = joi
  .object({
    email: generalFields.email,
    password: generalFields.password,
  })
  .required();
// export const signOutSchema = joi
//   .object({
//     email: generalFields.email,
//   })
//   .required();
export const confirmEmailSchema = joi
  .object({
    token: joi.string().required(),
  })
  .required();
export const refreshTokenSchema = joi
  .object({
    token: joi.string().required(),
  })
  .required();
export const sendCodeSchema = joi
  .object({
    email: generalFields.email,
  })
  .required();
export const forgetPasswordSchema = joi
  .object({
    code: joi
      .string()
      .length(5)
      .pattern(new RegExp(/^\d{5}$/))
      .required(),
    password: generalFields.password,
    cPassword: joi.string().valid(joi.ref("password")).required(),
    email: generalFields.email,
  })
  .required();
export const signUpSchema = joi
  .object({
    email: generalFields.email,
    password: generalFields.password,
    userName: joi.string().min(3).max(30).required().messages({
      "string.empty": "userName can't be empty",
      "any.required": "userName is required field",
    }),
    gender: joi.string().valid("male", "female"),
    file: generalFields.file,
  })
  .required();
