import { Box, Button, TextField } from "@mui/material";
import { RMASearchRequestDTO } from "../../../Models/RMAManagerModels/Dto";
import { useState } from "react";
import { SimpleBoxborder } from "../../../Components/Common/SimpleBoxborder";

interface CustomerEmailProps {
 handleSearchRMA: (input: RMASearchRequestDTO) => Promise<void>;     
}

const CustomerEmail = ({ handleSearchRMA, }:  CustomerEmailProps) => {
  const [customerEmail, setCustomerEmail] = useState<string>("");
   const handleSubmit= () => {
    var data: RMASearchRequestDTO = {
      startDateIssued:    null,
      endDateIssued:    null,
      searchBy: "CustomerEmail",
      startDateReceived: null,
      endDateReceived:null,
      salesOrderId: null,
      rmaNumberStart: null,
      rmaNumberEnd: null,
      stage: null,
      salesPerson: null,
      contactName: null,
      companyName: null,
      customerEmail: customerEmail,
 

    };
    handleSearchRMA(data);

  }
  return (

      <Box sx={{ ...SimpleBoxborder, flexDirection: "column", gap: 1, alignItems: "center", width: "100%" }}>
          <TextField sx={{ padding: 1 }} fullWidth label="customerEmail" type="text" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
              <Box sx={{ display: "flex", gap: "1rem", width: "100%", justifyContent: "center", padding: "1rem" }}>
                <Button  onClick={handleSubmit} >Search</Button>
              </Box>
        </Box>


  );
};

export default CustomerEmail;
