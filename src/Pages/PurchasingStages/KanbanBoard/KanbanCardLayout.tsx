import React, { useState } from 'react'
import LayoutInLetWrapper from '../../LayOut/LayoutInLetWrapper';
import Box from '@mui/material/Box';
import { TabContext, TabPanel } from "@mui/lab";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabBorderStyle, TabIndicatorStyle, TabListSyle } from '../../../Components/Common/TabListStyle';
//import { EstablishedClaims } from '../../../Constants/EstablishedClaims';
import ScanKanbanBoard from './ScanKanbanBoard/ScanKanbanBoard';
import AddKanbanItem from './AddKanbanItem/AddKanbanItem';

const KanbanCardLayout= () => {
  const [value, setValue] = useState("1");
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <LayoutInLetWrapper pageTitle="Kanban Card" layOutAccessClaim={""}>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <TabContext value={value}>
          <Tabs value={value} onChange={handleChange} sx={TabListSyle} slotProps={{ indicator: TabIndicatorStyle }}>
            <Tab sx={TabBorderStyle} label="Scan Kanban Card" value="2" />
            <Tab sx={TabBorderStyle} label="Add/View Kanban Item" value="1" />
          </Tabs>
          <TabPanel value="2" sx={{ padding: "0px" }}>
            <ScanKanbanBoard />
          </TabPanel>
          <TabPanel value="1" sx={{ padding: "0px" }}>
            <AddKanbanItem />
          </TabPanel>
        </TabContext>
      </Box>
    </LayoutInLetWrapper>
  );
};
export default KanbanCardLayout