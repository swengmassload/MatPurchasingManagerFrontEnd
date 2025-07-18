import { Box } from "@mui/material";
//import { EstablishedClaims } from "../../../Constants/EstablishedClaims";
import LayoutInLetWrapper from "../../LayOut/LayoutInLetWrapper";
import PackageReceived from "./PackageReceived";

const PackageReceivedLayOut = () => {
  return (
    <LayoutInLetWrapper pageTitle="Package Received" layOutAccessClaim="">
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
          <PackageReceived />
        </Box>
      </Box>
    </LayoutInLetWrapper>
  );
};

export default PackageReceivedLayOut;
