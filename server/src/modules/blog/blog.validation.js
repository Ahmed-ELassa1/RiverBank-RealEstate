import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const addBlogSchema = joi
  .object({
    title: joi.string().min(3).max(30).required(),
    description: joi.string().min(3).max(500).required(),
    files: joi.object({
      mainImage: joi.array().items(generalFields.file),
      subImages: joi.array().items(generalFields.file),
    }),
  })
  .required();
export const updateBlogSchema = joi
  .object({
    id: generalFields.id,
    title: joi.string().min(3).max(30),
    description: joi.string().min(3).max(500),
    files: joi.object({
      mainImage: joi.array().items(generalFields.file),
      subImages: joi.array().items(generalFields.file),
    }),
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
