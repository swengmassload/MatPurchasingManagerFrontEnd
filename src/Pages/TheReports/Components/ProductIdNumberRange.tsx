import { Box, Button, TextField } from "@mui/material";
import { SimpleBoxborder } from "../../../Components/Common/SimpleBoxborder";
import { RMASearchRequestDTO,  } from "../../../Models/RMAManagerModels/Dto";
import { useState } from "react";

interface RMANumberRangeProps {
            handleSearchRMA: (input: RMASearchRequestDTO) => Promise<void>;       
          
}
const RMANumberRange = ({ handleSearchRMA, }: RMANumberRangeProps) => {

  const [startRMANumber, setStartRMANumber] = useState<number | null>(null);
  const [endRMANumber, setEndRMANumber] = useState<number | null>(null);

  const handleSubmit= () => {
    var data: RMASearchRequestDTO = {
      startDateIssued:    null,
      endDateIssued:    null,
      searchBy: "RMANumberRange",
      startDateReceived: null,
      endDateReceived:null,
      salesOrderId: null,
      rmaNumberStart: startRMANumber,
      rmaNumberEnd: endRMANumber,
      stage: null,
      salesPerson: null,
      contactName: null,
      companyName: null,
      customerEmail: null,
 

    };
    handleSearchRMA(data);

  }
  return (
    <Box sx={{ ...SimpleBoxborder, flexDirection: "column", gap: 1, alignItems: "center", width: "100%" }}>
      Type one or a range of RMA Numbers
      <Box sx={{ display: "flex", gap: 2, p: 1, alignItems: "center", width: "100%" }}>
        <Box>
          <TextField
            label=""
            value={startRMANumber ?? ""}
            onChange={(e) => setStartRMANumber(e.target.value === "" ? null : Number(e.target.value))}
            type="number"
          />
        </Box>
        to
        <Box>
          <TextField
            label=""
            value={endRMANumber ?? ""}
            onChange={(e) => setEndRMANumber(e.target.value === "" ? null : Number(e.target.value))}
            type="number"
          />
        </Box>
      </Box>
            <Box sx={{ display: "flex", gap: "1rem", width: "100%", justifyContent: "center", padding: "1rem" }}>
                <Button  onClick={handleSubmit} >Search</Button>
              </Box>
    </Box>
  );
};

export default RMANumberRange;
