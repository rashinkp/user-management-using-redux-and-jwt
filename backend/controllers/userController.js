import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

//auth user / set token
//route -> POST /api/users/auth
//access -> Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profile: user.profile
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//register new user
//route -> POST /api/users/register
//access -> Public
const registerUser = asyncHandler(async (req, res) => {
  
  const { name, email, password } = req.body;
  const profile = req.file ? req.file.path : null;


  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    profile,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profile: user.profile,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//logout user
//route -> POST /api/users/logout
//access -> Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

//get user profile
//route -> GET /api/users/profile
//access -> Privet
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

//post update user profile
//route -> PUT /api/users/profile
//access -> Privet
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({ message: "Update user profile" });
});

export {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
};
