import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import uploadFiles, {
  uploadFilesValidation,
} from "../../utils/cloudinaryMulter.js";
import validation from "../../DB/middlewares/validation.js";
import tokenSchema from "../../utils/tokenSchema.js";
import auth from "../../DB/middlewares/auth.js";
import propertyEndPointsRoles from "./property.endPointRoles.js";
import * as propertyValidation from "./property.validation.js";
import * as propertyController from "./controller/property.controller.js";
const router = Router();
router
  .post(
    "/",
    validation(tokenSchema, true),
    auth(propertyEndPointsRoles.addProperty),
    uploadFiles(uploadFilesValidation.image).fields([
      { name: "mainImage", maxCount: 1 },
      { name: "coverImages", maxCount: 10 },
    ]),
    validation(propertyValidation.addPropertySchema),
    asyncHandler(propertyController.addProperty)
  )
  .put(
    "/:id",
    validation(tokenSchema, true),
    auth(propertyEndPointsRoles.updateProperty),
    uploadFiles(uploadFilesValidation.image).fields([
      { name: "mainImage", maxCount: 1 },
      { name: "coverImages", maxCount: 10 },
    ]),
    validation(propertyValidation.updatePropertySchema),
    asyncHandler(propertyController.updateProperty)
  )
  .get("/", asyncHandler(propertyController.getAllProperties))
  .get(
    "/:id",
    validation(propertyValidation.getPropertyByIdSchema),
    asyncHandler(propertyController.getPropertyById)
  )
  .delete(
    "/:id",
    validation(tokenSchema, true),
    auth(propertyEndPointsRoles.deleteProperty),
    validation(propertyValidation.deletePropertySchema),
    asyncHandler(propertyController.deleteProperty)
  );

export default router;
