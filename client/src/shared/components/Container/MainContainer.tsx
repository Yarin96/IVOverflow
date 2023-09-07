import { makeStyles } from "@mui/styles";
import { Paper } from "@mui/material";
import backgroundImage from "../../../assets/bg.png";

interface MainContainerProps {
  children: React.ReactNode;
}

const useStyles = makeStyles(() => ({
  bg: {
    marginTop: "100px",
    paddingBottom: "100px",
    height: "100%",
    overflowY: "hidden",
    backgroundImage: `url(${backgroundImage})`,
  },
}));

const MainContainer: React.FC<MainContainerProps> = (props) => {
  const classes = useStyles();

  return <Paper className={classes.bg}>{props.children}</Paper>;
};

export default MainContainer;
