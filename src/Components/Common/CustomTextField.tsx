// import { styled, TextField } from '@mui/material';

// interface StyledTextFieldProps {
//   disabled: boolean;
//   label:string
// }
// const CustomTextField = styled(TextField)<{ disabled?: boolean }>(({ theme, disabled }) => ({
//     width: '272px',
//     backgroundColor: disabled ? 'red' : 'white',
//     // Add more styles if needed
//   }));
// // const CustomTextField = styled(TextField)(({ theme }) => ({
// //   width: '272px',
// //     height: '46px',
// //     padding: '0px 0px 0px 0px',
// //     background: '#F9F9F9',
// // }));

// const StyledTextField = ({ disabled,label }:StyledTextFieldProps) => {
//   return <CustomTextField disabled={disabled}  label={label}/>;
// };

// export default StyledTextField;

// // const BootstrapDialog = styled(Dialog)(({ theme }) => ({
// //     '& .MuiDialogContent-root': {
// //       padding: theme.spacing(2),
// //     },
// //     '& .MuiDialogActions-root': {
// //       padding: theme.spacing(1),
// //     },
// //   }));


import React from "react";
import { styled, TextField, TextFieldProps } from "@mui/material";
import { Controller, ControllerProps } from "react-hook-form";


// Extend the StyledTextFieldProps to include all possible props of TextField for forwarding
interface StyledTextFieldProps extends React.ComponentProps<typeof TextField> {}

const CustomTextField = styled(TextField)<StyledTextFieldProps>(
  ({  disabled }) => ({
    width: "200px",
    //"222px",

    backgroundColor: disabled ? "#EEEEEE" : "white", // Red when disabled, green otherwise
    // Add more styles if needed
  })
);

//const StyledTextField: React.FC<StyledTextFieldProps> = (props) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const StyledTextField = (  props: Omit<ControllerProps<any>, "render"> & TextFieldProps) => {
  
  return <Controller
  name={props.name}
  control={props.control}
  render={({ field: { onChange, value },}) => 
  <CustomTextField  onChange={onChange} value={value} {...props}  variant="outlined" margin="normal"
  />}
  />;
};

export default StyledTextField;

