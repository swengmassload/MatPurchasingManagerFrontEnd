import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Paper,
  Stack,
} from "@mui/material";
import { RMACreateRequestDTO } from "../../../Models/RMAManagerModels/Dto";
import { useCreateRMA } from "../../../Hooks/useCreateRMA";
import toast from "react-hot-toast";

// Status options
const statusOptions = ["New", "In Progress", "Pending Parts", "Under Review", "Completed", "Cancelled", "On Hold"];

const CreateRMAForm: React.FC = () => {
  const createRMAMutation = useCreateRMA();
  const [formData, setFormData] = useState<RMACreateRequestDTO>({
    rMANumber: undefined,
    customerEmail: "",
    dateIssued: new Date(),
    dateRecieved: undefined,
    rMAProblemDescription: "",
    status: "New",
    salesPerson: "",
    companyName: "",
    contactName: "",
    city: "",
    province: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
    faxNumber: "",
    notes: "",
    guidId: undefined,
  });

  const [errors, setErrors] = useState<Partial<RMACreateRequestDTO>>({});

  const handleChange =
    (field: keyof RMACreateRequestDTO) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
      const value = event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const validateForm = (): boolean => {
    const newErrors: Partial<RMACreateRequestDTO> = {};

    if (!formData.customerEmail) {
      newErrors.customerEmail = "Customer email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Invalid email format";
    }

    if (!formData.rMAProblemDescription) {
      newErrors.rMAProblemDescription = "Problem description is required";
    } else if (formData.rMAProblemDescription.length < 10) {
      newErrors.rMAProblemDescription = "Problem description must be at least 10 characters";
    }

    if (!formData.companyName) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.contactName) {
      newErrors.contactName = "Contact name is required";
    }

    if (!formData.salesPerson) {
      newErrors.salesPerson = "Sales person is required";
    }

    if (formData.phoneNumber && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format";
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
      await createRMAMutation.mutateAsync(formData);

      // Reset form after successful submission
      setFormData({
        rMANumber: undefined,
        customerEmail: "",
        dateIssued: new Date(),
        dateRecieved: undefined,
        rMAProblemDescription: "",
        status: "New",
        salesPerson: "",
        companyName: "",
        contactName: "",
        city: "",
        province: "",
        zipCode: "",
        country: "",
        phoneNumber: "",
        faxNumber: "",
        notes: "",
        guidId: undefined,
      });
      setErrors({});
    } catch (error) {
      // Error handling is done in the mutation
      console.error("Error in handleSubmit:", error);
    }
  };

  const handleReset = () => {
    setFormData({
      rMANumber: undefined,
      customerEmail: "",
      dateIssued: new Date(),
      dateRecieved: undefined,
      rMAProblemDescription: "",
      status: "New",
      salesPerson: "",
      companyName: "",
      contactName: "",
      city: "",
      province: "",
      zipCode: "",
      country: "",
      phoneNumber: "",
      faxNumber: "",
      notes: "",
      guidId: undefined,
    });
    setErrors({});
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New RMA
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Fill out the form below to create a new Return Merchandise Authorization (RMA).
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Customer Information Section */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Customer Information
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Stack spacing={2}>
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <TextField
                      sx={{ flex: 1, minWidth: 250 }}
                      label="Customer Email *"
                      type="email"
                      value={formData.customerEmail}
                      onChange={handleChange("customerEmail")}
                      error={Boolean(errors.customerEmail)}
                      helperText={errors.customerEmail}
                    />

                    <TextField
                      sx={{ flex: 1, minWidth: 250 }}
                      label="Company Name *"
                      value={formData.companyName}
                      onChange={handleChange("companyName")}
                      error={Boolean(errors.companyName)}
                      helperText={errors.companyName}
                    />
                  </Box>

                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <TextField
                      sx={{ flex: 1, minWidth: 250 }}
                      label="Contact Name *"
                      value={formData.contactName}
                      onChange={handleChange("contactName")}
                      error={Boolean(errors.contactName)}
                      helperText={errors.contactName}
                    />

                    <TextField
                      sx={{ flex: 1, minWidth: 250 }}
                      label="Sales Person *"
                      value={formData.salesPerson}
                      onChange={handleChange("salesPerson")}
                      error={Boolean(errors.salesPerson)}
                      helperText={errors.salesPerson}
                    />
                  </Box>

                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <TextField
                      sx={{ flex: 1, minWidth: 250 }}
                      label="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleChange("phoneNumber")}
                      error={Boolean(errors.phoneNumber)}
                      helperText={errors.phoneNumber}
                    />

                    <TextField
                      sx={{ flex: 1, minWidth: 250 }}
                      label="Fax Number"
                      value={formData.faxNumber}
                      onChange={handleChange("faxNumber")}
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Address Information Section */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Address Information
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Stack spacing={2}>
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <TextField
                      sx={{ flex: 1, minWidth: 250 }}
                      label="City"
                      value={formData.city}
                      onChange={handleChange("city")}
                    />

                    <TextField
                      sx={{ flex: 1, minWidth: 250 }}
                      label="Province/State"
                      value={formData.province}
                      onChange={handleChange("province")}
                    />
                  </Box>

                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <TextField
                      sx={{ flex: 1, minWidth: 250 }}
                      label="Zip/Postal Code"
                      value={formData.zipCode}
                      onChange={handleChange("zipCode")}
                    />

                    <TextField
                      sx={{ flex: 1, minWidth: 250 }}
                      label="Country"
                      value={formData.country}
                      onChange={handleChange("country")}
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* RMA Details Section */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  RMA Details
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Stack spacing={2}>
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <TextField
                      sx={{ flex: 1, minWidth: 250 }}
                      label="RMA Number"
                      type="number"
                      value={formData.rMANumber || ""}
                      onChange={handleChange("rMANumber")}
                      helperText="Leave blank for auto-generation"
                    />

                    <FormControl sx={{ flex: 1, minWidth: 250 }}>
                      <InputLabel>Status</InputLabel>
                      <Select value={formData.status || ""} onChange={handleChange("status")} label="Status">
                        {statusOptions.map((status) => (
                          <MenuItem key={status} value={status}>
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <TextField
                      sx={{ flex: 1, minWidth: 250 }}
                      label="Date Issued"
                      type="date"
                      value={formData.dateIssued ? formData.dateIssued.toISOString().split("T")[0] : ""}
                      onChange={(e) => {
                        const date = e.target.value ? new Date(e.target.value) : undefined;
                        setFormData((prev) => ({ ...prev, dateIssued: date }));
                      }}
                      InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                      sx={{ flex: 1, minWidth: 250 }}
                      label="Date Received"
                      type="date"
                      value={formData.dateRecieved ? formData.dateRecieved.toISOString().split("T")[0] : ""}
                      onChange={(e) => {
                        const date = e.target.value ? new Date(e.target.value) : undefined;
                        setFormData((prev) => ({ ...prev, dateRecieved: date }));
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>

                  <TextField
                    fullWidth
                    label="Problem Description *"
                    multiline
                    rows={4}
                    value={formData.rMAProblemDescription}
                    onChange={handleChange("rMAProblemDescription")}
                    error={Boolean(errors.rMAProblemDescription)}
                    helperText={errors.rMAProblemDescription}
                  />

                  <TextField
                    fullWidth
                    label="Additional Notes"
                    multiline
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange("notes")}
                    helperText="Any additional information or special instructions"
                  />
                </Stack>
              </CardContent>
            </Card>

            {/* Submit Section */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button type="button" variant="outlined" onClick={handleReset} disabled={createRMAMutation.isPending}>
                Reset Form
              </Button>
              <Button type="submit" variant="contained" disabled={createRMAMutation.isPending} sx={{ minWidth: 120 }}>
                {createRMAMutation.isPending ? "Creating..." : "Create RMA"}
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateRMAForm;
