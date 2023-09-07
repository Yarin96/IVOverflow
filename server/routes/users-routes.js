import express from "express";
import { check } from "express-validator";
import login from "../controllers/users.controllers.js";

const router = express.Router();

router.post(
  "/",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  login
);

export default router;
