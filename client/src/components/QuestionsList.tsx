import { useEffect } from "react";
import QuestionCard from "./QuestionCard";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setQuestionsList } from "../reducers/questionSlice";
import { RootState } from "../store/store";

const QuestionsList: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.question.isLoading);
  const refreshQuestionsKey = useSelector(
    (state: RootState) => state.refreshQuestionsKey
  );
  const filteredQuestions = useSelector((state: RootState) => {
    const searchQuery = state.question.searchQuery.toLowerCase();
    return state.question.questionsList.filter((question) =>
      question.questionTitle.toLowerCase().includes(searchQuery)
    );
  });

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const tempToken = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/questions`, {
          headers: {
            Authorization: `Bearer ${tempToken}`,
          },
        });
        const data = await response.json();
        dispatch(setQuestionsList(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getQuestions();
  }, [dispatch, refreshQuestionsKey]);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          {Array.isArray(filteredQuestions) &&
          filteredQuestions.length === 0 ? (
            <Typography variant="h6">No questions yet!</Typography>
          ) : (
            <>
              <Typography variant="h6" sx={{ marginBottom: "20px" }}>
                {filteredQuestions.length} questions
              </Typography>
              {filteredQuestions.map((question, index) => (
                <QuestionCard key={index} question={question} />
              ))}
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default QuestionsList;
