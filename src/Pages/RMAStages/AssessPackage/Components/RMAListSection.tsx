import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Box, Divider, Alert, Chip, Collapse, IconButton } from "@mui/material";
import { Assignment, Person, Phone, Email, ExpandMore, ExpandLess, Description } from "@mui/icons-material";
import { RMAResponseDTO } from "../../../../Models/RMAManagerModels/Dto";

interface RMAListSectionProps {
  rmaList: RMAResponseDTO[];
  onSelectRMA: (rma: RMAResponseDTO) => void;
  selectedRMANumber?: number;
  isLoading?: boolean;
}

const RMAListSection: React.FC<RMAListSectionProps> = ({
  rmaList,
  onSelectRMA,
  selectedRMANumber,
  isLoading = false,
}) => {
  const [expandedRMAs, setExpandedRMAs] = useState<Set<number>>(new Set());

  const toggleExpand = (rmaNumber: number) => {
    const newExpanded = new Set(expandedRMAs);
    if (newExpanded.has(rmaNumber)) {
      newExpanded.delete(rmaNumber);
    } else {
      newExpanded.add(rmaNumber);
    }
    setExpandedRMAs(newExpanded);
  };

  // Sort RMAs by creation date (newest first)
  const sortedRmaList = [...rmaList].sort((a, b) => {
    const dateA = a.dateIssued ? new Date(a.dateIssued) : new Date(0);
    const dateB = b.dateIssued ? new Date(b.dateIssued) : new Date(0);
    return dateB.getTime() - dateA.getTime();
  });
  return (
    <Card sx={{ width: "100%", height: "fit-content" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ color: "black" }}>
          Available RMAs
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {isLoading && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Loading RMA list...
          </Alert>
        )}

        {!isLoading && rmaList.length === 0 && <Alert severity="info">No RMAs available for assessment.</Alert>}

        {!isLoading && rmaList.length > 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {sortedRmaList.map((rma) => {
              const isExpanded = expandedRMAs.has(rma.rmaNumber);
              console.log(`RMA #${rma.rmaNumber} draftAssessment:`, rma.draftAssessment); // Debug log
              return (
                <Card
                  key={rma.rmaNumber}
                  variant="outlined"
                  sx={{
                    backgroundColor: selectedRMANumber === rma.rmaNumber ? "#e3f2fd" : "#f9f9f9",
                    border: selectedRMANumber === rma.rmaNumber ? "2px solid #2196f3" : "1px solid #e0e0e0",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      backgroundColor: selectedRMANumber === rma.rmaNumber ? "#e3f2fd" : "#f0f0f0",
                      transform: "translateY(-2px)",
                      boxShadow: 2,
                    },
                  }}
                >
                  <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                    {/* RMA Number Header with Expand/Collapse */}
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Assignment sx={{ color: "black" }} />
                        <Typography variant="h6" sx={{ color: "black" }}>
                          RMA #{rma.rmaNumber}
                        </Typography>
                        {rma.draftAssessment && (
                          <Chip
                            label="DRAFT"
                            size="small"
                            sx={{
                              backgroundColor: "green",
                              color: "white",
                              fontWeight: "bold",
                            }}
                          />
                        )}
                        {selectedRMANumber === rma.rmaNumber && <Chip label="Selected" size="small" color="primary" />}
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Chip
                          label={rma.dateIssued ? new Date(rma.dateIssued).toLocaleDateString() : "N/A"}
                          size="small"
                          sx={{
                            color: "black",
                            borderColor: "black",
                          }}
                          variant="outlined"
                        />
                        <IconButton size="small" onClick={() => toggleExpand(rma.rmaNumber)} sx={{ ml: 1 }}>
                          {isExpanded ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      </Box>
                    </Box>

                    {/* Collapsible Customer Information */}
                    <Collapse in={isExpanded}>
                      <Box sx={{ mb: 2 }}>
                        {/* Company Name */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                          <Person fontSize="small" sx={{ color: "black" }} />
                          <Typography variant="body2" sx={{ color: "black" }}>
                            Company:
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: "black" }}>
                            {rma.companyName}
                          </Typography>
                        </Box>

                        {/* Contact Name */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                          <Person fontSize="small" sx={{ color: "black" }} />
                          <Typography variant="body2" sx={{ color: "black" }}>
                            Contact:
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: "black" }}>
                            {rma.contactName || "N/A"}
                          </Typography>
                        </Box>

                        {/* Phone Number */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                          <Phone fontSize="small" sx={{ color: "black" }} />
                          <Typography variant="body2" sx={{ color: "black" }}>
                            Phone:
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: "black" }}>
                            {rma.phoneNumber || "N/A"}
                          </Typography>
                        </Box>

                        {/* Email */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                          <Email fontSize="small" sx={{ color: "black" }} />
                          <Typography variant="body2" sx={{ color: "black" }}>
                            Email:
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: "black" }}>
                            {rma.customerEmail || "N/A"}
                          </Typography>
                        </Box>

                        {/* Problem Description */}
                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 2 }}>
                          <Description fontSize="small" sx={{ color: "black", mt: 0.5 }} />
                          <Typography variant="body2" sx={{ color: "black" }}>
                            Problem:
                          </Typography>
                          <Typography variant="body2" sx={{ flex: 1, color: "black" }}>
                            {rma.rmaProblemDescription
                              ? rma.rmaProblemDescription.length > 100
                                ? `${rma.rmaProblemDescription.substring(0, 100)}...`
                                : rma.rmaProblemDescription
                              : "N/A"}
                          </Typography>
                        </Box>
                      </Box>
                    </Collapse>

                    {/* Select Button */}
                    <Button
                      variant={selectedRMANumber === rma.rmaNumber ? "contained" : "outlined"}
                      color="primary"
                      size="small"
                      fullWidth
                      onClick={() => onSelectRMA(rma)}
                      disabled={selectedRMANumber === rma.rmaNumber}
                    >
                      {selectedRMANumber === rma.rmaNumber ? "Selected" : "Select RMA"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RMAListSection;
