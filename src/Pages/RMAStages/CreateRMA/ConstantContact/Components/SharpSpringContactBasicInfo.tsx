import React from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { Lead, Opportunity } from "../../../../../Models/ConstantContactModels/ConstantContactDTO";
import ContactDetailField from "./ContactDetailField";
import OpportunityList from "./OpportunityList";

interface LeadBasicInfoProps {
  lead: Lead;
  opportunityList?: Opportunity[];
  selectedLead: Lead | null;
  selectedOpportunity?: Opportunity | null;
  onUseLeadDetails: (details: Lead) => void;
  onUseOpportunityDetails: (details: Opportunity) => void;
}

const SharpSpringContactBasicInfo: React.FC<LeadBasicInfoProps> = ({
  lead,
  opportunityList,
  selectedLead,
  selectedOpportunity,
  onUseLeadDetails,
  onUseOpportunityDetails,
}) => {

  console.log("Rendering SharpSpringContactBasicInfo with selectedLead:", selectedLead);
  console.log("Rendering SharpSpringContactBasicInfo with selectedOpportunity:", selectedOpportunity);

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: "text.primary",
          mb: 0.5,
        }}
      >
       Name : {lead.firstName || ""} {lead.lastName || ""}
      </Typography>

      <Stack spacing={1.5}>
        <ContactDetailField label="Lead ID" value={lead.id} />
        <ContactDetailField label="Company" value={lead.companyName} />
        <ContactDetailField label="Job Title" value={lead.title} />
        <ContactDetailField label="Email Address" value={lead.emailAddress} />
        <ContactDetailField label="Website" value={lead.website} />
        <ContactDetailField label="Phone Number" value={lead.phoneNumber} />
        <ContactDetailField label="Office Phone" value={lead.officePhoneNumber} />
        <ContactDetailField label="Mobile Phone" value={lead.mobilePhoneNumber} />
        <ContactDetailField label="Fax Number" value={lead.faxNumber} />
        <ContactDetailField label="Street" value={lead.street} />
        <ContactDetailField label="City" value={lead.city} />
        <ContactDetailField label="State" value={lead.state} />
        <ContactDetailField label="Zip Code" value={lead.zipcode} />
        <ContactDetailField label="Country" value={lead.country} />
      </Stack>
      <Button
        variant={selectedLead?.id === lead.id ? "outlined" : "contained"}
        size="small"
        onClick={() => onUseLeadDetails(lead)}
        disabled={selectedLead?.id === lead.id}
        sx={{
          textTransform: "none",
          borderRadius: 2,
          minWidth: 130,
          mt: 2,
        }}
      >
        {selectedLead?.id === lead.id ? "Selected" : "Use Contact Details"}
      </Button>
      {opportunityList && <OpportunityList opportunityList={opportunityList} onUseOpportunityDetails={onUseOpportunityDetails} selectedOpportunity={selectedOpportunity} />}


    </Box>
  );
};
export default SharpSpringContactBasicInfo;

