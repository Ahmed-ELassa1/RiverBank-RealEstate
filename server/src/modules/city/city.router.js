import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as cityValidation from "./city.validation.js";
import * as cityController from "./controller/city.controller.js";
import validation from "../../DB/middlewares/validation.js";
import tokenSchema from "../../utils/tokenSchema.js";
import auth from "../../DB/middlewares/auth.js";
import cityEndPointsRoles from "./city.rolesEndPoints.js";
const router = Router();
router
  .post(
    "/",
    validation(tokenSchema, true),
    auth(cityEndPointsRoles.addCity),
    validation(cityValidation.addCitySchema),
    asyncHandler(cityController.addCity)
  )
  .put(
    "/:id",
    validation(tokenSchema, true),
    auth(cityEndPointsRoles.updateCity),
    validation(cityValidation.updateCitySchema),
    asyncHandler(cityController.updateCity)
  )
  .get("/", asyncHandler(cityController.getCities))
  .get(
    "/:id",
    validation(cityValidation.getCityByIdSchema),
    asyncHandler(cityController.getCityById)
  )
  .delete(
    "/:id",
    auth(cityEndPointsRoles.deleteCity),
    validation(cityValidation.deleteCitySchema),
    asyncHandler(cityController.deleteCity)
  );

export default router;
