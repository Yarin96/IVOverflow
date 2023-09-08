import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Button,
  TextField,
  Grid,
  Box,
  List,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LoadingButton } from "@mui/lab";
import { DirectionsRunOutlined, SendRounded } from "@mui/icons-material";
import MainContainer from "../shared/components/Container/MainContainer";
import AnswersList from "./AnswersList";
import { incrementRefreshKey } from "../reducers/refreshAnswersKey";
import { addAnswerToQuestion } from "../reducers/questionSlice";

const useStyles = makeStyles(() => ({
  card: {
    maxWidth: "700px",
    margin: "0 auto",
    marginTop: "60px",
    padding: "2px",
  },
  card__header: {
    textAlign: "left",
    marginLeft: "18px",
    marginBottom: "12px",
  },
  link: {
    marginBottom: "54px",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#ecb332",
  },
  separator: {
    borderBottom: "1px solid #ccc",
  },
  questionBody: {
    paddingTop: "48px",
    paddingBottom: "28px",
    textAlign: "left",
    paddingLeft: "18px",
  },
  tags: {
    textAlign: "left",
    marginLeft: "18px",
    marginBottom: "18px",
  },
  answer__section: {
    marginLeft: "18px",
    marginRight: "15px",
    marginTop: "28px",
  },
  answer__text: {
    textAlign: "left",
    width: "100%",
  },
}));

const QuestionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const questionsList = useSelector(
    (state: RootState) => state.question.questionsList
  );

  const question = questionsList?.find((q) => q._id === id);

  if (!question) {
    return <Typography variant="h5">No question found.</Typography>;
  }

  const postAnswerHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (answer.trim() === "") {
      alert("Enter an answer before submitting! 🧐");
    } else {
      const tempToken = localStorage.getItem("token");
      const userName = localStorage.getItem("userName");

      if (question.userPosted === userName) {
        alert("You cannot comment on your own question. 🤯");
        return;
      }

      const submittedData = {
        userId: question._id,
        answerBody: answer,
        userAnswered: userName,
      };

      try {
        const response = await fetch(
          `http://localhost:8080/questions/${question._id}/submitAnswer`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tempToken}`,
            },
            body: JSON.stringify(submittedData),
          }
        );
        const data = await response.json();
        dispatch(
          addAnswerToQuestion({ questionId: question._id, answer: data })
        );
        dispatch(incrementRefreshKey());

        if (!response.ok) {
          const errorData = await response.json();
          console.log("Error details: ", errorData);
        }
      } catch (error) {
        console.log("An error occurred: ", error);
      } finally {
        setIsSubmitting(false);
        setAnswer("");
      }
    }
  };

  return (
    <MainContainer>
      <Card className={classes.card}>
        <CardContent>
          <Box className={classes.link}>
            <Button
              sx={{ color: "#6c5522", fontWeight: "bold", height: "100%" }}
              onClick={() => navigate(-1)}
            >
              Back To Homepage&nbsp;
              <DirectionsRunOutlined />
            </Button>
          </Box>
          <Box className={classes.card__header}>
            <Typography variant="h5" className={classes.title}>
              {question.questionTitle}
            </Typography>
            <Typography variant="body2">
              asked <b>{question.formattedTime}</b> by{" "}
              <b>{question.userPosted}</b>
            </Typography>
          </Box>
          <Divider className={classes.separator} />
          <Typography variant="body1" className={classes.questionBody}>
            {question.questionBody}
          </Typography>
          <Box className={classes.tags}>
            {question.questionTags.map((tag) =>
              tag !== "" ? (
                <Chip key={tag} label={tag} sx={{ marginLeft: "4px" }} />
              ) : null
            )}
          </Box>
          <Divider className={classes.separator} />
          <List>
            {question.noOfAnswers !== 0 ? (
              <AnswersList question={question} />
            ) : (
              <Typography
                sx={{
                  textAlign: "left",
                  marginLeft: "18px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginTop: "14px",
                  marginBottom: "14px",
                }}
              >
                No comments yet. Be the first to answer!
              </Typography>
            )}
          </List>
          <Divider className={classes.separator} />
          <Grid className={classes.answer__section}>
            <TextField
              label="Type Your Answer Here"
              multiline
              rows={6}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className={classes.answer__text}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              style={{
                float: "right",
                marginTop: "16px",
                marginBottom: "16px",
                borderColor: "white",
                backgroundColor: "#e8a304",
              }}
              loading={isSubmitting}
              onClick={postAnswerHandler}
            >
              Post Answer&nbsp;&nbsp;
              <SendRounded />
            </LoadingButton>
          </Grid>
        </CardContent>
      </Card>
    </MainContainer>
  );
};

export default QuestionDetails;
