import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as blogValidation from "./blog.validation.js";
import * as blogController from "./controller/blog.controller.js";
import uploadFiles, {
  uploadFilesValidation,
} from "../../utils/cloudinaryMulter.js";
import validation from "../../DB/middlewares/validation.js";
import tokenSchema from "../../utils/tokenSchema.js";
import auth from "../../DB/middlewares/auth.js";
import blogEndPointsRoles from "./blog.rolesEndPoints.js";
const router = Router();
router
  .post(
    "/",
    validation(tokenSchema, true),
    auth(blogEndPointsRoles.addBlog),
    uploadFiles(uploadFilesValidation.image).fields([
      { name: "mainImage", maxCount: 1 },
      { name: "subImages", maxCount: 5 },
    ]),
    validation(blogValidation.addBlogSchema),
    asyncHandler(blogController.addBlog)
  )
  .put(
    "/:id",
    validation(tokenSchema, true),
    auth(blogEndPointsRoles.updateBlog),
    uploadFiles(uploadFilesValidation.image).fields([
      { name: "mainImage", maxCount: 1 },
      { name: "subImages", maxCount: 5 },
    ]),
    validation(blogValidation.updateBlogSchema),
    asyncHandler(blogController.updateBlog)
  )
  .get("/", asyncHandler(blogController.getBlogs))
  .get(
    "/:id",
    validation(blogValidation.getBlogByIdSchema),
    asyncHandler(blogController.getBlogById)
  )
  .delete(
    "/:id",
    auth(blogEndPointsRoles.deleteBlog),
    validation(blogValidation.deleteBlogSchema),
    asyncHandler(blogController.deleteBlog)
  );

export default router;
