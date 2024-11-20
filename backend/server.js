import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cors from 'cors'

connectDB();

const port = process.env.PORT || 3000;

import userRoutes from "./routes/userRoutes.js";
import adminRoutes from './routes/adminRoutes.js';

const app = express();

app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true, 
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use('/api/admin', adminRoutes);


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
