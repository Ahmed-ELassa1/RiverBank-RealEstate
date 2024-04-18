import { customAlphabet, nanoid } from "nanoid";
import userModel from "../../../DB/models/User.model.js";
import cloudinary from "../../../utils/cloudinary.js";
import {
  generateToken,
  verifyToken,
} from "../../../utils/generateAndVerifyToken.js";
import {
  comparePassword,
  hashPassword,
} from "../../../utils/hashAndCompare.js";
import sendEmail from "../../../utils/email.js";

export const signUp = async (req, res, next) => {
  const userExist = await userModel.findOne({ email: req.body.email });
  if (userExist) {
    return next(new Error("email already exist", { cause: 409 }));
  }
  const token = generateToken({
    payload: { email: req.body.email },
    signature: process.env.EMAIL_TOKEN_SIGNATURE,
    expireIn: 60 * 30,
  });
  const rf_token = generateToken({
    payload: { email: req.body.email },
    signature: process.env.EMAIL_TOKEN_SIGNATURE,
    expireIn: 60 * 60 * 24,
  });
  const link = `${req.protocol}://${req.headers.host}/user/confirmEmail/${token}`;
  const rf_link = `${req.protocol}://${req.headers.host}/user/refreshToken/${rf_token}`;
  const html = ` 
   <a href=${link} style="color:red;">confirm email</a>
  <br>
  <br>
  <a href=${rf_link} style="color:red;">send new email</a>
`;
  const sendedEmail = sendEmail({
    to: req.body.email,
    subject: "confirm email",
    html,
  });
  if (!sendedEmail) {
    return next(new Error("failed to send email", { cause: 404 }));
  }
  req.body.password = hashPassword({
    plainText: req.body.password,
  });
  req.body.customId = nanoid();
  if (req.file) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: `${process.env.APP_NAME}/users/${req.body.customId}`,
      }
    );
    req.body.image = { public_id, secure_url };
  }
  const newUser = await userModel.create(req.body);
  return res.status(200).json({
    message: "user created successfully",
    id: newUser?.id,
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const userExist = await userModel.findOne({ email });
  if (!userExist) {
    return next(new Error("invalid email or password", { cause: 400 }));
  }
  if (!userExist.confirmEmail) {
    return next(new Error("please confirm your email", { cause: 400 }));
  }
  const passwordMatched = comparePassword({
    plainText: password,
    hashedValue: userExist.password,
  });
  if (!passwordMatched) {
    return next(new Error("invalid email or password", { cause: 400 }));
  }
  userExist.status = "online";
  await userExist.save();
  const token = generateToken({
    payload: {
      _id: userExist._id,
      email: userExist.email,
      userName: userExist.userName,
      role: userExist.role,
    },
    signature: process.env.JWT_TOKEN_SIGNATURE,
    expireIn: 60 * 30,
  });
  const refToken = generateToken({
    payload: {
      _id: userExist._id,
      email: userExist.email,
      userName: userExist.userName,
      role: userExist.role,
    },
    signature: process.env.JWT_TOKEN_SIGNATURE,
    expireIn: 60 * 60 * 24 * 30,
  });
  return res.status(200).json({
    message: "done",
    token,
    refToken,
  });
};
export const confirmEmail = async (req, res, next) => {
  const { email } = verifyToken({
    token: req.params.token,
    signature: process.env.EMAIL_TOKEN_SIGNATURE,
  });
  const userExist = await userModel.findOne({ email });
  if (!userExist) {
    return res.redirect("https://www.google.com");
  }
  if (userExist.confirmEmail) {
    return res.redirect("https://www.facebook.com");
  }
  await userModel.findOneAndUpdate({ email }, { confirmEmail: true });
  return res.redirect("https://www.facebook.com/");
};
export const refreshToken = async (req, res, next) => {
  const { email } = verifyToken({
    token: req.params.token,
    signature: process.env.EMAIL_TOKEN_SIGNATURE,
  });
  const userExist = await userModel.findOne({ email: email });
  if (!userExist) {
    return res.redirect("https://www.google.com");
  }
  if (userExist.confirmEmail) {
    return res.redirect("https://www.google.com/");
  }
  const newToken = generateToken({
    payload: { email },
    signature: process.env.EMAIL_TOKEN_SIGNATURE,
    expireIn: 60 * 10,
  });
  const link = `${req.protocol}://${req.headers.host}/user/confirmEmail/${newToken}`;
  const html = `
    <a href=${link} style="color:red;">confirm email</a>  `;
  const emailSended = sendEmail({
    to: email,
    html,
    subject: "confirm Email",
  });
  if (!emailSended) {
    return next(new Error("failed to send email", { cause: 404 }));
  }
  return res.send("<h2>check your email</h2>");
};
export const sendCode = async (req, res, next) => {
  const userExist = await userModel.findOne({ email: req.body.email });
  if (!userExist) {
    return next(new Error("invalid email", { cause: 404 }));
  }
  if (!userExist.confirmEmail) {
    return next(new Error("please confirm email first", { cause: 400 }));
  }
  const nanoCode = customAlphabet("1234567890", 5);
  const code = nanoCode();
  const emailSended = sendEmail({
    to: req.body.email,
    html: `<h2>your code is: ${code}</h2>`,
    subject: "forget password",
  });
  if (!emailSended) {
    return next(new Error("failed to send email", { cause: 404 }));
  }
  await userModel.updateOne({ email: req.body.email }, { code });
  return res.status(200).json({ message: "please check your email" });
};
export const forgetPassword = async (req, res, next) => {
  const { email, code } = req.body;
  const userExist = await userModel.findOne({ email });
  if (!userExist) {
    return next(new Error("invalid email", { cause: 404 }));
  }
  if (code != userExist.code || code == null) {
    return next(new Error("wrong code", { cause: 400 }));
  }
  const match = comparePassword({
    plainText: req.body.password,
    hashedValue: userExist.password,
  });
  if (match) {
    return next(new Error("you enter an old password", { cause: 400 }));
  }
  const hashedPassword = hashPassword({ plainText: req.body.password });
  const newUser = await userModel
    .findOneAndUpdate(
      { email },
      { password: hashedPassword, code: null, status: "offline" },
      { new: true }
    )
    .select("email userName gender image ");
  return res.status(200).json({ message: "done", data: newUser });
};
export const signOut = async (req, res, next) => {
  await userModel.findByIdAndUpdate(
    { _id: req.user._id },
    { status: "offline" },
    { new: true }
  );
  return res.status(200).json({ message: "done" });
};

export const sessionRefreshToken = async (req, res, next) => {
  const newToken = generateToken({
    payload: {
      _id: req.user._id,
      email: req.user.email,
      userName: req.user.userName,
      role: req.user.role,
    },
    signature: process.env.EMAIL_TOKEN_SIGNATURE,
    expireIn: 60 * 60 * 24 * 30,
  });
  return res.status(200).json({ ref_token: newToken });
};
