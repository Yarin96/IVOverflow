import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { Box, CircularProgress, Typography } from "@mui/material";
import AnswerCard from "./AnswerCard";

const AnswersList = ({ question }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.question.isLoading);
  const refreshAnswersKey = useSelector(
    (state: RootState) => state.refreshAnswersKey
  );

  const [answerData, setAnswerData] = useState(question.answer);

  const totalVotes = question.downVotes + question.upVotes;
  console.log(question.downVotes);

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
        setAnswerData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAnswers();
  }, [dispatch, refreshAnswersKey, question._id]);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Typography variant="h6">{answerData.length} Answers</Typography>
          {answerData.map((answer, index) => (
            <AnswerCard key={index} answer={answer} votes={totalVotes} />
          ))}
        </Box>
      )}
    </>
  );
};

export default AnswersList;
