import { nanoid } from "nanoid";
import cloudinary from "../../../utils/cloudinary.js";
import propertyModel from "../../../DB/models/Property.model.js";
import ApiFeatures from "../../../utils/ApiFeatures.js";

export const addProperty = async (req, res, next) => {
  req.body.customId = nanoid();
  if (req.body?.priceRange) {
    const minPrice = req.body?.priceRange?.trim()?.split("-")[0];
    const maxPrice = req.body?.priceRange?.trim()?.split("-")[1];
    if (!minPrice) {
      return next(
        new Error("price range format must be like 1000-2000", {
          cause: 400,
        })
      );
    } else if (!maxPrice) {
      return next(
        new Error("price range format must be like 1000-2000", {
          cause: 400,
        })
      );
    } else if (+minPrice > +maxPrice) {
      return next(
        new Error("min price can't be greater than max price", { cause: 400 })
      );
    } else if (+minPrice == 0 || +maxPrice == 0) {
      return next(
        new Error("min or max price can't be less than 1", { cause: 400 })
      );
    }
    req.body.priceRange = { min: +minPrice, max: +maxPrice };
  }
  // check if there is main image and add to req.body
  if (req.files?.mainImage) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.files?.mainImage[0].path,
      {
        folder: `${process.env.APP_NAME}/property/${req.body.customId}/mainImage`,
      }
    );
    req.body.mainImage = { public_id, secure_url };
  }
  const comerImagesArray = [];
  // loop for all cover images and add one by one
  if (req.files?.coverImages) {
    for (const image of req.files?.coverImages) {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        image.path,
        {
          folder: `${process.env.APP_NAME}/property/${req.body.customId}/coverImage`,
        }
      );
      comerImagesArray.push({ public_id, secure_url });
    }
  }
  req.body.coverImages = comerImagesArray;
  req.body.addedBy = req.user._id;
  const newProperty = await propertyModel.create(req.body);
  if (newProperty) {
    const unSelectetAttributes = [
      "isDeleted",
      "updatedAt",
      "__v",
      "addedBy",
      "createdAt",
      "customId",
    ];
    const clonedResponse = { ...newProperty.toObject() };
    // Construct a new object with the desired fields
    unSelectetAttributes.forEach((element) => {
      delete clonedResponse[element];
    });
    return res.status(201).json({ data: clonedResponse });
  }
};
export const updateProperty = async (req, res, next) => {
  const propertyExist = await propertyModel.findOne({
    _id: req.params.id,
    isDeleted: false,
  });
  if (!propertyExist) {
    return next(new Error("Property not found", { cause: 404 }));
  }
  if (req.body?.priceRange) {
    const minPrice = req.body?.priceRange?.trim()?.split("-")[0];
    const maxPrice = req.body?.priceRange?.trim()?.split("-")[1];
    if (!minPrice) {
      return next(
        new Error("price range format must be like 1000-2000", {
          cause: 400,
        })
      );
    } else if (!maxPrice) {
      return next(
        new Error("price range format must be like 1000-2000", {
          cause: 400,
        })
      );
    } else if (+minPrice > +maxPrice) {
      return next(
        new Error("min price can't be greater than max price", { cause: 400 })
      );
    } else if (+minPrice == 0 || +maxPrice == 0) {
      return next(
        new Error("min or max price can't be less than 1", { cause: 400 })
      );
    }
    req.body.priceRange = { min: +minPrice, max: +maxPrice };
  }
  // check if there is main image and add to req.body
  if (req.files?.mainImage) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.files?.mainImage[0].path,
      {
        folder: `${process.env.APP_NAME}/property/${propertyExist?.customId}/mainImage`,
      }
    );
    await cloudinary.uploader.destroy(propertyExist?.mainImage?.public_id);
    req.body.mainImage = { public_id, secure_url };
  }
  // loop for all cover images and add one by one
  if (req.files?.coverImages) {
    const comerImagesArray = [];
    for (const image of req.files?.coverImages) {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        image.path,
        {
          folder: `${process.env.APP_NAME}/property/${propertyExist?.customId}/coverImage`,
        }
      );
      comerImagesArray.push({ public_id, secure_url });
    }
    req.body.coverImages = [...propertyExist?.coverImages,...comerImagesArray];
  }
  req.body.updatedBy = req.user._id;
  const updatedProperty = await propertyModel.findOneAndUpdate(
    { _id: req.params.id, isDeleted: false },
    req.body,
    { new: true }
  );
  if (updatedProperty) {
    const unSelectetAttributes = [
      "isDeleted",
      "updatedAt",
      "__v",
      "addedBy",
      "createdAt",
      "customId",
    ];
    const clonedResponse = { ...updatedProperty.toObject() };
    // Construct a new object with the desired fields
    unSelectetAttributes.forEach((element) => {
      delete clonedResponse[element];
    });
    return res.status(201).json({ data: clonedResponse });
  }
};
export const getAllProperties = async (req, res, next) => {
  req.query.fields = `-isDeleted,-updatedAt,-__v,-addedBy,-createdAt`;
  const apiFeature = new ApiFeatures(
    propertyModel.find({ isDeleted: false }),
    req.query
  )
    .fields()
    .sort()
    .search()
    .filter()
    .paginate();
  const properties = await apiFeature.mongooseQuery;
  if (properties) {
    return res.status(200).json({ message: "done", data: properties });
  }
};
export const getPropertyById = async (req, res, next) => {
  const property = await propertyModel
    .findOne({ _id: req.params.id, isDeleted: false })
    .select("-isDeleted -updatedAt -__v -addedBy -createdAt");
  if (!property) {
    return next(new Error("Property not found", { cause: 404 }));
  }
  return res.status(200).json({ message: "done", data: property });
};
export const deleteProperty = async (req, res, next) => {
  const propertyExist = await propertyModel.findOne({
    _id: req.params.id,
    isDeleted: false,
  });
  if (!propertyExist) {
    return next(new Error("Property not found", { cause: 404 }));
  }
  if (propertyExist?.mainImage) {
    const propertyFolderPath = `${process.env.APP_NAME}/property/${propertyExist?.customId}`;
    await cloudinary?.api?.delete_all_resources(propertyFolderPath);
    await cloudinary.api.delete_folder(propertyFolderPath);
  }

  await propertyModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { isDeleted: true },
    { new: true }
  );
  return res.status(200).json(true);
};
