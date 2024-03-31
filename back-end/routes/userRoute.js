import formidable from "express-formidable";
import express from "express";
import { isAuth } from "../middelswares/authMiddleware.js";

import {
  UserUpdateController,
  getPhotoController,
  getSingleUser,
} from "../controllers/userController.js";

const router = express.Router();

// auth route

router.put("/update-user/:id", formidable(), isAuth, UserUpdateController);
router.get("/get-single-user/:id", getSingleUser);
router.get("/get-photo-user/:id", getPhotoController);

export default router;
