import { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import SearchConstantContact from "./ConstantContact/SearchConstantContact";
import CreateRMAForm from "./CreateRMAForm";
import { Contact } from "../../../Models/ConstantContactModels/ConstantContactDTO";

const CreateRMA = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleContactSelected = (contact: Contact | null) => {
    setSelectedContact(contact);
  };

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      {/* Header */}
      <Box sx={{ marginBottom: 3, textAlign: "center" }}>

        <Typography variant="body1" color="text.secondary">
          Search for customer contacts and create RMA
        </Typography>
      </Box>

      {/* Side by Side Layout */}
      <Box sx={{ 
        display: "flex", 
        gap: 3, 
        flexDirection: { xs: "column", lg: "row" },
        alignItems: "flex-start"
      }}>
        {/* Left Side - Search Contact */}
        <Box sx={{ flex: { lg: "0 0 40%" }, width: { xs: "100%", lg: "40%" } }}>
          <Paper elevation={3} sx={{ minHeight: "600px" }}>
            <SearchConstantContact onContactSelected={handleContactSelected} />
          </Paper>
        </Box>

        {/* Right Side - RMA Form */}
        <Box sx={{ flex: { lg: "1" }, width: { xs: "100%", lg: "60%" } }}>
          {/* {selectedContact && (
            <Paper 
              elevation={2} 
              sx={{ 
                mb: 2, 
                p: 2, 
                bgcolor: "#e8f5e8", 
                border: "1px solid #4caf50"
              }}
            >
              <Typography variant="body1" color="success.main">
                <strong>✓ Selected Contact:</strong> {selectedContact.first_name} {selectedContact.last_name} ({selectedContact.email_address.address})
              </Typography>
            </Paper>
          )} */}
          <CreateRMAForm selectedContact={selectedContact} />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateRMA;
