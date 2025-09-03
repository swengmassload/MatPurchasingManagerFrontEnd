import { Box } from "@mui/material";
import { EstablishedClaims } from "../../../Constants/EstablishedClaims";
import LayoutInLetWrapper from "../../LayOut/LayoutInLetWrapper";
import CreateRMA from "./CreateRMA";

const CreateRMALayOut = () => {
  return (
    <LayoutInLetWrapper pageTitle="Create RMA" layOutAccessClaim={EstablishedClaims.Create_RMA_APP04}>
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
          <CreateRMA />
        </Box>
      </Box>
    </LayoutInLetWrapper>
  );
};

export default CreateRMALayOut;
