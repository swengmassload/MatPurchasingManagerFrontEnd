import React from "react";
import TextField from "@mui/material/TextField";
import { DefaultProductionStages,  } from "../../../../Constants/ProductionStages";

interface SelectStageProps {
  selectedStage: string;
  setSelectedStage: (value: string) => void;
  label?: string;
}

// const saveProcess: ProductionStage = {
//   stage: "Save Changes",

//   code: BarCodePrefix.PerformSavePrefix,
//   priority: -2,
// };
// const PrintLable: ProductionStage = {
//   stage: "Print Certificate",

//   code:BarCodePrefix.PrintProductCertificatePrefix,
//   priority: -2,
// };
// const PrintOutputLabel: ProductionStage = {
//   stage: "Print Output Label",
 
//   code: BarCodePrefix.RePrintSurfaceLabelPrefix,
//   priority: -2,
// };

// const PrintActualOutputLabel: ProductionStage = {
//   stage: "Print ActualOutput Label",

//   code: BarCodePrefix.PrintActualOutputLabelPrefix,
//   priority: -2,
// };
// const AdditionalStages: ProductionStage[] = [saveProcess, PrintLable, PrintOutputLabel, PrintActualOutputLabel];

const SelectStage: React.FC<SelectStageProps> = ({ selectedStage, setSelectedStage, label = "Stages" }) => {
  return (
    <TextField
      select
      required
      value={selectedStage}
      onChange={(event) => setSelectedStage(event.target.value)}
      sx={{ width: "100%" }}
      slotProps={{
        inputLabel: {
          shrink: true,
        },
        select: {
          native: true,
          variant: "standard",
        },
      }}
      label={label}
    >
      {[...DefaultProductionStages.AllStages].map((option) => (
        <option key={option.code} value={option.code}>
          {option.stage}
        </option>
      ))}
    </TextField>
  );
};

export default SelectStage;
