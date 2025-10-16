import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { Lead, Opportunity, SharpSpringResult,  } from "../../../../../Models/ConstantContactModels/ConstantContactDTO";

import SharpSpringContactBasicInfo from "./SharpSpringContactBasicInfo";

interface SearchResultsProps {
  result: SharpSpringResult | undefined;
  searchEmail: string;
  selectedLead: Lead | null;
  selectedOpportunity?: Opportunity | null;
  onUseLeadDetails: (details: Lead) => void;
  onUseOpportunityDetails: (details: Opportunity) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  result,
  searchEmail,
  selectedLead,
  selectedOpportunity,
  onUseLeadDetails,
  onUseOpportunityDetails
}) => {

return  ( (result?.isSuccess  && result.dataFromLeadsFromLead  && result.opportunityList.length >0)  ?
 (      <Box>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 500,
            color: "text.primary",
          }}
        >
         {result.dataFromLeadsFromLead.companyName} company with  {result.opportunityList.length}  Opportunit{result.opportunityList.length < 2 ? "y" : "ies"}   found
        </Typography>
        <Stack spacing={2}>
        
            <SharpSpringContactBasicInfo
              key={result.dataFromLeadsFromLead.id}
              lead={result.dataFromLeadsFromLead}
              opportunityList={result.opportunityList}
              selectedOpportunity={selectedOpportunity && ({ id: selectedOpportunity.id } as Opportunity)}
              selectedLead={selectedLead && ({ id: selectedLead.id } as Lead)}
              onUseLeadDetails={onUseLeadDetails}
              onUseOpportunityDetails={onUseOpportunityDetails}
            />
         
        </Stack>
      </Box>)
 :
 (      <Box
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
      </Box>)

)
};

export default SearchResults;
