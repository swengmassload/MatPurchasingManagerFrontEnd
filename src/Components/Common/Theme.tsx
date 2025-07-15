import { createTheme } from "@mui/material";
import { red, grey } from "@mui/material/colors";
const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: grey[500],
      dark: grey[900],
    },
  },

  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: "Inter, sans-serif",
          height: "44px",
          fontWeight: "800",
          borderRadius: 0,
          minWidth: "139px",
          backgroundColor: red[500],
          color: grey[50],
          "&:hover": {
            backgroundColor: grey[900],
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        
        root: {
          fontFamily: "Inter, sans-serif",
          borderRadius: 0, // Override root border radius
          // backgroundColor: "pink",
        },
        input: {
          borderRadius: 0,
          padding: "0px",
          fontFamily: "Inter, sans-serif",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: "0px",
          fontFamily: "Inter, sans-serif",
        },
      },
      defaultProps: {
        inputProps: {
          style: {
            //  fontSize: '11.8px',
            borderRadius: 0,
            padding: "10px",
            fontFamily: "Inter, sans-serif",

            // height: '.85rem',
          },
        },
      },
    },
  },
});
export default theme;
