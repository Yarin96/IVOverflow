import { AppBar, Typography, Toolbar, Grid, Button, Box } from "@mui/material";
import { MeetingRoom, LayersOutlined } from "@mui/icons-material";
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
  const username = localStorage.getItem("userName");

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
                    display: "flex",
                    alignItems: "center",
                    color: "#000000",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    fontWeight: "bold",
                    fontSize: "34px",
                    textDecoration: "none",
                  }}
                >
                  IVOverflow&nbsp;
                  <LayersOutlined
                    sx={{
                      fontSize: "40px",
                    }}
                  />
                </Typography>
              </Link>
            ) : (
              <Typography
                fontFamily={"'Rubik', sans-serif"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#000000",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  fontWeight: "bold",
                  fontSize: "34px",
                }}
              >
                IVOverflow&nbsp;
                <LayersOutlined
                  sx={{
                    fontSize: "40px",
                  }}
                />
              </Typography>
            )}
          </Grid>
          {token && location.pathname !== "/" && (
            <>
              <Grid xs={4} item style={{ display: "flex" }}>
                <SearchBar />
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "4px",
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{ color: "black", fontSize: "14px" }}
                  >
                    Welcome back, {username}!
                  </Typography>
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
                </Box>
                <AskQuestionModal open={openModal} onClose={handleClose} />
              </Grid>
              <Grid
                xs={1}
                item
                style={{ display: "flex", marginRight: "10px" }}
              >
                <Form action="/logout" method="post">
                  <Button
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      height: "100%",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "#cb8d00",
                      },
                    }}
                    type="submit"
                  >
                    <MeetingRoom />
                    &nbsp;Logout
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
