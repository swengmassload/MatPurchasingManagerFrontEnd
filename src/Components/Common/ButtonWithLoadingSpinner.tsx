import {  CircularProgress, Button, ButtonProps } from "@mui/material"
import { styled } from "@mui/material/styles";


interface ButtonWithLoadingSpinnerProps extends ButtonProps {
    isLoading: boolean;
  }
  const SpinnerAdornment = styled(CircularProgress)(({ size = 20 }) => ({
    root: {
      width: size,
      height: size,
      marginLeft: 0, // Added marginLeft to match the original styles
    },
  }));
  

  const ButtonWithLoadingSpinner: React.FC<ButtonWithLoadingSpinnerProps> = ({ isLoading, children, ...props }) => (
    <Button {...props}>
    {isLoading && <SpinnerAdornment color={"info"}/>}
    {children}
  </Button>
  );
  

export default ButtonWithLoadingSpinner