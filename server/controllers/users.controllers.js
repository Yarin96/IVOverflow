import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import HttpError from "../models/http-error.js";
import User from "../models/user.js";

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    if (mongoose.connection.readyState !== 1) {
      console.error("MongoDB connection is not active.");
      return next(new HttpError("Database connection error.", 500));
    }

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      const errorThrown = new HttpError(
        "Couldn't log you in, please check your credentials and try again.",
        401
      );
      return next(errorThrown);
    }

    if (!existingUser.validPassword(password)) {
      const errorThrown = new HttpError(
        "Couldn't log you in, please check your credentials and try again.",
        401
      );
      return next(errorThrown);
    }

    let token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Logged in!",
      userId: existingUser._id,
      email: existingUser.email,
      name: existingUser.name,
      nickname: existingUser.nickname,
      token: token,
    });
  } catch (error) {
    const errorThrown = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(errorThrown);
  }
}

export default login;
