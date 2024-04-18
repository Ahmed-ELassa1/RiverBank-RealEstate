import { Schema, Types, model } from "mongoose";

const developerSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    logo: {
      type: Object,
      required: [true, "logo is required"],
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
const developerModel = model("Developer", developerSchema);
export default developerModel;
