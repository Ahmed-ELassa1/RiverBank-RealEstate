import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as developerValidation from "./developer.validation.js";
import * as developerController from "./controller/developer.controller.js";
import uploadFiles, {
  uploadFilesValidation,
} from "../../utils/cloudinaryMulter.js";
import validation from "../../DB/middlewares/validation.js";
import tokenSchema from "../../utils/tokenSchema.js";
import auth from "../../DB/middlewares/auth.js";
import developerEndPointsRoles from "./developer.rolesEndPoints.js";
const router = Router();
router
  .post(
    "/",
    validation(tokenSchema, true),
    auth(developerEndPointsRoles.addDeveloper),
    uploadFiles(uploadFilesValidation.image).single("logo"),
    validation(developerValidation.addDeveloperSchema),
    asyncHandler(developerController.addDeveloper)
  )
  .put(
    "/:id",
    validation(tokenSchema, true),
    auth(developerEndPointsRoles.updateDeveloper),
    uploadFiles(uploadFilesValidation.image).single("logo"),
    validation(developerValidation.updateDeveloperSchema),
    asyncHandler(developerController.updateDeveloper)
  )
  .get("/", asyncHandler(developerController.getDevelopers))
  .get(
    "/:id",
    validation(developerValidation.getDeveloperByIdSchema),
    asyncHandler(developerController.getDeveloperById)
  )
  .delete(
    "/:id",
    auth(developerEndPointsRoles.deleteDeveloper),
    validation(developerValidation.deleteDeveloperSchema),
    asyncHandler(developerController.deleteDeveloper)
  );

export default router;
