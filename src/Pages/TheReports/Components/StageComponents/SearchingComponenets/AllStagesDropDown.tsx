//
import { Box, Button, TextField } from "@mui/material";
import { DefaultRMAStages, RMAStage } from "../../../../../Constants/RMAStages";
import { RMASearchRequestDTO } from "../../../../../Models/RMAManagerModels/Dto";
import { useState } from "react";
import { SimpleBoxborder } from "../../../../../Components/Common/SimpleBoxborder";

interface StagesProps {
  handleSearchRMA: (input: RMASearchRequestDTO) => Promise<void>;
}
const allStages: RMAStage = {
  stage: "All Stages",
  code: "ALL",
  priority: -111,
  CommonName: "All Stages",
  stageCardName: "All Stages",
};
const NullPaddedDefaultProductionStages: RMAStage[] = [...DefaultRMAStages.AllStages, allStages];

const AllStagesDropDown = ({ handleSearchRMA }: StagesProps) => {
  const [stage, setStage] = useState<string | null>(null);

  const handleSubmit = () => {
    var data: RMASearchRequestDTO = {
      startDateIssued: null,
      endDateIssued: null,
      searchBy: "Stage",
      startDateReceived: null,
      endDateReceived: null,
      salesOrderId: null,
      rmaNumberStart: null,
      rmaNumberEnd: null,
      stage: stage,
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
        fullWidth
        select
        sx={{ width: "100%" }}
        value={stage || ""}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
          select: {
            native: true,
            variant: "standard",
            onChange: (event) => {
              setStage(event.target.value as unknown as string);
            },
          },
        }}
        label="Current Stage"
      >
        {NullPaddedDefaultProductionStages.map((option) => (
          <option key={option.code} value={option.stage}>
            {option.CommonName}
          </option>
        ))}
      </TextField>
      <Box sx={{ display: "flex", gap: "1rem", width: "100%", justifyContent: "center", padding: "1rem" }}>
        <Button onClick={handleSubmit}>Search</Button>
      </Box>
    </Box>
  );
};

export default AllStagesDropDown;
