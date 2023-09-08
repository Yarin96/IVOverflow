import MainContainer from "../shared/components/Container/MainContainer";
import QuestionsList from "./QuestionsList";
import { List, Typography } from "@mui/material";

const HomeMainbar = () => {
  return (
    <MainContainer>
      <Typography variant="h3" sx={{ marginTop: "46px", fontWeight: "bold" }}>
        All Questions 💡
      </Typography>
      <List>
        <QuestionsList />
      </List>
    </MainContainer>
  );
};

export default HomeMainbar;
