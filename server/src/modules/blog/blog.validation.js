import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const addBlogSchema = joi
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

    blogContent: joi.array().items(joi.string()),
    blogDescriptions: joi.array().items(joi.string().required()).required(),
    blogQuestions: joi.array().items(
      joi.object({
        question: joi.string(),
        answer: joi.string(),
      })
    ),
  })
  .required();
export const updateBlogSchema = joi
  .object({
    id: generalFields.id,
    title: joi.string().required(),
    mainDescription: joi.string(),
    mainImage: joi.array().items(
      joi.object({
        public_id: joi.string().required(),
        secure_url: joi.string().required(),
      })
    ),
    files: joi.object({
      mainImage: joi.array().items(generalFields.file).messages({
        "string.empty": "Main Image can't be empty",
        "any.required": "Main Image is required field",
      }),
      subImages: joi.array().items(generalFields.file),
    }),
    subImages: joi.array().items(
      joi.object({
        public_id: joi.string().required(),
        secure_url: joi.string().required(),
      })
    ),
    blogContent: joi.array().items(joi.string()),
    blogDescriptions: joi.array().items(joi.string().required()).required(),
    blogQuestions: joi.array().items(
      joi.object({
        question: joi.string(),
        answer: joi.string(),
      })
    ),
  })
  .required();
export const getBlogByIdSchema = joi
  .object({
    id: generalFields.id,
  })
  .required();
export const deleteBlogSchema = joi
  .object({
    id: generalFields.id,
  })
  .required();
