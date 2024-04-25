import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const addCitySchema = joi
  .object({
    title: joi.string().required(),
    description: joi.string(),
    projects: joi.array().items(generalFields._id),
    cityQuestions: joi.array().items(
      joi.object({
        question: joi.string(),
        answer: joi.string(),
      })
    ),
  })
  .required();
export const updateCitySchema = joi
  .object({
    id: generalFields.id,
    title: joi.string().required(),
    description: joi.string(),
    projects: joi.array().items(generalFields._id),
    cityQuestions: joi.array().items(
      joi.object({
        question: joi.string(),
        answer: joi.string(),
      })
    ),
  })
  .required();
export const getCityByIdSchema = joi
  .object({
    id: generalFields.id,
  })
  .required();
export const deleteCitySchema = joi
  .object({
    id: generalFields.id,
  })
  .required();
