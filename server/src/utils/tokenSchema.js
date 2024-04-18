import joi from "joi";

const tokenSchema = joi.object({
  authorization: joi
    .string()
    .messages({
      "string.empty": "please login first",
      "string.base": "please login first",
      "any.required": "please login first",
    })
    .required(),
});
export default tokenSchema;
