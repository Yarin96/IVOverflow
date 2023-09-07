import { Button } from "@mui/material";
import Modal from "../Modal/Modal";
import { useState, useEffect } from "react";

interface ErrorModalProps {
  error: { message: string };
  onClear: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = (props) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(!!props.error.message);
  }, [props.error.message]);

  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={state}
      footer={
        <Button
          sx={{
            color: "black",
            fontWeight: "bold",
            "&:hover": {
              borderColor: "black",
              backgroundColor: "#dda31b",
              color: "white",
            },
            height: "100%",
          }}
          onClick={props.onClear}
        >
          OK
        </Button>
      }
    >
      <p>{props.error.message}</p>
    </Modal>
  );
};

export default ErrorModal;
