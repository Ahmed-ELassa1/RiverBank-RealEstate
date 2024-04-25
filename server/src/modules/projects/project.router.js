import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as projectValidation from "./project.validation.js";
import * as projectController from "./controller/project.controller.js";
import uploadFiles, {
  uploadFilesValidation,
} from "../../utils/cloudinaryMulter.js";
import validation from "../../DB/middlewares/validation.js";
import tokenSchema from "../../utils/tokenSchema.js";
import auth from "../../DB/middlewares/auth.js";
import projectEndPointsRoles from "./project.rolesEndPoints.js";
const router = Router();
router
  .post(
    "/",
    validation(tokenSchema, true),
    auth(projectEndPointsRoles.addProject),
    uploadFiles(uploadFilesValidation.image).fields([
      { name: "mainImage", maxCount: 1 },
      { name: "subImages", maxCount: 10 },
    ]),
    validation(projectValidation.addProjectSchema),
    asyncHandler(projectController.addProject)
  )
  .put(
    "/:id",
    validation(tokenSchema, true),
    auth(projectEndPointsRoles.updateProject),
    uploadFiles(uploadFilesValidation.image).fields([
      { name: "mainImage", maxCount: 1 },
      { name: "subImages", maxCount: 10 },
    ]),
    validation(projectValidation.updateProjectSchema),
    asyncHandler(projectController.updateProject)
  )
  .get("/", asyncHandler(projectController.getProjects))
  .get(
    "/:id",
    validation(projectValidation.getProjectByIdSchema),
    asyncHandler(projectController.getProjectById)
  )
  .delete(
    "/:id",
    auth(projectEndPointsRoles.deleteProject),
    validation(projectValidation.deleteProjectSchema),
    asyncHandler(projectController.deleteProject)
  );

export default router;
