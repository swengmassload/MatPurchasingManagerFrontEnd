import React from "react";
import { Card, CardContent, Typography, Button, Box, Divider, Alert, Chip } from "@mui/material";
import { Assignment, CalendarToday, Person } from "@mui/icons-material";
import { RMASearchResponseDTO } from "../../../../Models/RMAManagerModels/Dto";

interface RMAListSectionProps {
  rmaList: RMASearchResponseDTO[];
  onSelectRMA: (rma: RMASearchResponseDTO) => void;
  selectedRMANumber?: number;
  isLoading?: boolean;
}

const RMAListSection: React.FC<RMAListSectionProps> = ({
  rmaList,
  onSelectRMA,
  selectedRMANumber,
  isLoading = false,
}) => {
  return (
    <Card sx={{ width: "100%", height: "fit-content" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
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
            {rmaList.map((rma) => (
              <Card
                key={rma.rmaNumber}
                variant="outlined"
                sx={{
                  backgroundColor: selectedRMANumber === rma.rmaNumber ? "#e3f2fd" : "#f9f9f9",
                  border: selectedRMANumber === rma.rmaNumber ? "2px solid #2196f3" : "1px solid #e0e0e0",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: selectedRMANumber === rma.rmaNumber ? "#e3f2fd" : "#f0f0f0",
                    transform: "translateY(-2px)",
                    boxShadow: 2,
                  },
                }}
              >
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  {/* RMA Number Header */}
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Assignment color="primary" />
                      <Typography variant="h6" color="primary">
                        RMA #{rma.rmaNumber}
                      </Typography>
                      {selectedRMANumber === rma.rmaNumber && <Chip label="Selected" size="small" color="primary" />}
                    </Box>
                    <Chip
                      label={rma.status}
                      size="small"
                      color={rma.status === "Package Received" ? "success" : "default"}
                      variant="outlined"
                    />
                  </Box>

                  {/* Customer Information */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <Person fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      Customer:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {rma.customerName}
                    </Typography>
                  </Box>

                  {/* Date Created */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <CalendarToday fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      Created:
                    </Typography>
                    <Typography variant="body2">{new Date(rma.dateCreated).toLocaleDateString()}</Typography>
                  </Box>

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
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RMAListSection;
