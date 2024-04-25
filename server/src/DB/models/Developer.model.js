import { Schema, Types, model } from "mongoose";

const developerSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "title is required"],
    },
    mainDescription: {
      type: String,
    },
    developerContent: { type: [String], required: true },
    mainImage: { type: Object, required: [true, "main image is required"] },
    customId: String,
    developerDescriptions: [
      {
        type: String,
        required: [true, "developer Descriptions is required"],
      },
    ],
    subImages: [
      {
        type: Object,
      },
    ],
    developerQuestions: [
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
const developerModel = model("Developer", developerSchema);
export default developerModel;
