import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const addProjectTypeSchema = joi
  .object({
    title: joi.string().required(),
  })
  .required();
export const updateProjectTypeSchema = joi
  .object({
    id: generalFields.id,
    title: joi.string().required(),
  })
  .required();
export const getProjectTypeByIdSchema = joi
  .object({
    id: generalFields.id,
  })
  .required();
export const deleteProjectTypeSchema = joi
  .object({
    id: generalFields.id,
  })
  .required();
