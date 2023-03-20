import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 8000;

//db connect
import { dbConnect } from "./src/config/dbConfig.js";
dbConnect();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// API routers
import adminRouter from "./src/routers/adminRouter.js";
import categoryRouter from "./src/routers/categoryRouter.js";
import pmRouter from "./src/routers/pmRouter.js";
import { isAuth } from "./src/middlewares/authMiddleware.js";
import productRotuer from "./src/routers/productRouter.js";

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/category", isAuth, categoryRouter);
app.use("/api/v1/payment-method", isAuth, pmRouter);
app.use("/api/v1/product", isAuth, productRotuer);

//root url request
app.use("/", (req, res, next) => {
  const error = {
    message: "You dont have promission here",
  };
  next(error);
});

//global error handler
app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.errorCode || 404;
  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running at http://localhost:${PORT}`);
});
