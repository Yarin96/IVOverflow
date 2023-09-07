import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import usersRoutes from "./routes/users-routes.js";
import questionsRoutes from "./routes/questions-routes.js";
import HttpError from "./models/http-error.js";

dotenv.config();
const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use("/auth", usersRoutes);

app.use("/questions", questionsRoutes);

app.use(() => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.g0c6jcs.mongodb.net/IVOverflow?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(8080, () => console.log("Server listens on port 8080."));
  })
  .catch((error) => {
    console.log(error);
  });
