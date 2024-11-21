import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";

// General protect middleware
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for admin token first, then user token
  if (req.cookies.admin) {
    token = req.cookies.admin; // Admin cookie
  } else if (req.cookies.user) {
    token = req.cookies.user; // User cookie
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1]; // Bearer token
  }

  if (token) {
    try {
      // Verify token and decode payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Role-based token validation
      if (decoded.role === "admin") {
        const admin = await Admin.findById(decoded.userId);
        if (!admin) {
          res.status(401);
          throw new Error("Admin not found, Not authorized");
        }
        req.admin = admin; // Attach admin data to request
      } else if (decoded.role === "user") {
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
          res.status(401);
          throw new Error("User not found, Not authorized");
        }
        req.user = user; // Attach user data to request
      } else {
        res.status(401);
        throw new Error("Invalid role, Not authorized");
      }

      next(); // Proceed if valid
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, Invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, No token");
  }
});

export { protect };
