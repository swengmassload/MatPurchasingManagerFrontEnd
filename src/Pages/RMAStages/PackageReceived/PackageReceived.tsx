import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, TextField, Button, Paper, Stack, Divider, Alert } from "@mui/material";
import { Save } from "@mui/icons-material";
import { PackageReceivedEventCreateRequestDTO, RMASearchResponseDTO } from "../../../Models/RMAManagerModels/Dto";
import { useCreatePackageReceived } from "../../../Hooks/useCreatePackageReceived";
import RMAListSection from "../AssessPackage/Components/RMAListSection";
import toast from "react-hot-toast";

// Custom error interface for form validation
interface PackageReceivedFormErrors {
  rMANumber?: string;
  timeStamp?: string;
  notes?: string;
}

const PackageReceived = () => {
  const createPackageReceivedMutation = useCreatePackageReceived();

  // RMA List state
  const [rmaList, setRmaList] = useState<RMASearchResponseDTO[]>([]);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);
  const [selectedRMA, setSelectedRMA] = useState<RMASearchResponseDTO | null>(null);

  const [formData, setFormData] = useState<PackageReceivedEventCreateRequestDTO>({
    rMANumber: 0,
    //userName: "",
    timeStamp: new Date(),
    notes: "",
    //    guidId: "",
  });

  const [errors, setErrors] = useState<PackageReceivedFormErrors>({});

  // Load RMA list on component mount
  useEffect(() => {
    loadRMAList();
  }, []);

  const loadRMAList = async () => {
    setIsLoadingList(true);
    try {
      // TODO: Replace with actual API call
      // Simulating API call to get list of RMAs
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock RMA list data for Package Received stage
      const mockRMAList: RMASearchResponseDTO[] = [
        {
          rmaNumber: 12345,
          customerName: "Acme Corporation",
          contactEmail: "jane@acme.com",
          productDescription: "Model XYZ-1000 Router",
          issueDescription: "Connectivity issues reported",
          status: "In Transit",
          dateCreated: new Date("2024-01-15"),
          guidId: "mock-guid-1",
        },
        {
          rmaNumber: 12346,
          customerName: "Tech Solutions Ltd",
          contactEmail: "support@techsolutions.com",
          productDescription: "Model ABC-500 Switch",
          issueDescription: "Power supply malfunction",
          status: "Approved",
          dateCreated: new Date("2024-01-18"),
          guidId: "mock-guid-2",
        },
        {
          rmaNumber: 12347,
          customerName: "Global Networks Inc",
          contactEmail: "rma@globalnetworks.com",
          productDescription: "Model DEF-750 Firewall",
          issueDescription: "Configuration reset required",
          status: "In Transit",
          dateCreated: new Date("2024-01-20"),
          guidId: "mock-guid-3",
        },
      ];

      setRmaList(mockRMAList);
    } catch (error) {
      toast.error("Failed to load RMA list");
    } finally {
      setIsLoadingList(false);
    }
  };

  const handleSelectRMA = (rma: RMASearchResponseDTO) => {
    setSelectedRMA(rma);
    setFormData((prev) => ({
      ...prev,
      rMANumber: rma.rmaNumber,
    }));
    // Clear RMA number error when an RMA is selected
    setErrors((prev) => ({ ...prev, rMANumber: undefined }));
    toast.success(`RMA #${rma.rmaNumber} selected for package received recording`);
  };

  const handleFieldChange =
    (field: keyof PackageReceivedEventCreateRequestDTO) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;

      if (field === "rMANumber") {
        const numValue = parseInt(value) || 0;
        setFormData((prev) => ({ ...prev, [field]: numValue }));
      } else {
        setFormData((prev) => ({ ...prev, [field]: value }));
      }

      // Clear error when user starts typing (only for fields that have validation)
      if (field === "rMANumber" || field === "timeStamp" || field === "notes") {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value ? new Date(event.target.value) : new Date();
    setFormData((prev) => ({ ...prev, timeStamp: date }));
  };

  const validateForm = (): boolean => {
    const newErrors: PackageReceivedFormErrors = {};

    if (!formData.rMANumber || formData.rMANumber <= 0) {
      newErrors.rMANumber = "RMA Number is required and must be greater than 0";
    }

    if (!formData.notes || formData.notes.trim().length === 0) {
      newErrors.notes = "Notes are required";
    } else if (formData.notes.trim().length < 5) {
      newErrors.notes = "Notes must be at least 5 characters long";
    }

    if (!formData.timeStamp) {
      newErrors.timeStamp = "Timestamp is required";
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
      await createPackageReceivedMutation.mutateAsync(formData);
      console.log("Package received event created successfully:", formData);
      toast.success("Package received event recorded successfully!");

      // Reset form after successful submission
      setFormData({
        rMANumber: 0,
        //userName: "",
        timeStamp: new Date(),
        notes: "",
        //guidId: "",
      });
      setErrors({});
      setSelectedRMA(null);
    } catch (error) {
      console.error("Error creating package received event:", error);
      toast.error("Failed to record package received event");
    }
  };

  return (
    <Box sx={{ maxWidth: 1600, margin: "0 auto", padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: "center" }}>
          Record when a package has been received for an RMA request.
        </Typography>

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

          {/* Right Side - Package Received Form */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {/* Package Information Section */}
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Package Information
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
                        label="Timestamp *"
                        type="datetime-local"
                        value={formData.timeStamp ? formData.timeStamp.toISOString().slice(0, 16) : ""}
                        onChange={handleDateChange}
                        error={Boolean(errors.timeStamp)}
                        helperText={errors.timeStamp || "When the package was received"}
                        InputLabelProps={{ shrink: true }}
                      />

                      <TextField
                        fullWidth
                        label="Notes *"
                        multiline
                        rows={4}
                        value={formData.notes || ""}
                        onChange={handleFieldChange("notes")}
                        error={Boolean(errors.notes)}
                        helperText={errors.notes || "Details about the package received (condition, contents, etc.)"}
                        placeholder="Describe the package condition, contents, and any relevant details..."
                      />
                    </Stack>
                  </CardContent>
                </Card>

                {/* Status Information */}
                {createPackageReceivedMutation.isError && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    Failed to record package received event. Please try again.
                  </Alert>
                )}

                {createPackageReceivedMutation.isSuccess && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    Package received event has been recorded successfully!
                  </Alert>
                )}

                {/* Action Buttons */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                    disabled={createPackageReceivedMutation.isPending}
                    sx={{ minWidth: 140 }}
                  >
                    {createPackageReceivedMutation.isPending ? "Recording..." : "Record Event"}
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

export default PackageReceived;
