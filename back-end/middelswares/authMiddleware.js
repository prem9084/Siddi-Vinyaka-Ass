import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

export const isAuth = (req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.authorization, process.env.JWT);
    req.user = decode;

    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(500).send({ message: "User Not Authorized" });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
