import { nanoid } from "nanoid";
import cloudinary from "../../../utils/cloudinary.js";
import ApiFeatures from "../../../utils/ApiFeatures.js";
import projectModel from "../../../DB/models/Project.model.js";
import developerModel from "../../../DB/models/Developer.model.js";
import cityModel from "../../../DB/models/City.model.js";

export const addProject = async (req, res, next) => {
  const projectExist = await projectModel.findOne({
    slug: req.body.slug,
    title: req.body.title,
    isDeleted: false,
  });
  if (projectExist) {
    return next(
      new Error("project already exist with the same title or slug", {
        cause: 409,
      })
    );
  }
  const cityExist = await cityModel.findById({ _id: req.body.cityId });
  if (!cityExist) {
    return next(
      new Error("City Not Found", {
        cause: 404,
      })
    );
  }
  const developerExist = await developerModel.findById({
    _id: req.body.developerId,
  });
  if (!developerExist) {
    return next(
      new Error("Developer Not Found", {
        cause: 404,
      })
    );
  }
  req.body.customId = nanoid();
  if (req.files?.mainImage) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.files?.mainImage[0].path,
      {
        folder: `${process.env.APP_NAME}/projects/${req.body.customId}/mainImage`,
      }
    );
    req.body.mainImage = { public_id, secure_url };
  }
  // loop for all cover images and add one by one
  const subImagesArray = [];
  if (req.files?.subImages) {
    for (const image of req.files?.subImages) {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        image.path,
        {
          folder: `${process.env.APP_NAME}/projects/${req.body.customId}/subImages`,
        }
      );

      subImagesArray.push({ public_id, secure_url });
    }
  }
  req.body.subImages = subImagesArray;

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
  const cityExist = await cityModel.findById({ _id: req.body.cityId });
  if (!cityExist) {
    return next(
      new Error("City Not Found", {
        cause: 404,
      })
    );
  }
  const developerExist = await developerModel.findById({
    _id: req.body.developerId,
  });
  if (!developerExist) {
    return next(
      new Error("Developer Not Found", {
        cause: 404,
      })
    );
  }
  if (req.body?.title != projectExist?.title) {
    const projectTitleExist = await projectModel.findOne({
      title: req.body?.title,
      isDeleted: false,
    });
    if (projectTitleExist) {
      return next(new Error("project title exist", { cause: 409 }));
    }
  }
  if (req.body?.slug != projectExist?.slug) {
    const projectSlugExist = await projectModel.findOne({
      slug: req.body?.slug,
      isDeleted: false,
    });
    if (projectSlugExist) {
      return next(new Error("project slug exist", { cause: 409 }));
    }
  }
  if (req.files?.mainImage) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.files?.mainImage[0].path,
      {
        folder: `${process.env.APP_NAME}/projects/${projectExist.customId}/mainImage`,
      }
    );
    await cloudinary.uploader.destroy(projectExist?.mainImage?.public_id);
    req.body.mainImage = { public_id, secure_url };
  }
  const subImagesArray = [];
  if (req.body?.subImages) {
    const deletedImagesArr = projectExist.subImages.filter(
      (obj1) =>
        !req.body?.subImages.some((obj2) => obj2.public_id == obj1.public_id)
    );
    const existImages = projectExist.subImages.filter((obj1) =>
      req.body?.subImages.some((obj2) => obj2.public_id === obj1.public_id)
    );
    subImagesArray.push(...existImages);
    for (const deletedImage of deletedImagesArr) {
      await cloudinary?.uploader.destroy(deletedImage?.public_id);
    }
  }
  if (req.files?.subImages) {
    for (const image of req.files?.subImages) {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        image.path,
        {
          folder: `${process.env.APP_NAME}/projects/${projectExist.customId}/subImages`,
        }
      );
      subImagesArray.push({ public_id, secure_url });
    }
  }
  req.body.subImages = subImagesArray;
  req.body.updatedBy = req.user._id;
  const updatedProject = await projectModel
    .findOneAndUpdate({ _id: req.params.id, isDeleted: false }, req.body, {
      new: true,
    })
    .select("-isDeleted -createdAt -updatedAt -__v -createdBy -customId");
  return res.status(200).json({ message: "done", data: updatedProject });
};
export const getProjects = async (req, res, next) => {
  try {
    req.query.fields = `-isDeleted,-updatedAt,-__v,-createdBy,-customId -createdAt`;
    let apiFeature = new ApiFeatures(
      projectModel
        .find({ isDeleted: false })
        .populate({
          path: "cityId",
          select: "-_id",
        })
        .populate({
          path: "developerId",
          select: "_id",
        }),
      req.query
    );

    // Apply pagination, filtering, sorting, field selection, and search
    apiFeature = apiFeature.paginate().filter().sort().fields().search();

    // Execute the query asynchronously
    const projects = await apiFeature.mongooseQuery.exec();

    // Modify the structure of the returned projects
    const modifiedProjects = projects.map((project) => ({
      ...project.toObject(),
      cityId: project.cityId._id, // Modify the cityId field to be cityId: "the city Id"
      developerId: project.developerId._id, // Modify the developerId field to be developerId: "the developer Id"
    }));

    // Send the modified projects in the response
    return res.status(200).json({ message: "done", data: modifiedProjects });
  } catch (err) {
    // Handle error
    return next(new Error(err, { cause: 400 }));
  }
};
// export const getProjects = async (req, res, next) => {
//   req.query.fields = `-isDeleted,-updatedAt,-__v,-createdBy,-customId`;
//   const apiFeature = new ApiFeatures(
//     projectModel
//       .find({ isDeleted: false })
//       .populate({
//         path: "cityId",
//         select: "-_id",
//       })
//       .populate({
//         path: "developerId",
//         select: "_id",
//       }),
//     req.query
//   )
//     .paginate()
//     .filter()
//     .sort()
//     .fields()
//     .search();
//   const projects = await apiFeature.mongooseQuery;
//   return res.status(200).json({ message: "done", data: projects });
// };
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
  if (project?.subImages) {
    for (const image of project?.subImages) {
      await cloudinary?.uploader.destroy(image?.public_id);
    }
  }
  await cloudinary.uploader.destroy(project.mainImage?.public_id);
  await cloudinary?.api?.delete_folder(
    `${process.env.APP_NAME}/projects/${project?.customId}/mainImage`
  );
  await cloudinary?.api?.delete_folder(
    `${process.env.APP_NAME}/projects/${project?.customId}/subImages`
  );
  await cloudinary?.api?.delete_folder(projectFolderPath);

  await projectModel.deleteOne({
    _id: req.params.id,
  });
  return res.status(200).json(true);
};
