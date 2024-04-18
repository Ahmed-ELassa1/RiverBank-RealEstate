import { verifyToken } from "../../utils/generateAndVerifyToken.js";
import userModel from "../models/User.model.js";

const auth = (role) => {
  return async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return next(new Error("please login first", { cause: 400 }));
    }
    if (!authorization.startsWith(process.env.TOKEN_BEARER_KEY)) {
      return next(new Error("invalid bearer key", { cause: 400 }));
    }
    const token = authorization?.split(process.env.TOKEN_BEARER_KEY)[1];
    if (!token) {
      return next(new Error("invalid token", { cause: 400 }));
    }
    const decodedToken = verifyToken({
      token,
      signature: process.env.JWT_TOKEN_SIGNATURE,
    });
    if (!decodedToken?._id) {
      return next(new Error("invalid token payload", { cause: 400 }));
    }
    const authUser = await userModel.findById({ _id: decodedToken?._id });
    if (!authUser) {
      return next(new Error("please sign up first", { cause: 404 }));
    }
    if (!authUser?.confirmEmail) {
      return next(new Error("please confirm your email", { cause: 400 }));
    }
    if (authUser?.status == "offline") {
      return next(new Error("please login first", { cause: 400 }));
    }
    if (authUser?.isDeleted) {
      return next(new Error("user is deleted", { cause: 400 }));
    }
    if (!role.includes(authUser?.role)) {
      return next(
        new Error("not authorized to do this action", { cause: 401 })
      );
    }
    req.user = authUser;
    return next();
  };
};
export default auth;
