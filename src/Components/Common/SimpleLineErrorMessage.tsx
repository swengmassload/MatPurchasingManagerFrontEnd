import {  Box, Typography } from "@mui/material";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
interface SimpleLineErrorMessageProps {
  additionalMessage?: string;
  errorMessage: string;
  color?: string;
  variant?: "body1" | "body2" | "caption" | "button" | "subtitle1" | "subtitle2" | "overline" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const SimpleLineErrorMessage = ({
 additionalMessage="",
  errorMessage,
    color = "red",
    variant = "body2",
}: SimpleLineErrorMessageProps) => {
  return (
     <Box
     sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      //marginTop: 2,
     }}>
         <ReportProblemIcon sx={{ color :color }} />
    <Typography variant={variant} color={color}>
        
     
        {additionalMessage}&nbsp;&nbsp; 
        {errorMessage}
    
    </Typography>
      </Box>
  );
};

export default SimpleLineErrorMessage;
