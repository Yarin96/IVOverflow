import { useState } from "react";
import { Modal, Box, TextField, Grid, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { incrementRefreshKey } from "../../../reducers/refreshQuestionsKey";
import { useNavigate } from "react-router-dom";

interface FormData {
  questionTitle: string;
  questionBody: string;
  questionTags: string;
}

interface AskQuestionModal {
  open: boolean;
  onClose: () => void;
}

const AskQuestionModal: React.FC<AskQuestionModal> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    questionTitle: "",
    questionBody: "",
    questionTags: "",
  });

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "questionTags" ? value.split(",") : value,
    });
  };

  const isFormValid = () => {
    const { questionTitle, questionBody } = formData;
    return !!(questionTitle.trim() && questionBody.trim());
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const userName = localStorage.getItem("userName");
    const requestData = {
      ...formData,
      userPosted: userName,
    };

    try {
      const tempToken = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/questions/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tempToken}`,
        },
        body: JSON.stringify(requestData),
      });

      dispatch(incrementRefreshKey());

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error details: ", errorData);
      }
    } catch (error) {
      console.log("An error occurred: ", error);
    } finally {
      setIsSubmitting(false);
      props.onClose();
      navigate("/questions");
      setFormData({
        questionTitle: "",
        questionBody: "",
        questionTags: "",
      });
    }
  };

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="Ask a Question!"
    >
      <Box sx={style}>
        <Typography sx={{ marginBottom: "10px" }} variant="h6" component="h2">
          Ask a Question!
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="questionTitle"
              value={formData.questionTitle}
              onChange={changeHandler}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Question"
              name="questionBody"
              value={formData.questionBody}
              onChange={changeHandler}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tags (separated by comma)"
              name="questionTags"
              value={formData.questionTags}
              onChange={changeHandler}
            />
          </Grid>
        </Grid>
        <LoadingButton
          variant="outlined"
          sx={{
            color: "#e8c77c",
            marginTop: "20px",
            borderColor: "#e8c77c",
            fontWeight: "bold",
            "&:hover": {
              color: "#e8c77c",
              borderColor: "#e8c77c",
            },
          }}
          type="submit"
          loading={isSubmitting}
          onClick={submitHandler}
          disabled={isSubmitting || !isFormValid()}
        >
          Submit
        </LoadingButton>
      </Box>
    </Modal>
  );
};

export default AskQuestionModal;
