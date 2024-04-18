import { Schema, Types, model } from "mongoose";

const projectSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "title is required"],
      min: [2, "min length 2 char"],
      max: [20, "max length 20 char"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
      min: [2, "min length 2 char"],
    },
    features: [String],
    location: {
      type: String,
      min: [2, "min length 2 char"],
    },
    logo: {
      type: Object,
      required: [true, "logo is required"],
    },
    currency: {
      type: String,
      enum: ["USD", "EGP", "SAR", "EUR", "AED"],
      default: "EGP",
    },
    price: {
      type: Number,
      min: 1,
    },
    customId: String,
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
const projectModel = model("Project", projectSchema);
export default projectModel;
