import { TabContext, TabPanel } from '@mui/lab';
import { Box, Tabs, Tab } from '@mui/material';
import React, { useState } from 'react'
import { TabListSyle, TabIndicatorStyle, TabBorderStyle } from '../../../Components/Common/TabListStyle';
import LayoutInLetWrapper from '../../LayOut/LayoutInLetWrapper';
import ProcessRequest from './ProcessRequest/ProcessRequest';
import MergeRequest from './MergeRequest/MergeRequest';

const AddPOStageLayout = () => {
  const [value, setValue] = useState("1");
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <LayoutInLetWrapper pageTitle="Add Purchase Order" layOutAccessClaim={""}>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <TabContext value={value}>
          <Tabs value={value} onChange={handleChange} sx={TabListSyle} slotProps={{ indicator: TabIndicatorStyle }}>
            <Tab sx={TabBorderStyle} label="Merge Request" value="1" />
            <Tab sx={TabBorderStyle} label="Process Request" value="2" />
          </Tabs>
          <TabPanel value="1" sx={{ padding: "0px" }}>
            <MergeRequest />
          </TabPanel>
          <TabPanel value="2" sx={{ padding: "0px" }}>
            <ProcessRequest />
          </TabPanel>
        </TabContext>
      </Box>
    </LayoutInLetWrapper>
  );
};

export default AddPOStageLayout