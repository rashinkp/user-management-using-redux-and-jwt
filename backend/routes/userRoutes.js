import express from "express";
import {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/protectRole.js";

const router = express.Router();

router.post("/", upload.single('profile'), registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, upload.single("profile"), updateUserProfile);

export default router;
