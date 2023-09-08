import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { Box, CircularProgress, Typography } from "@mui/material";
import AnswerCard from "./AnswerCard";
import { makeStyles } from "@mui/styles";

interface QuestionCard {
  question: {
    _id: number | string;
    upVotes: number;
    downVotes: number;
    noOfAnswers: number;
    questionTitle: string;
    questionBody: string;
    questionTags: string[];
    userPosted: string;
    time: Date;
    formattedTime: string;
    answer: {
      _id: string | number;
      answerBody: string;
      userAnswered: string;
      answeredOn: Date;
      upVotes: number;
      downVotes: number;
    }[];
  };
}

const useStyles = makeStyles(() => ({
  title: {
    padding: "40px 20px 40px 20px",
    display: "flex",
    alignItems: "flex-start",
    fontWeight: "bold !important",
    fontSize: "22px !important",
    color: "#ffbe04",
  },
}));

const AnswersList: React.FC<QuestionCard> = ({ question }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [answersData, setAnswersData] = useState(question.answer);
  const isLoading = useSelector((state: RootState) => state.question.isLoading);
  const refreshAnswersKey = useSelector(
    (state: RootState) => state.refreshAnswersKey
  );

  useEffect(() => {
    const getAnswers = async () => {
      try {
        const tempToken = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080/questions/${question._id}/answers`,
          {
            headers: {
              Authorization: `Bearer ${tempToken}`,
            },
          }
        );
        const data = await response.json();
        setAnswersData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAnswers();
  }, [dispatch, refreshAnswersKey, question._id]);

  const sortedAnswers = answersData.slice().sort((a, b) => {
    const votesA = a.upVotes - a.downVotes;
    const votesB = b.upVotes - b.downVotes;
    return votesB - votesA;
  });

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Typography className={classes.title}>
            {answersData.length} Answers
          </Typography>
          {sortedAnswers.map((answer, index) => (
            <AnswerCard key={index} answer={answer} question={question} />
          ))}
        </Box>
      )}
    </>
  );
};

export default AnswersList;
