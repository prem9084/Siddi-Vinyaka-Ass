import userModel from "../model/userModel.js";
import fs from "fs";

export const UserUpdateController = async (req, res) => {
  try {
    const { name, email, address } = req.fields;
    const { profilePic } = req.files;

    // validations

    if (!name) {
      return res.status(404).send({ message: "Name is required" });
    }
    if (!email) {
      return res.status(404).send({ message: "Email is required" });
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

    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.fields,
      },
      { new: true }
    );

    if (profilePic) {
      user.profilePic.data = fs.readFileSync(profilePic.path);
      user.profilePic.contentType = profilePic.type;
    }

    await user.save();

    res.status(200).send({
      success: true,
      message: "User Update Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("-profilePic");
    res.status(200).send({
      success: true,
      user,
      message: "Get Single Uer Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPhotoController = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("+photo");

    if (user.profilePic.data) {
      res.set("Content-Type", user.profilePic.contentType);
      return res.status(200).send(user.profilePic.data);
    }

    res.status(200).send({
      success: true,
      user,
    });
  } catch (error) {
    console.log();
  }
};
