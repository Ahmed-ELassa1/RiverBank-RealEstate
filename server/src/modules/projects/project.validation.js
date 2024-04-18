import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const addProjectSchema = joi
  .object({
    title: joi.string().min(2).max(20).required(),
    description: joi.string().min(2).required(),
    location: joi.string().min(2),
    file: generalFields.file.required(),
    features: joi.array().items(joi.string()),
    title: joi.string().min(2),
    price: joi.number().min(1).positive(),
    currency: joi.string().valid("USD", "EGP", "SAR", "EUR", "AED"),
  })
  .required();
export const updateProjectSchema = joi
  .object({
    id: generalFields.id,
    title: joi.string().min(2).max(20),
    description: joi.string().min(2),
    location: joi.string().min(2),
    file: generalFields.file,
    features: joi.array().items(joi.string()),
    title: joi.string().min(2),
    price: joi.number().min(1).positive(),
    currency: joi.string().valid("USD", "EGP", "SAR", "EUR", "AED"),
  })
  .required();
export const getProjectByIdSchema = joi
  .object({
    id: generalFields.id,
  })
  .required();
export const deleteProjectSchema = joi
  .object({
    id: generalFields.id,
  })
  .required();
