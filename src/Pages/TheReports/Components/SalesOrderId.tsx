import { Box, Button, TextField } from "@mui/material";
import { RMASearchRequestDTO } from "../../../Models/RMAManagerModels/Dto";
import { useState } from "react";
import { SimpleBoxborder } from "../../../Components/Common/SimpleBoxborder";

interface SalesOrderIdProps {
  handleSearchRMA: (input: RMASearchRequestDTO) => Promise<void>;
}

const SalesOrderId = ({ handleSearchRMA }: SalesOrderIdProps) => {
  const [salesOrderId, setSalesOrderId] = useState<string>("");
  const handleSubmit = () => {
    var data: RMASearchRequestDTO = {
      startDateIssued: null,
      endDateIssued: null,
      searchBy: "SalesOrderId",
      startDateReceived: null,
      endDateReceived: null,
      salesOrderId: salesOrderId,
      rmaNumberStart: null,
      rmaNumberEnd: null,
      stage: null,
      salesPerson: null,
      contactName: null,
      companyName: null,
      customerEmail: null,
    };
    handleSearchRMA(data);
  };
  return (
    <Box sx={{ ...SimpleBoxborder, flexDirection: "column", gap: 1, alignItems: "center", width: "100%" }}>
      <TextField
        sx={{ padding: 1 }}
        fullWidth
        label="salesOrderId"
        type="text"
        value={salesOrderId}
        onChange={(e) => setSalesOrderId(e.target.value)}
      />
      <Box sx={{ display: "flex", gap: "1rem", width: "100%", justifyContent: "center", padding: "1rem" }}>
        <Button onClick={handleSubmit}>Search</Button>
      </Box>
    </Box>
  );
};

export default SalesOrderId;
