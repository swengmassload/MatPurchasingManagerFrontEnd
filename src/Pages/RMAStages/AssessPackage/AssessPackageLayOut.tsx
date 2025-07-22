
import { Box } from "@mui/material";
import LayoutInLetWrapper from "../../LayOut/LayoutInLetWrapper";
import AssessPackage from "./AssessPackage";

const AssessPackageLayOut = () => {
  return (
    <LayoutInLetWrapper pageTitle="Assess Package" layOutAccessClaim="">
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
          <AssessPackage />
        </Box>
      </Box>
    </LayoutInLetWrapper>
  );
};

export default AssessPackageLayOut;
