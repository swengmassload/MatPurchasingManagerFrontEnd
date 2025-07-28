import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Alert,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Search, ExpandMore } from "@mui/icons-material";
import { RMASearchResponseDTO } from "../../../../Models/RMAManagerModels/Dto";
import { standardInputSx } from "../../../../Constants/ComponentStyles";

interface RMASearchSectionProps {
  rmaNumber: string;
  onRmaNumberChange: (value: string) => void;
  onSearch: () => void;
  isSearching: boolean;
  searchResults: RMASearchResponseDTO | null;
  searchError: string;
}

const RMASearchSection: React.FC<RMASearchSectionProps> = ({
  rmaNumber,
  onRmaNumberChange,
  onSearch,
  isSearching,
  searchResults,
  searchError,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          RMA Search
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
          <TextField
            label="RMA Number"
            type="number"
            value={rmaNumber}
            onChange={(e) => onRmaNumberChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter RMA number"
            disabled={isSearching}
            sx={{
              flex: 1,
              minWidth: 200,
              maxWidth: 300,
              ...standardInputSx,
            }}
          />
          <Button
            variant="contained"
            startIcon={isSearching ? <CircularProgress size={20} /> : <Search />}
            onClick={onSearch}
            disabled={!rmaNumber.trim() || isSearching}
            sx={{ minWidth: 120, flexShrink: 0 }}
          >
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </Box>

        {/* Search Error */}
        {searchError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {searchError}
          </Alert>
        )}

        {/* Search Results */}
        {searchResults && (
          <Box sx={{ mt: 2, width: "100%" }}>
            <Alert severity="success" sx={{ mb: 2 }}>
              RMA #{searchResults.rmaNumber} found successfully!
            </Alert>

            <Accordion defaultExpanded sx={{ backgroundColor: "#f9f9f9", width: "100%" }}>
              <AccordionSummary expandIcon={<ExpandMore />} aria-controls="rma-details-content" id="rma-details-header">
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  RMA Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 3,
                    width: "100%",
                  }}
                >
                  <Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Customer Name:
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {searchResults.customerName}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Contact Email:
                      </Typography>
                      <Typography variant="body1">{searchResults.contactEmail}</Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Status:
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {searchResults.status}
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Product:
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {searchResults.productDescription}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Issue Description:
                      </Typography>
                      <Typography variant="body1">{searchResults.issueDescription}</Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Date Created:
                      </Typography>
                      <Typography variant="body1">
                        {new Date(searchResults.dateCreated).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RMASearchSection;
