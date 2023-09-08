import { Box, Card, Divider, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { downVoteAnswer, upVoteAnswer } from "../reducers/questionSlice";
import { RootState } from "../store/store";

interface AnswerCard {
  answer: {
    _id: string | number;
    answerBody: string;
    userAnswered: string;
    answeredOn: Date;
    upVotes: number;
    downVotes: number;
  };
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
  card: {
    marginBottom: "16px",
    height: "100%",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
  },
  contentContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  infoContainer: {
    display: "flex",
    alignItems: "center",
  },
  votes: {
    backgroundColor: "#eeeeee",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    minWidth: "60px",
    maxWidth: "60px",
  },
  text: {
    margin: "20px 20px 20px 20px",
    textAlign: "left",
  },
  answerPersonalInfo: {
    marginTop: "18px",
    textAlign: "right",
  },
  // button: {
  //   backgroundColor: "transparent",
  //   color: "inherit",
  //   boxShadow: "none",
  //   textTransform: "none",
  //   borderRadius: 0,
  //   padding: 0,
  //   minWidth: "unset",
  // },
}));

const AnswerCard: React.FC<AnswerCard> = ({ answer, question }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [voted, setVoted] = useState(false);
  const upVotes = useSelector(
    (state: RootState) =>
      state.question.questionsList
        .find((q) => q._id === question._id)
        ?.answer.find((a) => a._id === answer._id)?.upVotes || 0
  );

  const downVotes = useSelector(
    (state: RootState) =>
      state.question.questionsList
        .find((q) => q._id === question._id)
        ?.answer.find((a) => a._id === answer._id)?.downVotes || 0
  );

  const upVoteHandler = async () => {
    if (!voted) {
      dispatch(
        upVoteAnswer({ answerId: answer._id, questionId: question._id })
      );

      try {
        const tempToken = localStorage.getItem("token");
        await fetch(
          `http://localhost:8080/questions/${question._id}/answers/${answer._id}/upvote`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${tempToken}`,
            },
          }
        );
      } catch (error) {
        console.error("Error upVoting answer:", error);
      }

      setVoted(true);
    }
  };

  const downVoteHandler = async () => {
    if (!voted) {
      dispatch(
        downVoteAnswer({ answerId: answer._id, questionId: question._id })
      );

      try {
        const tempToken = localStorage.getItem("token");
        await fetch(
          `http://localhost:8080/questions/${question._id}/answers/${answer._id}/downvote`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${tempToken}`,
            },
          }
        );
      } catch (error) {
        console.error("Error downVoting answer:", error);
      }

      setVoted(true);
    }
  };

  return (
    <>
      <Card className={classes.card}>
        <Box className={classes.infoContainer}>
          <Box className={classes.votes}>
            <Button onClick={upVoteHandler}>
              <ArrowDropUp style={{ fontSize: "34px" }} />
            </Button>
            <Typography style={{ fontSize: "30px" }}>
              {upVotes - downVotes}
            </Typography>
            <Button onClick={downVoteHandler}>
              <ArrowDropDown style={{ fontSize: "34px" }} />
            </Button>
          </Box>
          <Box sx={{ margin: "10px 10px 10px 10px", textAlign: "left" }}>
            <Typography>{answer.answerBody}</Typography>
          </Box>
        </Box>
        <Box className={classes.answerPersonalInfo}>
          <Typography>
            answer{" "}
            <b>
              {new Date(answer.answeredOn).toLocaleDateString(undefined, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </b>
          </Typography>
          <Typography>
            by <b>{answer.userAnswered}</b>
          </Typography>
        </Box>
      </Card>
      <Divider />
    </>
  );
};

export default AnswerCard;
