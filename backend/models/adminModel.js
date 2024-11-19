import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
