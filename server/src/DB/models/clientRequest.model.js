import { Schema, model } from "mongoose";

const clientRequestSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "userName is required"],
      min: [2, "min length 2 char"],
      max: [20, "max length 20 char"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    preferredLocation: {
      type: String,
      required: [true, "phone is required"],
    },
    message: {
      type: String,
      required: [true, "message is required"],
      min: [3, "min length 3 char"],
      max: [500, "max length 500 char"],
    },
    read: {
      type: String,
      enum: ["read", "unRead"],
      default: "unRead",
    },
    seen: {
      type: String,
      enum: ["seen", "unSeen"],
      default: "unSeen",
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
const clientRequestModel = model("ClientRequest", clientRequestSchema);
export default clientRequestModel;
