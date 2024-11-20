import express from "express";
import {
  getUsers,
  authAdmin,
  logoutAdmin,
  addUser,
  deletUser,
} from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/protectAdmin.js";
const router = express.Router();

router.get("/", protectAdmin, getUsers);
router.post("/login", authAdmin);
router.post("/logout", logoutAdmin);
router.post("/addUser", protectAdmin, addUser);
router.delete("/deleteUser/:id", protectAdmin, deletUser);

export default router;
