import React, { useState } from "react";
import { Box, TextField, Button, Typography, CircularProgress } from "@mui/material";
import { useGetRMAById } from "../../../Hooks/useGetRMAById";
import { useGetAssessmentByRmaNumber } from "../../../Hooks/useGetAssessmentByRmaNumber";
import AssessmentPreviewDialog from "../../RMAStages/AssessPackage/Components/AssessmentPreviewDialog";

const ViewRMA = () => {
  const [rmaNumber, setRmaNumber] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: rmaData, isLoading: isLoadingRMA, error: rmaError } = useGetRMAById(rmaNumber, searchClicked);
  const {
    data: assessmentData,
    isLoading: isLoadingAssessment,
    error: assessmentError,
  } = useGetAssessmentByRmaNumber(rmaNumber, !!rmaData);

  const handleSearch = () => {
    setSearchClicked(true);
  };

  React.useEffect(() => {
    if (rmaData && assessmentData) {
      setDialogOpen(true);
    }
  }, [rmaData, assessmentData]);

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h5" gutterBottom>
        View RMA Assessment
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Enter RMA Number"
          value={rmaNumber}
          onChange={(e) => {
            setRmaNumber(e.target.value);
            setSearchClicked(false);
          }}
          type="text"
          fullWidth
        />
        <Button variant="contained" onClick={handleSearch} disabled={!rmaNumber || isLoadingRMA}>
          Search
        </Button>
      </Box>
      {isLoadingRMA && <CircularProgress size={24} />}
      {rmaError && <Typography color="error">RMA not found.</Typography>}
      {isLoadingAssessment && <CircularProgress size={24} />}
      {assessmentError && <Typography color="error">Assessment not found.</Typography>}

      {rmaData && assessmentData && (
        <AssessmentPreviewDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          assessmentData={assessmentData}
          rmaDetails={{
            companyName: rmaData.companyName,
            contactName: rmaData.contactName,
            customerEmail: rmaData.customerEmail,
            rmaProblemDescription: rmaData.rmaProblemDescription,
          }}
        />
      )}
    </Box>
  );
};

export default ViewRMA;
