import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  DialogActions,
  Breakpoint,

} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';


interface CustomDialogProps {
  isOpen: boolean;
  handleCloseDialog:  (open: boolean) => void;
  children?: React.ReactNode;
  pageTitle?: string;
  width?:  false | Breakpoint | undefined;
  height?: string;
}

const CustomDialog = ({  children, isOpen, handleCloseDialog,pageTitle="",width="lg", height="100%"}: CustomDialogProps) => {

  function handleClose(): void { handleCloseDialog(false); }


  return (
    <Dialog  open={isOpen} 
    onClose={() => handleCloseDialog(false)}
    aria-labelledby={pageTitle}
    maxWidth={width}
    
    fullWidth
     sx={{  height: height,  }}

    >
      <DialogTitle style={{ textAlign: 'center' }} >{pageTitle}</DialogTitle>
      <IconButton
          aria-label="close"
          onClick={ handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      <DialogContent>
      
        {children}
       
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleCloseDialog(false)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
