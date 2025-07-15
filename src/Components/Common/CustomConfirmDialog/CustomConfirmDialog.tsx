import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

const CustomConfirmDialog: React.FC<{
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  cancelBtnVisible?: boolean;
}> = ({ open, message, onConfirm, onCancel,title="Confirmation",confirmText="Confirm",cancelBtnVisible=true}) => {
    console.log("CustomConfirmDialog");
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {cancelBtnVisible && <Button onClick={onCancel} color="primary">
          Cancel
        </Button>}
        <Button onClick={onConfirm} color="primary" autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CustomConfirmDialog;