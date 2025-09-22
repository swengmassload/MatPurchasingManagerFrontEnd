import { Box, Tab, Tabs } from "@mui/material";
//import { EstablishedClaims } from "../../../Constants/EstablishedClaims";

//import Tracking from "./Tracking";
import LayoutInLetWrapper from "../LayOut/LayoutInLetWrapper";
import { useState } from "react";
import { TabListSyle, TabIndicatorStyle, TabBorderStyle } from "../../Components/Common/TabListStyle";

import TrackByStage from "./TrackByStage/TrackByStage";
import { TabContext, TabPanel } from "@mui/lab";
import TheReports from "./Reports/TheReports";
import Search from "./Searching/Search";
import ViewRMA from "./ViewRMA/ViewRMA";
const TrackingLayOut = () => {
  const [value, setValue] = useState("1");
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <LayoutInLetWrapper pageTitle="Track and Report" layOutAccessClaim="">
      <Box
        sx={{
          width: "100%",

          background: "white",
        }}
      >
        <TabContext value={value}>
          <Tabs value={value} onChange={handleChange} sx={TabListSyle} slotProps={{ indicator: TabIndicatorStyle }}>
            <Tab sx={TabBorderStyle} label="Track by Stage" value="1" />
            <Tab sx={TabBorderStyle} label="Search RMA" value="2" />
            <Tab sx={TabBorderStyle} label="Report" value="3" />
            <Tab sx={TabBorderStyle} label="View RMA" value="4" />
          </Tabs>
          <TabPanel value="1" sx={{ padding: "0px" }}>
            <TrackByStage />
          </TabPanel>

          <TabPanel value="2" sx={{ padding: "0px" }}>
            <Search />
          </TabPanel>

          <TabPanel value="3" sx={{ padding: "0px" }}>
            <TheReports />
          </TabPanel>
          <TabPanel value="4" sx={{ padding: "0px" }}>
            <ViewRMA />
          </TabPanel>
        </TabContext>
      </Box>
    </LayoutInLetWrapper>
  );
};

export default TrackingLayOut;
