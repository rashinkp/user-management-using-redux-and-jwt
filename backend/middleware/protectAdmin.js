import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";

const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const admin = await Admin.findById(decoded.userId);

      if (!admin) {
        res.status(401);
        throw new Error("Admin not found, Not authorized");
      }

      req.admin = admin;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, Invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, No token");
  }
});

export { protectAdmin };
