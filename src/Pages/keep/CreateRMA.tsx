import React, { useState } from "react";
import { Box, Tab, Tabs, Paper } from "@mui/material";
import SearchConstantContact from "./ConstantContact/SearchConstantContact";
import CreateRMAForm from "./CreateRMAForm";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CreateRMA = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={1}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="Create RMA tabs">
            <Tab label="Create RMA Form" {...a11yProps(0)} />
            <Tab label="Search Constant Contact" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </Paper>

      <TabPanel value={value} index={0}>
        <CreateRMAForm />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <SearchConstantContact />
      </TabPanel>
    </Box>
  );
};

export default CreateRMA;
