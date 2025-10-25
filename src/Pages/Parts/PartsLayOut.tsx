import { TabContext, TabPanel } from '@mui/lab';
import { Box, Tabs, Tab } from '@mui/material';
import React, { useState } from 'react'
import { TabListSyle, TabIndicatorStyle, TabBorderStyle } from '../../Components/Common/TabListStyle';
import LayoutInLetWrapper from '../LayOut/LayoutInLetWrapper';
import AddPart from './AddPart/AddPart';
import ViewEditPart from './ViewEditPart/ViewEditPart';

const PartsLayOut = () => {
  const [value, setValue] = useState("1");
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <LayoutInLetWrapper pageTitle="Parts" layOutAccessClaim={""}>
      <Box
        sx={{
         display: "flex", width: "85%",
         flexDirection: "column",
   
        }}
      >
        <TabContext value={value}>
          <Tabs value={value} onChange={handleChange} sx={TabListSyle} slotProps={{ indicator: TabIndicatorStyle }}>
            <Tab sx={TabBorderStyle} label="Add" value="1" />
            <Tab sx={TabBorderStyle} label="View/Edit " value="2" />
          </Tabs>
          <TabPanel value="1" sx={{ padding: "0px"   }}>
            <AddPart />
          </TabPanel>
          <TabPanel value="2" sx={{ padding: "0px",   justifyContent: "left", }}>
            <ViewEditPart />
          </TabPanel>
        </TabContext>
      </Box>
    </LayoutInLetWrapper>
  );
};
export default PartsLayOut

//  <Box sx={{ display: "flex", width: "85%" }}>