import {
  Box,
  Button,
  CardContent,
  Checkbox,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { StageField, StageAndFields } from "./StagesModel";
import { cardContentGraybackgroundColor, cardContentGraybackgroundColor2 } from "../../../../Constants/ComponentStyles";
import { CustomCard } from "../../../../Components/Common/CustomCard";

interface StageComponentProps {

  stageAndFields: StageAndFields;
  checkedStageAndFields: StageAndFields|undefined;
  handleSetCheckedFields: (newChecked: StageAndFields) => void;
}

const StageComponent = ({ stageAndFields, 
  checkedStageAndFields, handleSetCheckedFields
   }: StageComponentProps) => {
   const [expanded, setExpanded] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const handleToggle = (value: StageField) => () => {
   if(!checkedStageAndFields){
   
      return;
    }

    
    const currentIndex = checkedStageAndFields.stageFields.findIndex(
      (item) => item.stageActualFieldName === value.stageActualFieldName
    );
    const newChecked = [...checkedStageAndFields.stageFields];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    const currentChecked = { ...checkedStageAndFields, stageFields: newChecked };
    handleSetCheckedFields(currentChecked as StageAndFields); ;

  
 }


  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (checkedStageAndFields &&checkedStageAndFields.stageFields?.length < 1) {

  }

  const handleSelectAll = () => {
    setSelectAll((prev) => !prev); //event.target.checked);
  };

  useEffect(() => {
    if (selectAll) {
      handleSetCheckedFields&&   handleSetCheckedFields( stageAndFields);
    } else {
      const currentChecked = { ...checkedStageAndFields, stageFields: [] };
      handleSetCheckedFields(currentChecked  as StageAndFields); ;    
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAll]);

  return (
    <CustomCard sx={{  minWidth: 270, margin: "auto", mt: 4 }}>
      <CardContent sx={{ background: cardContentGraybackgroundColor }}>
        <Box sx={{ display: "flex", background: cardContentGraybackgroundColor2 }}>
          <Button
            onClick={handleSelectAll}
            sx={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",

              background: cardContentGraybackgroundColor2,
              justifyContent: "space-between",
              width: "100%",
              "&:hover": {
                backgroundColor: cardContentGraybackgroundColor2,
                border: "2px solid black", // Add black border on hover
                //  height: "50px", // Increase height
                //  width: "163px", // Increase width
              },
            }}
          >
            <>
              <span>
                <Typography
                  component="span"
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "20px",
                    fontWeight: 500,
                    lineHeight: "30px",
                    textAlign: "center",
                    color: "black",
                    pl: 1,
                  }}
                >
                  {stageAndFields.stageTitle.stageDisplayTitle}
          
                </Typography>

              </span>
            </>
          </Button>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{ float: "right" }}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Divider />
      </CardContent>

      <CardContent sx={{ display: "flex", justifyContent: "center", background: cardContentGraybackgroundColor }}>
        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
          sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <List sx={{}}>
            {stageAndFields.stageFields.map((value) => {
              const labelId = `checkbox-list-label-${value.stageDisplayFieldName}`;

              return (
                <ListItem
                  key={value.stageActualFieldName}
                  onClick={handleToggle(value)}
                  disablePadding={true}
                  sx={{
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <Checkbox
                    sx={{
                      padding: 0,
                      margin: 0,
                      ml:2,
                      borderRadius: 0,
                      //  width: "100%",
                      alignContent: "start",
                    //  backgroundColor: "yellow",
                      justifyContent: "start",
                      "&.Mui-disabled": {
                        color: "gray", // Change the color of the disabled checkbox
                        backgroundColor: "yellow", // Change the background color of the disabled checkbox
                      },
                    }}
                   checked={checkedStageAndFields && checkedStageAndFields.stageFields.length>0 &&checkedStageAndFields.stageFields?.some((item) => item.stageActualFieldName === value.stageActualFieldName)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />

                  <ListItemText
                    sx={{
                      padding: 0,
                      margin: 0,
                      width: "100%",
                    }}
                    id={labelId}
                    primary={value.stageDisplayFieldName}
                   // primary={(checkedStageAndFields.stageFields?.some((item) => item.stageActualFieldName === value.stageActualFieldName)).toString()}
                  
                  />
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </CardContent>
    </CustomCard>
  );
};

export default StageComponent;
