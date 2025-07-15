import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import {  AlertProps } from '@mui/material';

interface DisplayMessageProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  severity?: AlertProps['severity'] | 'success'  ;
}

const DisplayMessage= ({ open, setOpen,  message,severity }:DisplayMessageProps) => {
   
   const alertHandleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
 
  };
  return (
    <Snackbar  anchorOrigin={{  vertical: 'top', horizontal: 'center'  }} open={open} autoHideDuration={6000} onClose={alertHandleClose}>
      <MuiAlert onClose={alertHandleClose} variant='filled' severity={severity}>
      {message}
    </MuiAlert>
    </Snackbar>
  );
};

export default DisplayMessage;