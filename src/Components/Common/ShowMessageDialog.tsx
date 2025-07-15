import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { ShowMessageDialogPossibleStates } from './ShowMessageDialogPossibleStates';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


type ShowMessageDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reSetShowMessageState?: React.Dispatch<React.SetStateAction<ShowMessageDialogPossibleStates>>;
  message?: string;
  title?: string;
  nature?: "error" | "success" | "info";
};




export default function ShowMessageDialog({open, setOpen, message ,title,reSetShowMessageState}:ShowMessageDialogProps) {
 // const [open, setOpen] = React.useState(false);


  const handleClose = () => {
    setOpen(false);
    if(reSetShowMessageState)
    {
      reSetShowMessageState("");
      console.log("Reset Dialog State")
    }
  };

  return (
 
 
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          style: {
            width: '519px', // This should be a specific value like '400px'
            height: '349px', // This should be a specific value like '300px'
          },
        }}
      >
<DialogTitle sx={{ m: 1, p: 2, display: 'flex', justifyContent: 'center' }} id="customized-dialog-title">
<Typography style={{ fontFamily: 'Inter', fontSize: '28px', fontWeight: '600', lineHeight: '42px', letterSpacing: '-0.01em', textAlign: 'center' }}>
  {title}
</Typography>
</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent >
        <Box
  
  sx={{
    fontFamily: 'Inter',
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '27px',
    letterSpacing: '-0.01em',
    textAlign: 'center',
    padding: '5px',
    paddingLeft: '100px',
    paddingRight: '100px',
  }}
>
  {message}
</Box>

        </DialogContent>
        <DialogActions sx={{ display:"flex", justifyContent:"center"}}>
        <Box display="flex" justifyContent="center" mb={6} alignItems="center">
  <Button autoFocus onClick={handleClose}>
  <Typography style={{ fontFamily: 'Inter', fontSize: '20px', fontWeight: '800', lineHeight: '24.2px', letterSpacing: '-0.015em', textAlign: 'center' }}>
  Ok
</Typography>
  </Button>
</Box>
        </DialogActions>
      </BootstrapDialog>
   
  );
}