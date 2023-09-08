import HttpError from "../models/http-error.js";
import Question from "../models/question.js";

export default async function addQuestion(req, res, next) {
  const postQuestionData = req.body;
  const postQuestion = new Question(postQuestionData);

  try {
    await postQuestion.save();
    res.status(200).json("Posted a question successfully.");
  } catch (error) {
    console.error(error);
    const errorThrown = new HttpError("Couldn't post a new question.", 409);
    return next(errorThrown);
  }
}

export async function getAllQuestions(req, res, next) {
  try {
    const questionsList = await Question.find().sort({ time: -1 });
    res.status(200).json(questionsList);
  } catch (error) {
    const errorThrown = new HttpError("Couldn't get all questions.", 404);
    return next(errorThrown);
  }
}

export async function addAnswer(req, res, next) {
  const { answerBody, userAnswered } = req.body; // userId also possible

  try {
    const question = await Question.findById(req.params.questionId);

    if (!question) {
      const errorThrown = new HttpError("Question not found.", 404);
      return next(errorThrown);
    }

    question.answer.push({
      answerBody,
      userAnswered,
    });

    question.noOfAnswers += 1;

    await question.save();

    res.status(200).json("Posted an answer successfully.");
  } catch (error) {
    const errorThrown = new HttpError(
      "Couldn't post a new answer to this question.",
      409
    );
    return next(errorThrown);
  }
}

export async function getAllAnswers(req, res, next) {
  const questionId = req.params.questionId;

  try {
    const question = await Question.findById(questionId);

    if (!question) {
      const errorThrown = new HttpError("Question not found.", 404);
      return next(errorThrown);
    }

    const answersList = question.answer;

    res.status(200).json(answersList);
  } catch (error) {
    const errorThrown = new HttpError("Couldn't get all answers.", 404);
    return next(errorThrown);
  }
}

export async function upVoteAnswer(req, res, next) {
  const { answerId } = req.params;
  const { userId } = req.userData;

  try {
    const question = await Question.findById(req.params.questionId);

    if (!question) {
      const errorThrown = new HttpError("Question not found.", 404);
      return next(errorThrown);
    }

    const answer = question.answer.find((a) => a._id.toString() === answerId);

    if (!answer) {
      const errorThrown = new HttpError("Answer not found.", 404);
      return next(errorThrown);
    }

    const userHasUpVoted = answer.votes.upVotes.includes(userId);

    if (!userHasUpVoted) {
      answer.votes.upVotes.push(userId);
      answer.upVotes += 1;
      question.upVotes += 1;

      const downVoteIndex = answer.votes.downVotes.indexOf(userId);
      if (downVoteIndex !== -1) {
        answer.votes.downVotes.splice(downVoteIndex, 1);
        answer.downVotes -= 1;
        question.downVotes -= 1;
      }
    }

    await question.save();

    res.status(200).json("Upvoted the answer successfully.");
  } catch (error) {
    const errorThrown = new HttpError("Couldn't upvote the answer.", 409);
    return next(errorThrown);
  }
}

export async function downVoteAnswer(req, res, next) {
  const { answerId } = req.params;
  const { userId } = req.userData;

  try {
    const question = await Question.findById(req.params.questionId);

    if (!question) {
      const errorThrown = new HttpError("Question not found.", 404);
      return next(errorThrown);
    }

    const answer = question.answer.find((a) => a._id.toString() === answerId);

    if (!answer) {
      const errorThrown = new HttpError("Answer not found.", 404);
      return next(errorThrown);
    }

    const userHasDownVoted = answer.votes.downVotes.includes(userId);

    if (!userHasDownVoted) {
      answer.votes.downVotes.push(userId);
      answer.downVotes += 1;
      question.downVotes += 1;

      const upVoteIndex = answer.votes.upVotes.indexOf(userId);
      if (upVoteIndex !== -1) {
        answer.votes.upVotes.splice(upVoteIndex, 1);
        answer.upVotes -= 1;
        question.upVotes -= 1;
      }
    }

    await question.save();

    res.status(200).json("Downvoted the answer successfully.");
  } catch (error) {
    const errorThrown = new HttpError("Couldn't downvote the answer.", 409);
    return next(errorThrown);
  }
}
