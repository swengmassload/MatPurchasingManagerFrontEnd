import React from "react";
import { Card, CardContent } from "@mui/material";
import { Contact } from "../../../../Models/ConstantContactModels/ConstantContactDTO";
import { useSearchConstantContact } from "./Hooks/useSearchConstantContact";
import SearchHeader from "./Components/SearchHeader";
import SearchForm from "./Components/SearchForm";
import StatusMessages from "./Components/StatusMessages";
import SearchResults from "./Components/SearchResults";

interface SearchConstantContactProps {
  onContactSelected?: (contact: Contact | null) => void;
}

const SearchConstantContact: React.FC<SearchConstantContactProps> = ({ onContactSelected }) => {
  console.log("🔄 SearchConstantContact component rendered");

  const {
    currentSearchEmail,
    setCurrentSearchEmail,
    searchEmail,
    selectedContact,
    contactDetails,
    showingDetails,
    fetchingContactId,
    successMessage,
    result,
    isLoading,
    error,
    isLoadingDetails,
    isCheckingToken,
    handleSearch,
    handleKeyPress,
    handleFetchContactDetails,
    handleUseContactDetails,
  } = useSearchConstantContact(onContactSelected);

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 2,
        background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
        border: "1px solid #e0e0e0",
        height: "fit-content",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <SearchHeader />

        <SearchForm
          currentSearchEmail={currentSearchEmail}
          onEmailChange={setCurrentSearchEmail}
          onSearch={handleSearch}
          onKeyPress={handleKeyPress}
          isLoading={isLoading}
          isCheckingToken={isCheckingToken}
        />

        <StatusMessages
          successMessage={successMessage}
          isLoading={isLoading}
          isCheckingToken={isCheckingToken}
          error={error}
        />

        <SearchResults
          result={result}
          searchEmail={searchEmail}
          selectedContact={selectedContact}
          showingDetails={showingDetails}
          contactDetails={contactDetails}
          isLoadingDetails={isLoadingDetails}
          fetchingContactId={fetchingContactId}
          onFetchDetails={handleFetchContactDetails}
          onUseContactDetails={handleUseContactDetails}
        />
      </CardContent>
    </Card>
  );
};

export default SearchConstantContact;
