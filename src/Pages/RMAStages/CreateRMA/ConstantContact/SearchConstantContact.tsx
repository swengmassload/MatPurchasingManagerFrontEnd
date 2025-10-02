import React from "react";
import { Card, CardContent  } from "@mui/material";
import {  Lead, Opportunity } from "../../../../Models/ConstantContactModels/ConstantContactDTO";
import { useSearchConstantContact } from "./Hooks/useSearchConstantContact";
import SearchHeader from "./Components/SearchHeader";
import SearchForm from "./Components/SearchForm";
import StatusMessages from "./Components/StatusMessages";
import SearchResults from "./Components/SearchResults";

interface SearchConstantContactProps {
   onLeadSelected?: (lead: Lead | null) => void;
   onOpportunitySelected?: (opportunity: Opportunity | null) => void;}

const SearchConstantContact: React.FC<SearchConstantContactProps> = ({
  onLeadSelected,
  onOpportunitySelected

}) => {
  console.log("🔄 SearchConstantContact component rendered");

  const {
    searchEmail,
    setSearchEmail,
    selectedLead,
    selectedOpportunity,
    successMessage,

    // API states
    result,
    isLoading,
    error,
    // Handlers
    handleSearch,
    handleKeyPress,
    handleUseLeadDetails,
    handleUseOpportunityDetails,
  } = useSearchConstantContact(onLeadSelected, onOpportunitySelected);




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
          onKeyDown={handleKeyPress}
          isLoading={isLoading}
        />

        <StatusMessages
          successMessage={successMessage}
          isLoading={isLoading}

          error={error}
        />

        <SearchResults
          result={result}
          searchEmail={searchEmail}
          selectedLead={selectedLead}
          onUseLeadDetails={handleUseLeadDetails}
          onUseOpportunityDetails={handleUseOpportunityDetails}

        />
      </CardContent>
    </Card>
  );
};

export default SearchConstantContact;
