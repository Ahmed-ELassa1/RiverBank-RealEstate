import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const addProjectSchema = joi
  .object({
    title: joi.string().required(),
    slug: joi.string().required(),
    projectType: generalFields.id,
    mainDescription: joi.string().required(),
    projectDetails: joi
      .array()
      .items(
        joi.object({
          question: joi.string().required(),
          answer: joi.string().required(),
        })
      )
      .required(),
    projectContent: joi.array().items(joi.string().required()).required(),
    cityId: generalFields.id,
    developerId: generalFields._id,
    files: joi.object({
      mainImage: joi
        .array()
        .items(generalFields.file)
        .messages({
          "string.empty": "Main Image can't be empty",
          "any.required": "Main Image is required field",
        })
        .required(),
      subImages: joi
        .array()
        .items(generalFields.file)
        .messages({
          "string.empty": "Sub Image can't be empty",
          "any.required": "Sub Image is required field",
        })
        .required(),
    }),
    projectType: joi.string(),
    seoData: joi.string(),
    projectDescriptions: joi.array().items(joi.string().required()).required(),
    projectQuestions: joi
      .array()
      .items(
        joi.object({
          question: joi.string().required(),
          answer: joi.string().required(),
        })
      )
      .required(),
    whatsAppNumber: joi.string().required(),
    callToAction: joi.string().required(),
    contactMessage: joi.string().required(),

    // features: joi.array().items(joi.string()),
    // title: joi.string().min(2),
    // price: joi.number().min(1).positive(),
    // currency: joi.string().valid("USD", "EGP", "SAR", "EUR", "AED"),
  })
  .required();
export const updateProjectSchema = joi
  .object({
    id: generalFields.id,
    title: joi.string().required(),
    projectType: generalFields.id,
    slug: joi.string().required(),
    mainDescription: joi.string().required(),
    mainImage: joi.object({
        public_id: joi.string().required(),
        secure_url: joi.string().required(),
      }),
    projectDetails: joi
      .array()
      .items(
        joi.object({
          question: joi.string().required(),
          answer: joi.string().required(),
        })
      )
      .required(),
    projectContent: joi.array().items(joi.string().required()).required(),
    subImages: joi.array().items(
      joi.object({
        public_id: joi.string().required(),
        secure_url: joi.string().required(),
      })
    ),
    cityId: generalFields.id,
    developerId: generalFields._id,
    files: joi.object({
      mainImage: joi.array().items(generalFields.file).messages({
        "string.empty": "Main Image can't be empty",
        "any.required": "Main Image is required field",
      }),
      subImages: joi.array().items(generalFields.file).messages({
        "string.empty": "Sub Image can't be empty",
        "any.required": "Sub Image is required field",
      }),
    }),
    projectType: joi.string(),
    seoData: joi.string(),
    projectDescriptions: joi.array().items(joi.string().required()).required(),
    projectQuestions: joi
      .array()
      .items(
        joi.object({
          question: joi.string().required(),
          answer: joi.string().required(),
        })
      )
      .required(),
    whatsAppNumber: joi.string().required(),
    callToAction: joi.string().required(),
    contactMessage: joi.string().required(),
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
