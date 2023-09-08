import express from "express";
import addQuestion from "../controllers/questions.controllers.js";
import {
  getAllQuestions,
  getAllAnswers,
  addAnswer,
  upVoteAnswer,
  downVoteAnswer,
} from "../controllers/questions.controllers.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.patch("/:questionId/answers/:answerId/upvote", checkAuth, upVoteAnswer);
router.patch(
  "/:questionId/answers/:answerId/downvote",
  checkAuth,
  downVoteAnswer
);
router.post("/:questionId/submitAnswer", checkAuth, addAnswer);
router.get("/:questionId/answers", checkAuth, getAllAnswers);
router.post("/add", checkAuth, addQuestion);
router.get("/", checkAuth, getAllQuestions);

export default router;
