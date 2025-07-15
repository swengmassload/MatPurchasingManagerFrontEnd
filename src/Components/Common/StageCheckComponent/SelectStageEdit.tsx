import { Box, Switch, Typography } from "@mui/material";
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import StageCheckBox from "./StageCheckBox";
import { ProductionCheckedStage } from "../../../Constants/Stages";

interface SelectStageEdit {
  AllStages: ProductionCheckedStage[];
  setStage: React.Dispatch<React.SetStateAction<ProductionCheckedStage[]>>;
 // readonly: boolean;
}

const SelectStageEdit = ({ AllStages, setStage }: SelectStageEdit) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let location = -1;
    for (let index = 0; index < AllStages.length; index++) {
      if (AllStages[index].code === event.target.name) {
        location = index;
      }
    }

    if (location === -1) {
      return;
    }
    const newState = [...AllStages];
    newState[location].checked = event.target.checked;
    setStage(newState);
  };

  const [checked, setChecked] = React.useState(false);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setStage(AllStages.map((stage) => ({ ...stage, checked: event.target.checked })));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "100%",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Inter",
          fontSize: "16px",
          fontWeight: 700,
          lineHeight: "24px",
          textAlign: "left",
        }}
      >
        Select Stages * :
        <Switch
         // disabled={readonly}
          checked={checked}
          onChange={handleSwitchChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Typography>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          textAlign: "left",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          justifyItems: "center",
          gap: "1rem",

        //   pointerEvents: readonly ? "none" : "auto", // Disable pointer events if disabled
        //   opacity: readonly ? 0.5 : 1, // Reduce opacity if disabled
        //   padding: "1rem",
        //   border: "1px solid",
        //   borderColor: readonly ? "grey.400" : "grey.800",
        //   borderRadius: "4px",
        }}
      >
        <FormControl sx={{ m: 0 }} component="fieldset" variant="standard">
          <FormGroup>
            <StageCheckBox state={AllStages[0]} handleChange={handleChange} />
            <StageCheckBox state={AllStages[1]} handleChange={handleChange} />
            <StageCheckBox state={AllStages[2]} handleChange={handleChange} />
            <StageCheckBox state={AllStages[3]} handleChange={handleChange} />
            <StageCheckBox state={AllStages[4]} handleChange={handleChange} />
            <StageCheckBox state={AllStages[5]} handleChange={handleChange} />
          </FormGroup>
        </FormControl>
        <FormControl required component="fieldset" sx={{}} variant="standard">
          <FormGroup>
            <StageCheckBox state={AllStages[6]} handleChange={handleChange} />
            <StageCheckBox state={AllStages[7]} handleChange={handleChange} />
            <StageCheckBox state={AllStages[8]} handleChange={handleChange} />
            <StageCheckBox state={AllStages[9]} handleChange={handleChange} />
            <StageCheckBox state={AllStages[10]} handleChange={handleChange} />
            <StageCheckBox state={AllStages[11]} handleChange={handleChange} />
          </FormGroup>
        </FormControl>
        <FormControl required component="fieldset" variant="standard"></FormControl>
      </Box>
    </Box>
  );
};

export default SelectStageEdit;
