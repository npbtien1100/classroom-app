import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function PopUpForm({
  formName,
  actionName,
  classInfo,
  open,
  handleClose,
  handleSubmit,
  formErr,
  handleChange,
}) {
  const {className, classSection, subject, room } = classInfo;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{formName}</DialogTitle>
      <DialogContent>
        <form id="myform">
          <TextField
            autoFocus
            margin="dense"
            id="className"
            name="className"
            label="Class name (required)"
            fullWidth
            variant="outlined"
            required
            value={className}
            error={formErr}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="classSection"
            label="Section"
            fullWidth
            value={classSection}
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Subject"
            name="subject"
            fullWidth
            value={subject}
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Room"
            name="room"
            fullWidth
            value={room}
            variant="outlined"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" form="myform" onClick={handleSubmit}>
          {actionName}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
