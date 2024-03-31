import userModel from "../model/userModel.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../utils/authUtiles.js";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, address } = req.fields;
    const { profilePic } = req.files;

    // validations

    if (!name) {
      return res.status(404).send({ message: "Name is required" });
    }
    if (!email) {
      return res.status(404).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(404).send({ message: "Password is required" });
    }
    if (!address) {
      return res.status(404).send({ message: "Address is required" });
    }

    if (profilePic && profilePic.size > 10000000) {
      return res
        .status(404)
        .send({ message: "Profile Picture can not be greater than 1mg" });
    }

    // existing user

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(201).send({
        success: false,
        message: "User Already Register Please Login",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      address,
      profilePic,
    });

    if (profilePic) {
      user.profilePic.data = fs.readFileSync(profilePic.path);
      user.profilePic.contentType = profilePic.type;
    }

    await user.save();

    res.status(200).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

// for user login

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({ message: "Invalid email or password" });
    }

    // existing user

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(200)
        .send({ message: "User is not Register Please login" });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.JWT, {
      expiresIn: "2d",
    });

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(403).json({
        message: "Invalid email password",
      });
    }

    res.status(200).send({
      success: true,
      message: "User Login Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        profilePic: user.profilePic,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
