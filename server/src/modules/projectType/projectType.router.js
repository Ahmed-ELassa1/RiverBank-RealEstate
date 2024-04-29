import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as projectTypeValidation from "./projectType.validation.js";
import * as projectTypeController from "./controller/projectType.controller.js";
import validation from "../../DB/middlewares/validation.js";
import tokenSchema from "../../utils/tokenSchema.js";
import auth from "../../DB/middlewares/auth.js";
import projectTypeEndPointsRoles from "./projectType.rolesEndPoints.js";
const router = Router();
router
  .post(
    "/",
    validation(tokenSchema, true),
    auth(projectTypeEndPointsRoles.addProjectType),
    validation(projectTypeValidation.addProjectTypeSchema),
    asyncHandler(projectTypeController.addProjectType)
  )
  .put(
    "/:id",
    validation(tokenSchema, true),
    auth(projectTypeEndPointsRoles.updateProjectType),
    validation(projectTypeValidation.updateProjectTypeSchema),
    asyncHandler(projectTypeController.updateProjectType)
  )
  .get("/", asyncHandler(projectTypeController.getProjectTypes))
  .get(
    "/:id",
    validation(projectTypeValidation.getProjectTypeByIdSchema),
    asyncHandler(projectTypeController.getProjectTypeById)
  )
  .delete(
    "/:id",
    auth(projectTypeEndPointsRoles.deleteProjectType),
    validation(projectTypeValidation.deleteProjectTypeSchema),
    asyncHandler(projectTypeController.deleteProjectType)
  );

export default router;
