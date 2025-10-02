import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { Lead, Opportunity, SharpSpringResult,  } from "../../../../../Models/ConstantContactModels/ConstantContactDTO";

import SharpSpringContactBasicInfo from "./SharpSpringContactBasicInfo";

interface SearchResultsProps {
  result: SharpSpringResult | undefined;
  searchEmail: string;
  selectedLead: Lead | null;
  onUseLeadDetails: (details: Lead) => void;
  onUseOpportunityDetails: (details: Opportunity) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  result,
  searchEmail,
  selectedLead,
  onUseLeadDetails,
  onUseOpportunityDetails
}) => {
  // Search Results



  if (result?.isSuccess) {
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
          Search Results ({result.dataFromLeadsFromLead.companyName}  with  {result.opportunityList.length}  Opportunit{result.opportunityList.length < 1 ? "y" : "ies"}   found)
        </Typography>
        <Stack spacing={2}>
        
            <SharpSpringContactBasicInfo
              key={result.dataFromLeadsFromLead.id}
              lead={result.dataFromLeadsFromLead}
              opportunityList={result.opportunityList}
              selectedLead={selectedLead && ({ id: selectedLead.id } as Lead)}
              onUseLeadDetails={onUseLeadDetails}
              onUseOpportunityDetails={onUseOpportunityDetails}
            />
         
        </Stack>
      </Box>
    );
  }

  // No Results
  if (!result?.isSuccess && searchEmail) {
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
