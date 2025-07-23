import { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import SearchConstantContact from "./ConstantContact/SearchConstantContact";
import CreateRMAForm from "./CreateRMAForm";
import { Contact } from "../../../Models/ConstantContactModels/ConstantContactDTO";
import { ValidToken } from "../../../Hooks/useGetConfirmIfUserHasExistingValidToken";

const CreateRMA = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [tokenValidationResult, setTokenValidationResult] = useState<ValidToken | null>(null);

  const handleContactSelected = (contact: Contact | null) => {
    setSelectedContact(contact);
  };

  const handleTokenValidationChange = (result: ValidToken | null) => {
    console.log("Token validation change in CreateRMA:", result);
    setTokenValidationResult(result);
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
              onContactSelected={handleContactSelected}
              onTokenValidationChange={handleTokenValidationChange}
            />
          </Paper>
        </Box>

        {/* Right Side - RMA Form */}
        <Box sx={{ flex: { lg: "1" }, width: { xs: "100%", lg: "60%" } }}>
          <CreateRMAForm selectedContact={selectedContact} tokenValidationResult={tokenValidationResult} />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateRMA;
