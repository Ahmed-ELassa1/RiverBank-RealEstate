import { nanoid } from "nanoid";
import cloudinary from "../../../utils/cloudinary.js";
import ApiFeatures from "../../../utils/ApiFeatures.js";
import developerModel from "../../../DB/models/Developer.model.js";

export const addDeveloper = async (req, res, next) => {
  const developerExist = await developerModel.findOne({
    title: req.body.title,
    isDeleted: false,
  });
  if (developerExist) {
    return next(
      new Error("developer already exist with the same title", { cause: 409 })
    );
  }
  req.body.customId = nanoid();
  if (req.file) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file?.path,
      { folder: `${process.env.APP_NAME}/developers/${req.body.customId}` }
    );
    req.body.logo = { public_id, secure_url };
  }
  req.body.createdBy = req.user._id;
  const newDeveloper = await developerModel.create(req.body);

  if (newDeveloper) {
    const unSelectetAttributes = [
      "isDeleted",
      "updatedAt",
      "__v",
      "createdBy",
      "createdAt",
      "customId",
    ];
    const clonedResponse = { ...newDeveloper.toObject() };
    // Construct a new object with the desired fields
    unSelectetAttributes.forEach((element) => {
      delete clonedResponse[element];
    });
    return res.status(201).json({ data: clonedResponse });
  }
};
export const updateDeveloper = async (req, res, next) => {
  const developerExist = await developerModel.findOne({
    _id: req.params.id,
    isDeleted: false,
  });
  if (!developerExist) {
    return next(new Error("developer not found", { cause: 404 }));
  }
  if (req.file) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file?.path,
      {
        folder: `${process.env.APP_NAME}/developers/${developerExist.customId}`,
      }
    );
    await cloudinary.uploader.destroy(developerExist?.logo?.public_id);
    req.body.logo = { public_id, secure_url };
  }
  req.body.updatedBy = req.user._id;
  const updatedDeveloper = await developerModel
    .findOneAndUpdate({ _id: req.params.id, isDeleted: false }, req.body, {
      new: true,
    })
    .select("-isDeleted -createdAt -updatedAt -__v -createdBy -customId");
  return res.status(200).json({ message: "done", data: updatedDeveloper });
};
export const getDevelopers = async (req, res, next) => {
  req.query.fields = `-isDeleted,-updatedAt,-__v,-createdBy,-customId`;
  const apiFeature = new ApiFeatures(
    developerModel.find({ isDeleted: false }),
    req.query
  )
    .paginate()
    .filter()
    .sort()
    .fields()
    .search();
  const developers = await apiFeature.mongooseQuery;
  return res.status(200).json({ message: "done", data: developers });
};
export const getDeveloperById = async (req, res, next) => {
  const developer = await developerModel
    .findOne({ _id: req.params.id, isDeleted: false })
    .select("-isDeleted -createdAt -updatedAt -__v -createdBy -customId");
  if (!developer) {
    return next(new Error("developer not found", { cause: 404 }));
  }
  return res.status(200).json({ message: "done", data: developer });
};

export const deleteDeveloper = async (req, res, next) => {
  const developer = await developerModel.findOne({
    _id: req.params.id,
    isDeleted: false,
  });
  if (!developer) {
    return next(new Error("developer not found", { cause: 404 }));
  }
  const developerFolderPath = `${process.env.APP_NAME}/developers/${developer?.customId}`;
  await cloudinary.uploader.destroy(developer.logo?.public_id);
  await cloudinary?.api?.delete_folder(developerFolderPath);

  await developerModel.deleteOne({
    _id: req.params.id,
  });
  return res.status(200).json(true);
};
