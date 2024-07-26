import ApiFeatures from "../../../utils/ApiFeatures.js";
import projectTypeModel from "../../../DB/models/ProjectTypes.model.js";
import cityModel from "../../../DB/models/City.model.js";

export const addCity = async (req, res, next) => {
  const cityExist = await cityModel.findOne({
    title: req.body.title,
    isDeleted: false,
  });

  if (cityExist) {
    return next(
      new Error("city already exist with the same title", {
        cause: 409,
      })
    );
  }

  const projectTypeExist = await projectTypeModel.findById({
    _id: req.body.projectType,
  });

  if (!projectTypeExist) {
    return next(
      new Error("Project Type Not Found", {
        cause: 404,
      })
    );
  }
  // check if add project to the city that is already exist
  if (req.body?.projects) {
    for (const oneProject of req.body?.projects) {
      const projectExist = cityExist?.projects.filter((project) => {
        return project == oneProject;
      });
      if (projectExist?.length > 0) {
        return next(
          new Error(`project id already exist `, {
            cause: 409,
          })
        );
      }
    }
  }
  const slug = req.body.title
    .trim()
    // Changes all characters to lower case.
    .toLowerCase()
    // Remove symbols with a space.
    .replaceAll(" ", "-");
  req.body.slug = slug;
  req.body.createdBy = req.user._id;
  const newCity = await cityModel.create(req.body);
  if (newCity) {
    const unSelectetAttributes = [
      "isDeleted",
      "updatedAt",
      "__v",
      "createdBy",
      "createdAt",
      "customId",
    ];
    const clonedResponse = { ...newCity.toObject() };
    // Construct a new object with the desired fields
    unSelectetAttributes.forEach((element) => {
      delete clonedResponse[element];
    });
    return res.status(201).json({ data: clonedResponse });
  }
};

export const updateCity = async (req, res, next) => {
  const cityExist = await cityModel.findById({
    _id: req.params.id,
  });

  if (!cityExist) {
    return next(
      new Error("city not found", {
        cause: 404,
      })
    );
  }
  const projectTypeExist = await projectTypeModel.findById({
    _id: req.body.projectType,
  });

  if (!projectTypeExist) {
    return next(
      new Error("Project Type Not Found", {
        cause: 404,
      })
    );
  }
  if (req.body.title != cityExist.title) {
    const cityWithSameTitle = await cityModel.findOne({
      title: req.body.title,
    });
    if (cityWithSameTitle) {
      return next(
        new Error("city already exist with the same title", {
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
  // check if add project to the city that is already exist
  if (req.body?.projects) {
    for (const oneProject of req.body?.projects) {
      const projectExist = cityExist?.projects.filter((project) => {
        return project == oneProject;
      });
      if (projectExist?.length > 0) {
        return next(
          new Error(`project id already exist `, {
            cause: 409,
          })
        );
      }
    }
  }
  req.body.createdBy = req.user._id;
  const newCity = await cityModel.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (newCity) {
    const unSelectetAttributes = [
      "isDeleted",
      "updatedAt",
      "__v",
      "createdBy",
      "createdAt",
      "customId",
    ];
    const clonedResponse = { ...newCity.toObject() };
    // Construct a new object with the desired fields
    unSelectetAttributes.forEach((element) => {
      delete clonedResponse[element];
    });
    return res.status(201).json({ data: clonedResponse });
  }
};
export const getCities = async (req, res, next) => {
  req.query.fields = `-isDeleted,-updatedAt,-__v,-createdBy,-customId`;
  const apiFeature = new ApiFeatures(
    cityModel.find({ isDeleted: false }),
    req.query
  )
    .paginate()
    .filter()
    .sort()
    .fields()
    .search();
  const city = await apiFeature.mongooseQuery;
  return res.status(200).json({ message: "done", data: city });
};
export const getCityById = async (req, res, next) => {
  const city = await cityModel
    .findOne({ _id: req.params.id, isDeleted: false })
    .select("-isDeleted -createdAt -updatedAt -__v -createdBy -customId");
  if (!city) {
    return next(new Error("city not found", { cause: 404 }));
  }
  return res.status(200).json({ message: "done", data: city });
};

export const deleteCity = async (req, res, next) => {
  const city = await cityModel.findOne({
    _id: req.params.id,
    isDeleted: false,
  });
  if (!city) {
    return next(new Error("city not found", { cause: 404 }));
  }
  await cityModel.deleteOne({
    _id: req.params.id,
  });
  return res.status(200).json(true);
};
