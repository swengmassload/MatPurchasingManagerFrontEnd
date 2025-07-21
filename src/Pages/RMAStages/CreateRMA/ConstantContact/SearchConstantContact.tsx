import React from "react";
import { Card, CardContent, CircularProgress, Alert, Typography, Box } from "@mui/material";
import { Contact } from "../../../../Models/ConstantContactModels/ConstantContactDTO";
import { ValidToken } from "../../../../Hooks/useGetConfirmIfUserHasExistingValidToken";
import { useSearchConstantContact } from "./Hooks/useSearchConstantContact";
import SearchHeader from "./Components/SearchHeader";
import SearchForm from "./Components/SearchForm";
import StatusMessages from "./Components/StatusMessages";
import SearchResults from "./Components/SearchResults";

interface SearchConstantContactProps {
  onContactSelected?: (contact: Contact | null) => void;
  onTokenValidationChange?: (tokenValidationResult: ValidToken | null) => void;
}

const SearchConstantContact: React.FC<SearchConstantContactProps> = ({
  onContactSelected,
  onTokenValidationChange,
}) => {
  console.log("🔄 SearchConstantContact component rendered");

  const {
    // Token validation state (primary concern)
    tokenValidationComplete,
    tokenValidationResult,
    isCheckingToken,

    // State
    searchEmail,
    setSearchEmail,
    selectedContact,
    contactDetails,
    showingDetails,
    fetchingContactId,
    successMessage,

    // API states
    result,
    isLoading,
    error,
    isLoadingDetails,

    // Handlers
    handleSearch,
    handleKeyPress,
    handleFetchContactDetails,
    handleUseContactDetails,
  } = useSearchConstantContact(onContactSelected);

  // Notify parent component about token validation changes
  React.useEffect(() => {
    console.log("Token validation result in SearchConstantContact:", tokenValidationResult);
    onTokenValidationChange?.(tokenValidationResult || null);
  }, [tokenValidationResult, onTokenValidationChange]);

  // Show loading state while checking token
  if (!tokenValidationComplete) {
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
        <CardContent sx={{ p: 3, textAlign: "center" }}>
          <SearchHeader />
          <Box sx={{ mt: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <CircularProgress size={40} />
            <Typography variant="body2" color="text.secondary">
              Checking Constant Contact authorization...
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  // Show warning if token is invalid (this will trigger OAuth redirect)
  // if (!tokenValidationResult?.isValid) {
  //   return (
  //     <Card
  //       elevation={3}
  //       sx={{
  //         borderRadius: 2,
  //         background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
  //         border: "1px solid #e0e0e0",
  //         height: "fit-content",
  //       }}
  //     >
  //       <CardContent sx={{ p: 3 }}>
  //         <SearchHeader />
  //         <Alert severity="warning" sx={{ mt: 2 }}>
  //           <Typography variant="body2">
  //             No valid Constant Contact token found. You will be redirected to authorize access.
  //           </Typography>
  //         </Alert>
  //       </CardContent>
  //     </Card>
  //   );
  // }

  // Normal UI when token is valid
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
          currentSearchEmail={searchEmail}
          onEmailChange={setSearchEmail}
          onSearch={handleSearch}
          onKeyPress={handleKeyPress}
          isLoading={isLoading}
          ishasConstantContactToken={tokenValidationResult?.isValid || false}
        />

        <StatusMessages
          successMessage={successMessage}
          isLoading={isLoading}
          ishasConstantContactToken={tokenValidationResult?.isValid || false}
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
