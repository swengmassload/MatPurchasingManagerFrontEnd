
import { Box } from "@mui/material";
import LayoutInLetWrapper from "../../LayOut/LayoutInLetWrapper";

import CloseRMA from "./CloseRMA";

const CloseRMALayOut = () => {
  return (
    <LayoutInLetWrapper pageTitle="Close RMA" layOutAccessClaim="">
      <Box sx={{ display: "flex", width: "90%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <CloseRMA />
        </Box>
      </Box>
    </LayoutInLetWrapper>
  );
};

export default CloseRMALayOut;
