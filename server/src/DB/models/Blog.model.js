import { Schema, Types, model } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    mainDescription: {
      type: String,
    },
    blogContent: { type: [String], required: true },
    mainImage: { type: Object, required: [true, "main image is required"] },
    customId: String,
    blogDescriptions: [
      {
        type: String,
        required: [true, "blog Descriptions is required"],
      },
    ],
    subImages: [
      {
        type: Object,
      },
    ],
    blogQuestions: [
      {
        question: {
          type: String,
          required: [true, "question is required"],
        },
        answer: {
          type: String,
          required: [true, "question is required"],
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
const blogModel = model("Blog", blogSchema);
export default blogModel;
