import { Typography } from "@mui/material";
import { ReactNode } from "react";

interface TabHeaderProps {
  children: ReactNode;
  textAlign?: "left" | "center" | "right" | "justify" | "inherit" | "initial" | "unset" | undefined;
  margintop?: string;
}

interface LayOutHeaderProps {
  children: ReactNode;
  marginLeft?: string;
  padding?: string;
  margingTop?: string;
  marginBottom?: string;
}

export const TabHeader = ({ children, textAlign = "center", margintop = "20px" }: TabHeaderProps) => {
  return (
    <Typography
      style={{
        fontFamily: "Inter",
        fontSize: "23px",
        fontWeight: 600,
        lineHeight: "34.5px",
        letterSpacing: "-0.01em",

        textUnderlinePosition: "from-font",
        textDecorationSkipInk: "none",
        textAlign: textAlign,
        marginTop: margintop,
      }}
    >
      {children}
    </Typography>
  );
};
export const LayOutHeader = ({
  children,
  margingTop = "40px",
  marginBottom = "40px",
  marginLeft = "50px",
  padding = "0px",
}: LayOutHeaderProps) => {
  return (
    <Typography
      component="div"
      style={{
        // fontFamily: 'Inter',
        fontSize: "26px",
        fontWeight: 600,
        lineHeight: "39px",
        letterSpacing: "-0.01em",
        textAlign: "left",
        marginLeft: marginLeft,
        marginTop: margingTop,
        marginBottom: marginBottom,
        padding: padding,
      }}
    >
      {children}
    </Typography>
  );
};

export const TabSubHeader = ({ children }: TabHeaderProps) => {
  return (
    <Typography
      style={{
        fontFamily: "Inter",
        fontSize: "22px",
        fontWeight: 600,
        lineHeight: "33px",
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </Typography>
  );
};
