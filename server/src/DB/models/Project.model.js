import { Schema, Types, model } from "mongoose";

const projectSchema = new Schema(
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
    mainDescription: {
      type: String,
      required: [true, "Main Description is required"],
    },
    projectDetails: [
      {
        question: {
          type: String,
          required: [true, "question is required"],
        },
        answer: {
          type: String,
          required: [true, "answer is required"],
        },
      },
    ],
    projectContent: { type: [String], required: true },
    cityId: {
      type: Types.ObjectId,
      ref: "City",
      require: [true, "City is required"],
    },
    projectType: {
      type: Types.ObjectId,
      ref: "ProjectType",
      required: [true, "Project Type is required"],
    },
    developerId: {
      type: Types.ObjectId,
      ref: "Developer",
    },
    mainImage: {
      type: Object,
      require: [true, "Main Image is required"],
    },
    seoData: String,
    projectDescriptions: [
      {
        type: String,
        required: [true, "Project Descriptions is required"],
      },
    ],
    subImages: [
      {
        type: Object,
        required: [true, "sub Images is required"],
      },
    ],
    projectQuestions: [
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

    whatsAppNumber: {
      type: String,
      required: [true, "WhatsApp Number is required"],
    },
    callToAction: {
      type: String,
      required: [true, "Call To Action is required"],
    },
    contactMessage: {
      type: String,
      required: [true, "message is required"],
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
