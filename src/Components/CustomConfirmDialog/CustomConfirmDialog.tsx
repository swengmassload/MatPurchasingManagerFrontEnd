import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { useRef, useEffect } from "react";

const CustomConfirmDialog: React.FC<{
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  onConfirm: () => void;
  onCancel: () => void;

  cancelBtnVisible?: boolean;
  children?: React.ReactNode;
}> = ({
  open,
  message,
  onConfirm,
  onCancel,
  title = "Confirmation",
  confirmText = "Confirm",
  cancelBtnVisible = true,
  children,
}) => {
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      confirmButtonRef.current?.focus();
    }
  }, [open]);
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle
        sx={{
          display: "flex",

          justifyContent: "center",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            mb: 2,
          }}
        >
          {message}
        </DialogContentText>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {cancelBtnVisible && (
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
        )}
        <Button ref={confirmButtonRef} onClick={onConfirm} color="primary" autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CustomConfirmDialog;
