import ApiFeatures from "../../../utils/ApiFeatures.js";
import ProjectTypeModel from "../../../DB/models/ProjectTypes.model.js";

export const addProjectType = async (req, res, next) => {
  const projectTypeExist = await ProjectTypeModel.findOne({
    title: req.body.title,
    isDeleted: false,
  });

  if (projectTypeExist) {
    return next(
      new Error("projectType already exist with the same title", {
        cause: 409,
      })
    );
  }
  const slug = req.body.title
    .trim()
    // Changes all characters to lower case.
    .toLowerCase()
    // Remove symbols with a space.
    .replaceAll(" ", "-");
  req.body.slug = slug;
  req.body.createdBy = req.user._id;
  const newProjectType = await ProjectTypeModel.create(req.body);
  if (newProjectType) {
    const unSelectetAttributes = [
      "isDeleted",
      "updatedAt",
      "__v",
      "createdBy",
      "createdAt",
      "customId",
    ];
    const clonedResponse = { ...newProjectType.toObject() };
    // Construct a new object with the desired fields
    unSelectetAttributes.forEach((element) => {
      delete clonedResponse[element];
    });
    return res.status(201).json({ data: clonedResponse });
  }
};

export const updateProjectType = async (req, res, next) => {
  const projectTypeExist = await ProjectTypeModel.findById({
    _id: req.params.id,
  });

  if (!projectTypeExist) {
    return next(
      new Error("projectType not found", {
        cause: 404,
      })
    );
  }

  if (req.body.title != projectTypeExist.title) {
    const projectTypeWithSameTitle = await ProjectTypeModel.findOne({
      title: req.body.title,
    });
    if (projectTypeWithSameTitle) {
      return next(
        new Error("projectType already exist with the same title", {
          cause: 409,
        })
      );
    }
    const slug = req.body.title
      .trim()
      // Changes all characters to lower case.
      .toLowerCase()
      // Remove symbols with a space.
      .replaceAll(" ", "-");
    req.body.slug = slug;
  }

  req.body.createdBy = req.user._id;
  const newProjectType = await ProjectTypeModel.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (newProjectType) {
    const unSelectetAttributes = [
      "isDeleted",
      "updatedAt",
      "__v",
      "createdBy",
      "createdAt",
      "customId",
    ];
    const clonedResponse = { ...newProjectType.toObject() };
    // Construct a new object with the desired fields
    unSelectetAttributes.forEach((element) => {
      delete clonedResponse[element];
    });
    return res.status(201).json({ data: clonedResponse });
  }
};
export const getProjectTypes = async (req, res, next) => {
  req.query.fields = `-isDeleted,-updatedAt,-__v,-createdBy,-customId`;
  const apiFeature = new ApiFeatures(
    ProjectTypeModel.find({ isDeleted: false }),
    req.query
  )
    .paginate()
    .filter()
    .sort()
    .fields()
    .search();
  const projectType = await apiFeature.mongooseQuery;
  return res.status(200).json({ message: "done", data: projectType });
};
export const getProjectTypeById = async (req, res, next) => {
  const projectType = await ProjectTypeModel.findOne({
    _id: req.params.id,
    isDeleted: false,
  }).select("-isDeleted -createdAt -updatedAt -__v -createdBy -customId");
  if (!projectType) {
    return next(new Error("projectType not found", { cause: 404 }));
  }
  return res.status(200).json({ message: "done", data: projectType });
};

export const deleteProjectType = async (req, res, next) => {
  const projectType = await ProjectTypeModel.findOne({
    _id: req.params.id,
    isDeleted: false,
  });
  if (!projectType) {
    return next(new Error("projectType not found", { cause: 404 }));
  }
  await ProjectTypeModel.deleteOne({
    _id: req.params.id,
  });
  return res.status(200).json(true);
};
