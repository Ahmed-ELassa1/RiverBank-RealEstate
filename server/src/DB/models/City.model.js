import { Schema, Types, model } from "mongoose";

const citySchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "title is required"],
    },
    slug: {
      type: String,
      unique: true,
      required: [true, "slug is required"],
    },
    projects: [Types.ObjectId],
    description: {
      type: String,
    },
    cityQuestions: [
      {
        question: {
          type: String,
        },
        answer: {
          type: String,
        },
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
const cityModel = model("City", citySchema);
export default cityModel;
