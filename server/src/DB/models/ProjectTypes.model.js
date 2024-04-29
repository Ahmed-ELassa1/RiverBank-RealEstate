import { Schema, Types, model } from "mongoose";

const projectTypesSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "title is required"],
    },
    slug: {
      type: String,
      required: [true, "slug is required"],
    },
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
const projectTypeModel = model("ProjectType", projectTypesSchema);
export default projectTypeModel;
