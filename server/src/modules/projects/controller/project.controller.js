import { nanoid } from "nanoid";
import cloudinary from "../../../utils/cloudinary.js";
import ApiFeatures from "../../../utils/ApiFeatures.js";
import projectModel from "../../../DB/models/Project.model.js";

export const addProject = async (req, res, next) => {
  const projectExist = await projectModel.findOne({
    title: req.body.title,
    isDeleted: false,
  });
  if (projectExist) {
    return next(
      new Error("project already exist with the same title", { cause: 409 })
    );
  }
  req.body.customId = nanoid();
  if (req.file) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file?.path,
      { folder: `${process.env.APP_NAME}/projects/${req.body.customId}` }
    );
    req.body.logo = { public_id, secure_url };
  }
  req.body.createdBy = req.user._id;
  const newProject = await projectModel.create(req.body);

  if (newProject) {
    const unSelectetAttributes = [
      "isDeleted",
      "updatedAt",
      "__v",
      "createdBy",
      "createdAt",
      "customId",
    ];
    const clonedResponse = { ...newProject.toObject() };
    // Construct a new object with the desired fields
    unSelectetAttributes.forEach((element) => {
      delete clonedResponse[element];
    });
    return res.status(201).json({ data: clonedResponse });
  }
};
export const updateProject = async (req, res, next) => {
  const projectExist = await projectModel.findOne({
    _id: req.params.id,
    isDeleted: false,
  });
  if (!projectExist) {
    return next(new Error("project not found", { cause: 404 }));
  }
  if (req.file) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file?.path,
      {
        folder: `${process.env.APP_NAME}/projects/${projectExist.customId}`,
      }
    );
    await cloudinary.uploader.destroy(projectExist?.logo?.public_id);
    req.body.logo = { public_id, secure_url };
  }
  req.body.updatedBy = req.user._id;
  const updatedProject = await projectModel
    .findOneAndUpdate({ _id: req.params.id, isDeleted: false }, req.body, {
      new: true,
    })
    .select("-isDeleted -createdAt -updatedAt -__v -createdBy -customId");
  return res.status(200).json({ message: "done", data: updatedProject });
};
export const getProjects = async (req, res, next) => {
  req.query.fields = `-isDeleted,-updatedAt,-__v,-createdBy,-customId`;
  const apiFeature = new ApiFeatures(
    projectModel.find({ isDeleted: false }),
    req.query
  )
    .paginate()
    .filter()
    .sort()
    .fields()
    .search();
  const projects = await apiFeature.mongooseQuery;
  return res.status(200).json({ message: "done", data: projects });
};
export const getProjectById = async (req, res, next) => {
  const project = await projectModel
    .findOne({ _id: req.params.id, isDeleted: false })
    .select("-isDeleted -createdAt -updatedAt -__v -createdBy -customId");
  if (!project) {
    return next(new Error("project not found", { cause: 404 }));
  }
  return res.status(200).json({ message: "done", data: project });
};

export const deleteProject = async (req, res, next) => {
  const project = await projectModel.findOne({
    _id: req.params.id,
    isDeleted: false,
  });
  if (!project) {
    return next(new Error("project not found", { cause: 404 }));
  }
  const projectFolderPath = `${process.env.APP_NAME}/projects/${project?.customId}`;
  await cloudinary.uploader.destroy(project.logo?.public_id);
  await cloudinary?.api?.delete_folder(projectFolderPath);

  await projectModel.deleteOne({
    _id: req.params.id,
  });
  return res.status(200).json(true);
};
