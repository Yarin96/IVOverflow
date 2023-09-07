import { useState, useEffect } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Login } from "@mui/icons-material";
import MainContainer from "../shared/components/Container/MainContainer";
import ErrorModal from "../shared/components/UIElements/Modal/ErrorModal";
import { LoadingButton } from "@mui/lab";

const AuthPage = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPass: false,
  });

  const passwordVisibilityHandler = () => {
    setValues({
      ...values,
      showPass: !values.showPass,
    });
  };

  const [error, setError] = useState(undefined);
  const data: any = useActionData();

  useEffect(() => {
    setError(data);
  }, [data]);

  const navigation: any = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const clearErrorHandler = () => {
    setError(undefined);
  };

  return (
    <MainContainer>
      {error && <ErrorModal error={error} onClear={clearErrorHandler} />}
      <Form method="post">
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "800px",
            padding: "20px",
            margin: "auto",
          }}
        >
          <Grid
            container
            direction="column"
            display="flex"
            justifyContent="center"
            style={{ minHeight: "50vh", width: "400px" }}
          >
            <Paper elevation={2} sx={{ padding: 5 }}>
              <Typography
                variant="h3"
                component="h1"
                align="center"
                style={{ marginBottom: "1rem", fontWeight: "bold" }}
              >
                IVOverflow
              </Typography>
              <Typography variant="h6" style={{ marginBottom: "1rem" }}>
                Welcome! Please Login:
              </Typography>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    fullWidth
                    label="Enter your email"
                    placeholder="Email Address"
                    variant="outlined"
                    required
                  ></TextField>
                </Grid>
                <Grid item>
                  <TextField
                    id="password"
                    name="password"
                    type={values.showPass ? "text" : "password"}
                    fullWidth
                    label="Enter your password"
                    placeholder="Password"
                    variant="outlined"
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={passwordVisibilityHandler}
                            aria-label="toggle password"
                            edge="end"
                          >
                            {values.showPass ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  ></TextField>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                display="flex"
                justifyContent="center"
                style={{ marginTop: "16px" }}
              >
                <Grid item style={{ marginRight: "12px" }}>
                  <LoadingButton
                    variant="outlined"
                    sx={{
                      color: "#e8c77c",
                      borderColor: "#e8c77c",
                      fontWeight: "bold",
                      "&:hover": {
                        color: "#e8c77c",
                        borderColor: "#e8c77c",
                      },
                    }}
                    type="submit"
                    loading={isSubmitting}
                    startIcon={<Login />}
                    disabled={isSubmitting}
                  >
                    Login
                  </LoadingButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Container>
      </Form>
    </MainContainer>
  );
};

export default AuthPage;
