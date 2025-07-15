import { Box } from "@mui/material";
import { sideBardrawerWidth } from "../../../Constants/SideBarMenuNames";
import { Copyright } from "./Copyright";
import { sideBarColor } from "../../../Constants/ComponentStyles";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <Box
        sx={{
          backgroundColor: sideBarColor,
          width: sideBardrawerWidth,
        }}
      ></Box>
      <Box
        sx={{
        //  mt: 2,
          flexGrow: 1,
        }}
      >
        <Copyright />
      </Box>
    </Box>
  );
};

export default Footer;
