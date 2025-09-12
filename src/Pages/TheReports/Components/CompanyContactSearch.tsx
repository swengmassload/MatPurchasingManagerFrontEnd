import { Box, Button,  } from "@mui/material";
import { SimpleBoxborder } from "../../../Components/Common/SimpleBoxborder";
import { RMASearchRequestDTO,  } from "../../../Models/RMAManagerModels/Dto";
import { useState } from "react";
import CompanyName from "./CompanyName";
import ContactName from "./ContactName";

interface RMANumberRangeProps {
            handleSearchRMA: (input: RMASearchRequestDTO) => Promise<void>;       
          
}
const CompanyContactSearch = ({ handleSearchRMA, }: RMANumberRangeProps) => {

  const [companyName, setCompanyName] = useState<string>("");
  const [contactName, setContactName] = useState<string>("");

  const handleSubmit= () => {
    var data: RMASearchRequestDTO = {
      startDateIssued:    null,
      endDateIssued:    null,
      searchBy: "CompanyContactSearch",
      startDateReceived: null,
      endDateReceived:null,
      salesOrderId: null,
      rmaNumberStart: null,
      rmaNumberEnd: null,
      stage: null,
      salesPerson: null,
      contactName: contactName,
      companyName: companyName,
      customerEmail: null,
 

    };
    handleSearchRMA(data);

  }
  return (
    <Box sx={{ ...SimpleBoxborder, flexDirection: "column", gap: 1, alignItems: "center", width: "100%" }}>
     
            <Box sx={{ ...SimpleBoxborder, flexDirection: "column", gap: 1, alignItems: "center", width: "100%" }}>
              Company and Contact Information
              <Box sx={{ display: "flex", gap: 2, p: 1, alignItems: "center", width: "100%" }}>
                <CompanyName companyName={companyName} setCompanyName={setCompanyName} />
                <ContactName contactName={contactName} setContactName={setContactName} />
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: "1rem", width: "100%", justifyContent: "center", padding: "1rem" }}>
                <Button  onClick={handleSubmit} >Search</Button>
              </Box>
    </Box>
  );
};



export default CompanyContactSearch