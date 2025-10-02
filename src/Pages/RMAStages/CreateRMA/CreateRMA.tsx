import { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import SearchConstantContact from "./ConstantContact/SearchConstantContact";
import CreateRMAForm from "./CreateRMAForm";
import { Lead } from "../../../Models/ConstantContactModels/ConstantContactDTO";

const CreateRMA = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleLeadSelected = (lead: Lead | null) => {
    setSelectedLead(lead);
  };


  return (
    <Box sx={{ width: "100%", padding: 0 }}>
      {/* Header */}
      <Box sx={{ marginBottom: 1, textAlign: "center" }}>
        <Typography variant="body1" color="text.secondary">
          Search for customer contacts and create RMA
        </Typography>
      </Box>

      {/* Side by Side Layout */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: { xs: "column", lg: "row" },
          alignItems: "flex-start",
        }}
      >
        {/* Left Side - Search Contact */}
        <Box sx={{ flex: { lg: "0 0 40%" }, width: { xs: "100%", lg: "40%" } }}>
          <Paper elevation={3} sx={{ minHeight: "600px" }}>
            <SearchConstantContact
              onLeadSelected={handleLeadSelected}

            />
          </Paper>
        </Box>

        {/* Right Side - RMA Form */}
        <Box sx={{ flex: { lg: "1" }, width: { xs: "100%", lg: "60%" } }}>

           <CreateRMAForm selectedLead={selectedLead} />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateRMA;
