import MainContainer from "../components/Container/MainContainer";
import MainNavigation from "../components/Navigation/MainNavigation";

const Error = () => {
  return (
    <>
      <MainNavigation />
      <MainContainer>
        <h1>An error occurred!</h1>
        <p>Could not find this page!</p>
      </MainContainer>
    </>
  );
};

export default Error;
