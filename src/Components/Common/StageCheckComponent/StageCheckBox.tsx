import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { ProductionCheckedStage } from "../../../Constants/Stages";

interface StageCheckBoxProps {
  state: ProductionCheckedStage;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StageCheckBox = ({ state, handleChange }: StageCheckBoxProps) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          sx={{

            alignContent: "left",
          }}
          checked={state.checked}
          onChange={handleChange}
          name={state.code}
        />
      }
      label={state.name}
    />
  );
};

export default StageCheckBox;
