import express from "express";
import {
  getUsers,
  authAdmin,
  logoutAdmin,
  addUser,
  deletUser,
  updateUser,
} from "../controllers/adminController.js";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/protectRole.js";
const router = express.Router();

router.get("/",protect, getUsers);
router.post("/login", authAdmin);
router.post("/logout", logoutAdmin);
router.post("/addUser", upload.single("profile"), protect, addUser);
router.delete("/deleteUser/:id", protect, deletUser);
router.put("/updateUser/:id", protect, upload.single("profile"), updateUser);

export default router;
