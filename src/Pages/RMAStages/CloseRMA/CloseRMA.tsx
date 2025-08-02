import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, TextField, Button, Paper, Stack, Divider, Alert } from "@mui/material";
import { Save } from "@mui/icons-material";
import {
  CloseRMAEventCreateRequestDTO,
  RMAResponseDTO,
  RMAGetRequestByStage,
} from "../../../Models/RMAManagerModels/Dto";
import { useCloseRMA } from "../../../Hooks/useCloseRMA";
import { useGetRMAByStage } from "../../../Hooks/useGetRMAByStage";
import RMAListSection from "../AssessPackage/Components/RMAListSection";
import toast from "react-hot-toast";
import { DefaultRMAStages } from "../../../Constants/RMAStages";

interface CloseRMAFormErrors {
  rMANumber?: string;
  notes?: string;
}

const CloseRMA = () => {
  const createCloseRMAMutation = useCloseRMA();
  const rmaQueryParams: RMAGetRequestByStage = {
    Stage: DefaultRMAStages.REPAIRINPROGRESS.stage,
    DraftAssessment: true,
  };
  const { data: rmaData, isLoading: isLoadingList, error: rmaError, refetch } = useGetRMAByStage(rmaQueryParams, true);
  const [rmaList, setRmaList] = useState<RMAResponseDTO[]>([]);
  const [selectedRMA, setSelectedRMA] = useState<RMAResponseDTO | null>(null);
  const [formData, setFormData] = useState<CloseRMAEventCreateRequestDTO>({
    rMANumber: 0,
    notes: "",
  });
  const [errors, setErrors] = useState<CloseRMAFormErrors>({});

  useEffect(() => {
    if (rmaData) {
      setRmaList(rmaData);
    }
  }, [rmaData]);

  // Handle errors from the RMA query
  useEffect(() => {
    if (rmaError) {
      toast.error("Failed to load RMA list");
    }
  }, [rmaError]);

  const handleSelectRMA = (rma: RMAResponseDTO) => {
    setSelectedRMA(rma);
    setFormData((prev) => ({
      ...prev,
      rMANumber: rma.rmaNumber,
    }));
    // Clear RMA number error when an RMA is selected
    setErrors((prev) => ({ ...prev, rMANumber: undefined }));
    toast.success(`RMA #${rma.rmaNumber} selected for closing`);
  };

  const handleFieldChange =
    (field: keyof CloseRMAEventCreateRequestDTO) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;

      if (field === "rMANumber") {
        const numValue = parseInt(value) || 0;
        setFormData((prev) => ({ ...prev, [field]: numValue }));
      } else {
        setFormData((prev) => ({ ...prev, [field]: value }));
      }

      // Clear error when user starts typing (only for fields that have validation)
      if (field === "rMANumber" || field === "notes") {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const validateForm = (): boolean => {
    const newErrors: CloseRMAFormErrors = {};

    if (!formData.rMANumber || formData.rMANumber <= 0) {
      newErrors.rMANumber = "RMA Number is required and must be greater than 0";
    }

    if (!formData.notes || formData.notes.trim().length === 0) {
      newErrors.notes = "Notes are required";
    } else if (formData.notes.trim().length < 5) {
      newErrors.notes = "Notes must be at least 5 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the validation errors before submitting");
      return;
    }

    try {
      await createCloseRMAMutation.mutateAsync(formData);
      toast.success("RMA closed successfully!");
      refetch();
      // Reset form after successful submission
      setFormData({
        rMANumber: 0,
        notes: "",
      });
      setErrors({});
      setSelectedRMA(null);
    } catch (error) {
      console.error("Error closing RMA:", error);
      toast.error("Failed to close RMA");
    }
  };

  return (
    <Box sx={{ maxWidth: 1600, margin: "0 auto", padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
          {/* Left Side - RMA List */}
          <Box sx={{ flex: "0 0 400px", minWidth: { xs: "100%", md: "400px" } }}>
            <RMAListSection
              rmaList={rmaList}
              onSelectRMA={handleSelectRMA}
              selectedRMANumber={selectedRMA?.rmaNumber}
              isLoading={isLoadingList}
            />
          </Box>

          {/* Right Side - Close RMA Form */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {/* RMA Closure Information Section */}
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      RMA Closure Information
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Stack spacing={2}>
                      <TextField
                        fullWidth
                        label="RMA Number *"
                        type="number"
                        value={formData.rMANumber || ""}
                        onChange={handleFieldChange("rMANumber")}
                        error={Boolean(errors.rMANumber)}
                        helperText={errors.rMANumber || "Select an RMA from the list or enter manually"}
                        disabled={!!selectedRMA}
                      />

                      <TextField
                        fullWidth
                        label="Closure Notes *"
                        multiline
                        rows={4}
                        value={formData.notes || ""}
                        onChange={handleFieldChange("notes")}
                        error={Boolean(errors.notes)}
                        helperText={errors.notes || "Details about the RMA closure (resolution, final status, etc.)"}
                        placeholder="Describe the final resolution, repair completion status, customer satisfaction, and any relevant closure details..."
                      />
                    </Stack>
                  </CardContent>
                </Card>

                {/* Status Information */}
                {createCloseRMAMutation.isError && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    Failed to close RMA. Please try again.
                  </Alert>
                )}

                {createCloseRMAMutation.isSuccess && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    RMA has been closed successfully!
                  </Alert>
                )}

                {/* Action Buttons */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                    disabled={createCloseRMAMutation.isPending}
                    sx={{ minWidth: 140 }}
                  >
                    {createCloseRMAMutation.isPending ? "Closing..." : "Close RMA"}
                  </Button>
                </Box>
              </Stack>
            </form>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CloseRMA;
