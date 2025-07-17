import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import {
  Contact,
  DetailContact,
  ConstantContactSearchResponse,
} from "../../../../../Models/ConstantContactModels/ConstantContactDTO";
import ContactCard from "./ContactCard";

interface SearchResultsProps {
  result: ConstantContactSearchResponse | undefined;
  searchEmail: string;
  selectedContact: Contact | null;
  showingDetails: string | null;
  contactDetails: DetailContact | null;
  isLoadingDetails: boolean;
  fetchingContactId: string | null;
  onFetchDetails: (contact: Contact) => void;
  onUseContactDetails: (details: DetailContact) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  result,
  searchEmail,
  selectedContact,
  showingDetails,
  contactDetails,
  isLoadingDetails,
  fetchingContactId,
  onFetchDetails,
  onUseContactDetails,
}) => {
  // Search Results
  if (result?.contacts && result.contacts.length > 0) {
    return (
      <Box>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 500,
            color: "text.primary",
          }}
        >
          Search Results ({result.contacts.length} contact{result.contacts.length !== 1 ? "s" : ""} found)
        </Typography>
        <Stack spacing={2}>
          {result.contacts.map((contact) => (
            <ContactCard
              key={contact.contact_id}
              contact={contact}
              selectedContact={selectedContact}
              showingDetails={showingDetails}
              contactDetails={contactDetails}
              isLoadingDetails={isLoadingDetails}
              fetchingContactId={fetchingContactId}
              onFetchDetails={onFetchDetails}
              onUseContactDetails={onUseContactDetails}
            />
          ))}
        </Stack>
      </Box>
    );
  }

  // No Results
  if (result?.contacts && result.contacts.length === 0 && searchEmail) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          backgroundColor: "#fff3cd",
          border: "1px solid #ffc107",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ color: "#856404", mb: 1 }}>
          No contacts found
        </Typography>
        <Typography variant="body1" sx={{ color: "#856404" }}>
          No contacts were found for "{searchEmail}"
        </Typography>
      </Box>
    );
  }

  return null;
};

export default SearchResults;
