import express from "express";
import addQuestion from "../controllers/questions.controllers.js";
import {
  getAllQuestions,
  getAllAnswers,
  addAnswer,
} from "../controllers/questions.controllers.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/:questionId/submitAnswer", checkAuth, addAnswer);
router.get("/:questionId/answers", checkAuth, getAllAnswers);
router.post("/add", checkAuth, addQuestion);
router.get("/", checkAuth, getAllQuestions);

export default router;
