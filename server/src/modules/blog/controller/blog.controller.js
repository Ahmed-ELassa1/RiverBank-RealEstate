import { nanoid } from "nanoid";
import blogModel from "../../../DB/models/Blog.model.js";
import cloudinary from "../../../utils/cloudinary.js";
import ApiFeatures from "../../../utils/ApiFeatures.js";

export const addBlog = async (req, res, next) => {
  const blogExist = await blogModel.findOne({
    title: req.body.title,
    isDeleted: false,
  });
  if (blogExist) {
    return next(
      new Error("blog already exist with the same header", { cause: 409 })
    );
  }
  req.body.customId = nanoid();
  if (req.files?.mainImage) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.files?.mainImage[0]?.path,
      { folder: `${process.env.APP_NAME}/blogs/${req.body.customId}/mainImage` }
    );
    req.body.mainImage = { public_id, secure_url };
  }
  if (req.files?.subImages) {
    const subImages = [];
    // upload subImages one by one
    for (const image of req.files.subImages) {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        image?.path,
        {
          folder: `${process.env.APP_NAME}/blogs/${req.body.customId}/subImage`,
        }
      );
      subImages.push({ public_id, secure_url });
    }
    req.body.subImages = subImages;
  }
  req.body.createdBy = req.user._id;
  const newBlog = await blogModel.create(req.body);

  if (newBlog) {
    const unSelectetAttributes = [
      "isDeleted",
      "updatedAt",
      "__v",
      "createdBy",
      "createdAt",
      "customId",
    ];
    const clonedResponse = { ...newBlog.toObject() };
    // Construct a new object with the desired fields
    unSelectetAttributes.forEach((element) => {
      delete clonedResponse[element];
    });
    return res.status(201).json({ data: clonedResponse });
  }
};
export const updateBlog = async (req, res, next) => {
  const blogExist = await blogModel.findOne({
    _id: req.params.id,
    isDeleted: false,
  });
  if (!blogExist) {
    return next(new Error("blog not found", { cause: 404 }));
  }
  if (req.files?.mainImage?.length > 0) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.files?.mainImage[0]?.path,
      {
        folder: `${process.env.APP_NAME}/blogs/${blogExist.customId}/mainImage`,
      }
    );
    if (blogExist?.mainImage) {
      await cloudinary.uploader.destroy(blogExist?.mainImage?.public_id);
    }
    req.body.mainImage = { public_id, secure_url };
  }
  const subImages = [];
  if (req.files?.subImages?.length) {
    // upload subImages one by one
    for (const image of req.files.subImages) {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        image?.path,
        {
          folder: `${process.env.APP_NAME}/blogs/${blogExist.customId}/subImage`,
        }
      );
      subImages.push({ public_id, secure_url });
    }
    req.body.subImages = subImages;
  }
  req.body.updatedBy = req.user._id;
  const updatedBlog = await blogModel
    .findOneAndUpdate({ _id: req.params.id, isDeleted: false }, req.body, {
      new: true,
    })
    .select("-isDeleted -createdAt -updatedAt -__v -createdBy -customId");
  return res.status(200).json({ message: "done", data: updatedBlog });
};
export const getBlogs = async (req, res, next) => {
  req.query.fields = `-isDeleted,-updatedAt,-__v,-createdBy,-customId`;
  const apiFeature = new ApiFeatures(
    blogModel.find({ isDeleted: false }),
    req.query
  )
    .paginate()
    .filter()
    .sort()
    .fields()
    .search();
  const blogs = await apiFeature.mongooseQuery;
  return res.status(200).json({ message: "done", data: blogs });
};
export const getBlogById = async (req, res, next) => {
  const blog = await blogModel
    .findOne({ _id: req.params.id, isDeleted: false })
    .select("-isDeleted -createdAt -updatedAt -__v -createdBy -customId");
  if (!blog) {
    return next(new Error("blog not found", { cause: 404 }));
  }
  return res.status(200).json({ message: "done", data: blog });
};

export const deleteBlog = async (req, res, next) => {
  const blog = await blogModel.findOne({
    _id: req.params.id,
    isDeleted: false,
  });
  if (!blog) {
    return next(new Error("blog not found", { cause: 404 }));
  }
  const blogFolderPath = `${process.env.APP_NAME}/blogs/${blog?.customId}`;
  if (blog?.mainImage) {
    await cloudinary.uploader.destroy(blog.mainImage?.public_id);
    await cloudinary?.api?.delete_all_resources(blogFolderPath);
    await cloudinary?.api?.delete_folder(blogFolderPath);
  }
  if (blog?.subImages.length > 0 && !blog?.mainImage) {
      await cloudinary?.api?.delete_all_resources(blogFolderPath);
      await cloudinary?.api?.delete_folder(blogFolderPath);
  }

  const deletedBlog = await blogModel.findByIdAndUpdate(
    { _id: req.params.id },
    { isDeleted: true },
    { new: true }
  );
  if (!deletedBlog.isDeleted) {
    return next(new Error("failed to delete blog", { cause: 400 }));
  }
  return res.status(200).json(true);
};
