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
        // id: {
        //   type: String,
        //   required: [true, "project Detail row id is required"],
        // },
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
    developerId: {
      type: Types.ObjectId,
      ref: "Developer",
    },
    mainImage: {
      type: Object,
      require: [true, "Main Image is required"],
    },
    projectType: {
      type: String,
    },
    seoData: String,
    projectDescriptions: [
      {
        //   id: {
        //     type: String,
        //     required: [true, "project Descriptions row id is required"],
        //   },
        //   images: {
        //     type: Object,
        //     // required: [true, "question is required"],
        //   },
        // description: {
        type: String,
        required: [true, "Project Descriptions is required"],
      },
      // },
    ],
    subImages: [
      {
        type: Object,
        required: [true, "sub Images is required"],
      },
    ],
    projectQuestions: [
      {
        // id: {
        //   type: String,
        //   required: [true, "id is required"],
        // },
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

    // features: [String],
    // location: {
    //   type: String,
    //   min: [2, "min length 2 char"],
    // },
    // logo: {
    //   type: Object,
    //   required: [true, "logo is required"],
    // },
    // currency: {
    //   type: String,
    //   enum: ["USD", "EGP", "SAR", "EUR", "AED"],
    //   default: "EGP",
    // },
    // price: {
    //   type: Number,
    //   min: 1,
    // },
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
