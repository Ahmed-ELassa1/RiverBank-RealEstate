import { Schema, Types, model } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "title is required"],
      min: [3, "min length 3 char"],
      max: [30, "max length 30 char"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
      min: [3, "min length 3 char"],
      max: [500, "max length 500 char"],
    },
    mainImage: Object,
    customId: String,
    subImages: [
      {
        type: Object,
      },
    ],
    createdBy: {
      type: Types.ObjectId,
      required: [true, "userId is required"],
      ref: "User",
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const blogModel = model("Blog", blogSchema);
export default blogModel;
