import { useLocation } from "react-router-dom";
import MainContainer from "../shared/components/Container/MainContainer";
import QuestionsList from "./QuestionsList";

const HomeMainbar = () => {
  const location = useLocation();

  return (
    <MainContainer>
      <div>
        {location.pathname === "/questions" ? (
          <h1>Latest Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
      </div>
      <div>
        <QuestionsList />
      </div>
    </MainContainer>
  );
};

export default HomeMainbar;
