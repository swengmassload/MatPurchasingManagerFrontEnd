import React, { CSSProperties } from "react";
import { InputAdornment,  TextField,  } from "@mui/material";
//import { styled, TextField, TextFieldProps } from "@mui/material";

export interface LabelStyles {
  // transform?: string;
  //padding?: string;
  pb?: string;
  pt?: string;
  pl?: string;
  pr?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: number;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: CSSProperties["textAlign"];
  marginRight?: string;
  color?: string;
}
export const defaultLabelStyles: LabelStyles = {
  pb: "0px",
  pt: "0px",
  pl: "0px",
  pr: "0px",
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "24px",
  letterSpacing: "-0.01em",
  textAlign: "left",
  marginRight: "8px",
  color: "black"
};
interface CustomTextFieldProps extends React.ComponentProps<typeof TextField> {
  disabledTextbackgroundColor?: string;
  labelTransform?: string;
  labelPadding?: string;
  disabled?: boolean;
  width?: string;
  startAdornmentString?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  multilineheight?: number;
  //labelStyle?: SxProps<Theme>;
  labelStyles?: LabelStyles;
}

const TextFieldWtPushedUpLabel: React.FC<CustomTextFieldProps> = ({
  disabledTextbackgroundColor,
  startAdornment,
  endAdornment,
  labelTransform = "translate(0, -25px) scale(1)",
  labelPadding = "0px 4px",
  disabled,
  width = "329px",
  sx,
  multilineheight,
  slotProps,
  labelStyles= defaultLabelStyles,
  ...props
}) => {
  return (
    <TextField
      {...props}
      disabled={disabled}
      sx={{
        ...sx,
        width: width,

        "& .MuiInputBase-root": {
          borderRadius: "0px",
          p: 0,
          pl: 2,
          backgroundColor: disabled ? disabledTextbackgroundColor : "white",
          //  height: multilineheight ? multilineheight : null,

          "& .MuiInputBase-input": {
            padding: "5px !important",
            height: "100%", // Ensures the input takes full height

            //   backgroundColor: disabled ? disabledTextbackgroundColor : "green",
          },
          "& .MuiInputBase-inputMultiline": {
            //height: "300px !important", // Sets the height of the multiline textarea
            height: multilineheight ? `${multilineheight}px !important` : "300px !important", // Made height important
            padding: "8px 16px", // Optional: Adjust padding as needed
            boxSizing: "border-box", // Ensures padding is included within the height
            overflowY: "auto", // Adds vertical scrollbar if content exceeds height
            resize: "none", // Disables manual resizing of the textarea
          },
        },
      }}
      slotProps={{
        ...slotProps,
        input: {
          sx: {

          },
          startAdornment: startAdornment ? <InputAdornment position="start">{startAdornment}</InputAdornment> : null,
          endAdornment: endAdornment ? <InputAdornment position="end">{endAdornment}</InputAdornment> : null,
        },
        inputLabel: {
          style: {
            transform: labelTransform, //labelStyles?.transform,
            //  padding: labelPadding, // labelStyles?.padding,
            fontFamily: labelStyles?.fontFamily || "Inter, sans-serif",

            // fontSize: labelStyles?.fontSize || "16px",
            ...(labelStyles?.fontSize && { fontSize: labelStyles.fontSize }),

            //  fontWeight: labelStyles?.fontWeight || 600,
            ...(labelStyles?.fontWeight && { fontWeight: labelStyles.fontWeight }),

            //   lineHeight: labelStyles?.lineHeight || "24px",
            ...(labelStyles?.lineHeight && { lineHeight: labelStyles.lineHeight }),

            // letterSpacing: labelStyles?.letterSpacing || "-0.01em",
            ...(labelStyles?.letterSpacing && { letterSpacing: labelStyles.letterSpacing }),

            //  textAlign: labelStyles?.textAlign || "left",
            ...(labelStyles?.textAlign && { textAlign: labelStyles.textAlign }),

            //marginRight: labelStyles?.marginRight || "8px",
            ...(labelStyles?.marginRight && { marginRight: labelStyles.marginRight }),

            //color: labelStyles?.color || "black",
            ...(labelStyles?.color && { color: labelStyles.color }),

            //paddingBottom: labelStyles?.pb || "0px",
            ...(labelStyles?.pb && { paddingBottom: labelStyles.pb }),

            // paddingTop: labelStyles?.pt || "0px",
            ...(labelStyles?.pt && { paddingTop: labelStyles.pt }),
            // paddingLeft: labelStyles?.pl || "0px",
            ...(labelStyles?.pl && { paddingLeft: labelStyles.pl }),
            // paddingRight: labelStyles?.pr || "0px",
            ...(labelStyles?.pr && { paddingRight: labelStyles.pr }),
          },

        },
      }}
    />
  );
};

export default TextFieldWtPushedUpLabel;
