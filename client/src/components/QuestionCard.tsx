import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";

interface QuestionCardProps {
  question: {
    _id: number | string;
    upVotes: number;
    downVotes: number;
    noOfAnswers: number;
    questionTitle: string;
    questionBody: string;
    questionTags: string[];
    userPosted: string;
    time: string;
    formattedTime: string;
  };
}

const useStyles = makeStyles(() => ({
  card: {
    marginBottom: "6px",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
    color: "#fef3e3",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    display: "inline-block",
    marginLeft: "auto",
    marginRight: "auto",
    textDecoration: "none",
    marginBottom: "6px",
    color: "#ecb332",
    "&:focus": {
      outline: "none",
    },
  },
  tagChip: {
    marginRight: "6px",
    marginBottom: "6px",
  },
  contentContainer: {
    maxWidth: "80%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    marginBottom: "12px",
  },
  linkContainer: {
    marginBottom: "20px",
  },
  questionPersonalInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
}));

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const classes = useStyles();

  const shortenString = (string: string, num: number) => {
    if (string.length > num) {
      return string.slice(0, num) + "...";
    } else {
      return string;
    }
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Box className={classes.statsContainer}>
          <Typography variant="h6">
            {question.upVotes - question.downVotes} Votes
          </Typography>
        </Box>
        <Box className={classes.statsContainer}>
          <Typography variant="h6">{question.noOfAnswers} Answers</Typography>
        </Box>
        <Box className={classes.linkContainer}>
          <Link to={`/questions/${question._id}`} className={classes.link}>
            <Typography variant="h5">{question.questionTitle}</Typography>
          </Link>
        </Box>
        <Box className={classes.contentContainer}>
          <Box className={classes.text}>
            {shortenString(question.questionBody, 200)}
          </Box>
          <Box>
            {question.questionTags.map((tag) =>
              tag !== "" ? (
                <Chip
                  key={tag}
                  label={tag}
                  className={classes.tagChip}
                  variant="outlined"
                />
              ) : null
            )}
          </Box>
        </Box>
        <Box className={classes.questionPersonalInfo}>
          <Typography>
            Asked <b>{question.formattedTime}</b>
          </Typography>
          <Typography>
            by <b>{question.userPosted}</b>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
