import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const addDeveloperSchema = joi
  .object({
    title: joi.string(),
    file: generalFields.file.required(),
  })
  .required();
export const updateDeveloperSchema = joi
  .object({
    id: generalFields.id,
    title: joi.string(),
    file: generalFields.file,
  })
  .required();
export const getDeveloperByIdSchema = joi
  .object({
    id: generalFields.id,
  })
  .required();
export const deleteDeveloperSchema = joi
  .object({
    id: generalFields.id,
  })
  .required();
