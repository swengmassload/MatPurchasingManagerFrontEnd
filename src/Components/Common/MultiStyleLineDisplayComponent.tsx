import { Box,  SxProps, Theme, Typography } from "@mui/material";
interface MultiStyleLineDisplayComponentProps {
  adornmentStyle?: SxProps<Theme>;
  adornmentText?: string;
  adornmentFixedLength?: number;
  valueText?: string;
  valueStyle?: SxProps<Theme>;
  backgroundColor?: string;
  label?: string;
  labelStyle?: SxProps<Theme>;
}

export const MultiStyleLineDisplayComponentValueStyle = {
  fontFamily: "Inter, sans-serif",
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: "24px",
  letterSpacing: "-0.01em",
  textAlign: "left",
  marginRight: "8px",
  color: "black",
};

const MultiStyleLineDisplayComponent = ({
  adornmentText,
  valueText,
  adornmentStyle,
  valueStyle = MultiStyleLineDisplayComponentValueStyle,
  backgroundColor = "white",
  label,
  labelStyle,
  adornmentFixedLength=100,
}: MultiStyleLineDisplayComponentProps) => {

  return (
    <Box      sx={{
      width: "100%",
     
    }}>
      <>
        {label && (
          <Typography
            variant="body1"
            sx={{
             
              pl: 1,
               ...labelStyle, 
            }}
          >
            {label}
          </Typography>
        )}
      </>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          background: backgroundColor,
        }}
      >
<Box 
     sx={{
   
      width: adornmentFixedLength,
      pl: 1,
    }}>
<Typography
          //variant="body1"
          sx={{
            ...adornmentStyle,
            justifyItems: "left",
            alighText: "left",
            textAlign: "left",
          
          }}
        >
          {adornmentText}
          {/* {blankSpaces && <span dangerouslySetInnerHTML={{ __html: blankSpaces }} />} */}
          
        </Typography>
</Box>
        <Typography
          variant="body1"
          sx={{
            ...valueStyle,
            
          }}
        >
          {valueText}
        </Typography>
      </Box>
    </Box>
  );
};

export default MultiStyleLineDisplayComponent;
