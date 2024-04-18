import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "userName is required"],
      min: [3, "min length 3 char"],
      max: [30, "max length 30 char"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already exit"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    image: Object,
    code: String,
    customId: String,
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["offline", "online"],
      default: "offline",
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
const userModel = model("User", userSchema);
export default userModel;
