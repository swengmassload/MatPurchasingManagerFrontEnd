import React, { useState } from "react";
import { Box, Typography, Stack, Card, CardContent, Collapse, IconButton, Divider, Chip, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Opportunity } from "../../../../../Models/ConstantContactModels/ConstantContactDTO";
import ContactDetailField from "./ContactDetailField";

interface OpportunityListProps {
  opportunityList: Opportunity[];
  onUseOpportunityDetails: (details: Opportunity) => void;
  selectedOpportunity?: Opportunity | null;
}

const OpportunityList: React.FC<OpportunityListProps> = ({
  opportunityList,
  onUseOpportunityDetails,
  selectedOpportunity,
}) => {
  const [expandedOpportunities, setExpandedOpportunities] = useState<Set<string>>(new Set());

  const toggleOpportunity = (opportunityId: string) => {
    setExpandedOpportunities((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(opportunityId)) {
        newSet.delete(opportunityId);
      } else {
        newSet.add(opportunityId);
      }
      return newSet;
    });
  };

  if (!opportunityList || opportunityList.length === 0) {
    return null;
  }

  // Sort opportunities by updateTimestamp in descending order (most recent first)
  const sortedOpportunities = [...opportunityList].sort((a, b) => {
    const dateA = new Date(a.updateTimestamp || 0).getTime();
    const dateB = new Date(b.updateTimestamp || 0).getTime();
    return dateB - dateA; // Descending order
  });

  // Helper function to format timestamp for display
  const formatTimestamp = (timestamp: string | null) => {
    if (!timestamp) return "N/A";
    try {
      return new Date(timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return timestamp;
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        <span>Opportunit{opportunityList.length < 2 ? "y" : "ies"}</span> found: ({opportunityList.length})
      </Typography>

      <Stack spacing={2}>
        {sortedOpportunities.map((opportunity) => (
          <Card key={opportunity.id} variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent sx={{ pb: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => toggleOpportunity(opportunity.id)}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {opportunity.opportunityName || `Opportunity ${opportunity.id}`}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
                    {/* <Chip label={`$${opportunity.amount || "0"}`} size="small" color="primary" variant="outlined" />
                    <Chip
                      label={`${opportunity.probability || "0"}% probability`}
                      size="small"
                      color="secondary"
                      variant="outlined"
                    /> */}

                    <Chip
                      label={opportunity.isClosed === "1" ? "Closed" : "Open"}
                      size="small"
                      color={opportunity.isClosed === "1" ? "error" : "info"}
                    />
                                        <Chip
                      label={opportunity.isActive === "1" ? "Active" : "Archived"}
                      size="small"
                      color={opportunity.isActive === "1" ? "info" : "error"}
                    />
                    <Chip
                      label={`Updated: ${formatTimestamp(opportunity.updateTimestamp)}`}
                      size="small"
                      color="default"
                      variant="outlined"
                      sx={{ fontWeight: 500 }}
                    />
                  </Box>
                </Box>
                <IconButton
                  sx={{
                    transform: expandedOpportunities.has(opportunity.id) ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Box>

              <Collapse in={expandedOpportunities.has(opportunity.id)}>
                <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }}>
                  <Stack spacing={1}>
                    <ContactDetailField label="Opportunity ID" value={opportunity.id} />
                    <ContactDetailField label="Owner ID" value={opportunity.ownerID} />
                    <ContactDetailField label="Deal Stage ID" value={opportunity.dealStageID} />
                    <ContactDetailField label="Account ID" value={opportunity.accountID} />
                    <ContactDetailField label="Campaign ID" value={opportunity.campaignID} />
                    <ContactDetailField label="Close Date" value={opportunity.closeDate} />
                    <ContactDetailField label="Created" value={opportunity.createTimestamp} />
                    <ContactDetailField label="Updated" value={opportunity.updateTimestamp} />
                    <ContactDetailField label="Primary Lead ID" value={opportunity.primaryLeadID} />
                    <ContactDetailField label="Is Closed" value={opportunity.isClosed} />
                    <ContactDetailField label="Is Active" value={opportunity.isActive} />
                    {opportunity.product_enquiry_633487faea1c8 && (
                      <ContactDetailField label="Product Enquiry" value={opportunity.product_enquiry_633487faea1c8} />
                    )}
                    {opportunity.type_of_service_633489e2066cb && (
                      <ContactDetailField label="Type of Service" value={opportunity.type_of_service_633489e2066cb} />
                    )}
                    {opportunity.message_633489f949d24 && (
                      <ContactDetailField label="Message" value={opportunity.message_633489f949d24} />
                    )}
                  </Stack>
                </Box>
              </Collapse>
              <Button
                variant={selectedOpportunity?.id === opportunity.id ? "outlined" : "contained"}
                size="small"
                onClick={() => onUseOpportunityDetails(opportunity)}
                disabled={selectedOpportunity?.id === opportunity.id}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  minWidth: 130,
                  mt: 2,
                }}
              >
                {selectedOpportunity?.id === opportunity.id ? "Selected" : "Use Opportunity Details"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default OpportunityList;
