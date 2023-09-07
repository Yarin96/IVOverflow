import { AppBar, Typography, Toolbar, Grid, Button } from "@mui/material";
import { Form, Link, useLocation, useRouteLoaderData } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./SearchBar";
import AskQuestionModal from "./AskQuestionModal";

const MainNavigation = () => {
  const location = useLocation();
  const token: any = useRouteLoaderData("root");
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <AppBar
      style={{
        backgroundColor: "#f1d8a0",
      }}
    >
      <Toolbar color="secondary">
        <Grid
          container
          justifyContent="space-between"
          style={{
            paddingBottom: "18px",
            paddingTop: "18px",
          }}
        >
          <Grid xs={1} item style={{ display: "flex" }}>
            {token ? (
              <Link to="/questions" style={{ textDecoration: "none" }}>
                <Typography
                  fontFamily={"'Rubik', sans-serif"}
                  style={{
                    color: "#000000",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    fontWeight: "bold",
                    fontSize: "34px",
                    textDecoration: "none",
                  }}
                >
                  IVOverflow
                </Typography>
              </Link>
            ) : (
              <Typography
                fontFamily={"'Rubik', sans-serif"}
                style={{
                  color: "#000000",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  fontWeight: "bold",
                  fontSize: "34px",
                }}
              >
                IVOverflow
              </Typography>
            )}
          </Grid>
          {token && location.pathname !== "/" && (
            <>
              <Grid xs={4} item style={{ display: "flex" }}>
                <SearchBar />
                <Button
                  onClick={handleOpen}
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    height: "100%",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#cb8d00",
                    },
                  }}
                >
                  Ask Question
                </Button>
                <AskQuestionModal open={openModal} onClose={handleClose} />
              </Grid>
              <Grid xs={1} item style={{ display: "flex" }}>
                <Form action="/logout" method="post">
                  <Button
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "#cb8d00",
                      },
                      height: "100%",
                    }}
                    type="submit"
                  >
                    Logout
                  </Button>
                </Form>
              </Grid>
            </>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavigation;
