import formidable from "express-formidable";
import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/AuthController.js";
import { isAuth, isAdmin } from "../middelswares/authMiddleware.js";
const router = express.Router();

// auth route
router.get("/user-auth", isAuth, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected routes admin
router.get("/admin-auth", isAuth, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
router.post("/register", formidable(), registerController);
router.post("/login", loginController);

export default router;
