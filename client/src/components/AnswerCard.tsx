import { Box, Card, Divider, Typography } from "@mui/material";

const AnswerCard = ({ answer, votes }) => {
  return (
    <>
      <Card>
        <Box>{votes}</Box>
        <Typography>{answer.answerBody}</Typography>
        <Box>
          <Typography>
            answer <b>{answer.answerOn}</b>
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
