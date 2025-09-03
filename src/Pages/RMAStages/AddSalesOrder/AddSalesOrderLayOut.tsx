
import { Box } from "@mui/material";
import LayoutInLetWrapper from "../../LayOut/LayoutInLetWrapper";

import AddSalesOrder from "./AddSalesOrder";
import { EstablishedClaims } from "../../../Constants/EstablishedClaims";

const AddSalesOrderLayOut = () => {
  return (
    <LayoutInLetWrapper pageTitle="Add Sales Order" layOutAccessClaim={EstablishedClaims.Add_Sales_Order_APP04}>
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
          <AddSalesOrder />
        </Box>
      </Box>
    </LayoutInLetWrapper>
  );
};

export default AddSalesOrderLayOut;
