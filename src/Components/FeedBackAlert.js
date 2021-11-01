import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

export default function FeedBackAlert({ openAlert, messageObject, onCloseAlert}) {
  const { message, error } = messageObject;
  return (
    <Collapse in={openAlert} timeout={1000} sx={{ marginTop: 3 }}>
      <Alert onClose={onCloseAlert} severity={error ? "error" : "success"}>
        <Typography variant="body1">{error ? error : message}</Typography>
      </Alert>
    </Collapse>
  );
}
