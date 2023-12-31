import jwt from "jsonwebtoken";
import HttpError from "../models/http-error.js";

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed!");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    const errorThrown = new HttpError("Authentication failed!", 401);
    return next(errorThrown);
  }
};

export default checkAuth;
