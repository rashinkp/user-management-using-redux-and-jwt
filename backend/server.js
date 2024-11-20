import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import path from "path";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Resolve __dirname for ES modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const rootDir = path.resolve(); // Root directory of the project
const publicDir = path.join(__dirname, "../public");

app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files
app.use(express.static(publicDir)); // Serve the public folder
app.use("/uploads", express.static(path.join(rootDir, "uploads"))); // Serve the uploads folder

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
