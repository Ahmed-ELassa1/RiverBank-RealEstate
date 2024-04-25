import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const addDeveloperSchema = joi
  .object({
    title: joi.string().required(),
    mainDescription: joi.string(),
    files: joi.object({
      mainImage: joi
        .array()
        .items(generalFields.file)
        .required()
        .messages({
          "string.empty": "Main Image can't be empty",
          "any.required": "Main Image is required field",
        })
        .required(),
      subImages: joi.array().items(generalFields.file),
    }),

    developerContent: joi.array().items(joi.string()),
    developerDescriptions: joi
      .array()
      .items(joi.string().required())
      .required(),
    developerQuestions: joi.array().items(
      joi.object({
        question: joi.string(),
        answer: joi.string(),
      })
    ),
  })
  .required();
export const updateDeveloperSchema = joi
  .object({
    id: generalFields.id,
    title: joi.string().required(),
    mainDescription: joi.string(),
    files: joi.object({
      mainImage: joi.array().items(generalFields.file).messages({
        "string.empty": "Main Image can't be empty",
        "any.required": "Main Image is required field",
      }),
      subImages: joi.array().items(generalFields.file),
    }),
    mainImage: joi.array().items(
      joi.object({
        public_id: joi.string().required(),
        secure_url: joi.string().required(),
      })
    ),
    developerContent: joi.array().items(joi.string()),
    subImages: joi.array().items(
      joi.object({
        public_id: joi.string().required(),
        secure_url: joi.string().required(),
      })
    ),
    developerDescriptions: joi
      .array()
      .items(joi.string().required())
      .required(),
    developerQuestions: joi.array().items(
      joi.object({
        question: joi.string(),
        answer: joi.string(),
      })
    ),
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
