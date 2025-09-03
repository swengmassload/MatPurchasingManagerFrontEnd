import { Box } from "@mui/material";
import { EstablishedClaims } from "../../../Constants/EstablishedClaims";
import LayoutInLetWrapper from "../../LayOut/LayoutInLetWrapper";

import RepairProduct from "./RepairProduct";

const RepairProductLayOut = () => {
  return (
    <LayoutInLetWrapper pageTitle="Repair Product" layOutAccessClaim={EstablishedClaims.Repair_RMA_APP04}>
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
          <RepairProduct />
        </Box>
      </Box>
    </LayoutInLetWrapper>
  );
};

export default RepairProductLayOut;
