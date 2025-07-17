import React from "react";
import { Box, Card, Stack, Button, Typography } from "@mui/material";
import { Contact, DetailContact } from "../../../../../Models/ConstantContactModels/ConstantContactDTO";
import ContactBasicInfo from "./ContactBasicInfo";
import DetailedContactInfo from "./DetailedContactInfo";

interface ContactCardProps {
  contact: Contact;
  selectedContact: Contact | null;
  showingDetails: string | null;
  contactDetails: DetailContact | null;
  isLoadingDetails: boolean;
  fetchingContactId: string | null;
  onFetchDetails: (contact: Contact) => void;
  onUseContactDetails: (details: DetailContact) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  selectedContact,
  showingDetails,
  contactDetails,
  isLoadingDetails,
  fetchingContactId,
  onFetchDetails,
  onUseContactDetails,
}) => {
  return (
    <Card
      key={contact.contact_id}
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2,
        border: selectedContact?.contact_id === contact.contact_id ? "2px solid #4caf50" : "1px solid #e0e0e0",
        backgroundColor: selectedContact?.contact_id === contact.contact_id ? "#f1f8e9" : "#ffffff",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: "#1976d2",
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <Stack spacing={2}>
        {/* Contact Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <ContactBasicInfo contact={contact} />

          {/* Action Buttons */}
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => onFetchDetails(contact)}
              disabled={showingDetails === contact.contact_id || isLoadingDetails}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                minWidth: 130,
              }}
            >
              {isLoadingDetails && fetchingContactId === contact.contact_id
                ? "Loading..."
                : showingDetails === contact.contact_id
                  ? "Details Loaded"
                  : "Fetch Contact Details"}
            </Button>
          </Stack>
        </Box>

        {/* Enhanced Contact Details */}
        {showingDetails === contact.contact_id && contactDetails && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              backgroundColor: "#f8f9fa",
              border: "1px solid #e0e0e0",
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "primary.main" }}>
                📋 Detailed Contact Information
              </Typography>
              <Button
                variant={selectedContact?.contact_id === contactDetails.contact_id ? "outlined" : "contained"}
                size="small"
                onClick={() => onUseContactDetails(contactDetails)}
                disabled={selectedContact?.contact_id === contactDetails.contact_id}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  minWidth: 130,
                }}
              >
                {selectedContact?.contact_id === contactDetails.contact_id ? "Selected" : "Use Contact Details"}
              </Button>
            </Box>

            <DetailedContactInfo contactDetails={contactDetails} />
          </Box>
        )}
      </Stack>
    </Card>
  );
};

export default ContactCard;
