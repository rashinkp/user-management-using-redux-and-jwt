import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "can not find any users" });
    }
  } catch (err) {
    res.status(400).json({ message: "error while fetching data" });
  }
};

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      res.status(401);
      throw new Error('Invalid Email')
    }

    if (admin.password !== password) {
      res.status(401);
      throw new Error('Invalid password')
    }
    generateToken(res, admin._id);
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  
});

const logoutAdmin = async (req, res) => {
  console.log("hello logout controller has been called..........1");
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged out" });
};

const addUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const profile = req.file ? req.file.path : null;

  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new Error("User already exists");
  }


  // if (req.file) {
  //   const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
  //   if (!allowedMimeTypes.includes(req.file.mimetype)) {
  //     const fs = require("fs");
  //     fs.unlinkSync(req.file.path);
  //     throw new Error("Only JPG and PNG file formats are allowed");
  //   }
  // }

  const user = await User.create({
    name,
    email,
    password,
    profile,
  });

  if (user) {
    res.status(201).json({ message: "User added successfully" });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const deletUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.status(200).json({ message: "User Deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  if (!id) throw new Error("User ID is required");

  try {
    const user = await User.findById(id);
    if (user) {

      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;

      const updateUser = await user.save();
      res.status(200).json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
      });

    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(404);
    throw new Error("Error found while updating user");
  }
});

export { getUsers, authAdmin, logoutAdmin, addUser, deletUser, updateUser };
