import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from "@mui/material";

const CustomInputDialog: React.FC<{
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  cancelBtnVisible?: boolean;
}> = ({
  open,
  message,
  onConfirm,
  onCancel,
  inputValue,
  setInputValue,
  title = "Input",
  confirmText = "Confirm",
  cancelBtnVisible = true,
}) => {


  return (
    // ...existing code...
    <Dialog open={open} onClose={onCancel}
   disableRestoreFocus={false}
    disableEnforceFocus={false}
    disableAutoFocus={false}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        <TextField
          margin="dense"
          label="Enter text"
          type="text"
          fullWidth
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        {cancelBtnVisible && (
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
        )}
        <Button onClick={onConfirm} color="primary" autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
    // ...existing code...
  );
};
export default CustomInputDialog;
