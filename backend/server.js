import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

dotenv.config(); // load environment variables

connectDB(); // connect to MongoDB

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://production-url' : 'http://localhost:5173',
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// test route
app.get("/", (req, res) => {
    res.json({ message: "API is running..."});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
