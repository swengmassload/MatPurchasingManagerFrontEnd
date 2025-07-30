import React from "react";
import { Box, Card, CardContent, Typography, TextField, Divider, Stack } from "@mui/material";
import { RMACreateRequestDTO } from "../../../../Models/RMAManagerModels/Dto";

interface AddressInformationSectionProps {
  formData: RMACreateRequestDTO;
  onFieldChange: (
    field: keyof RMACreateRequestDTO
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => void;
}

const AddressInformationSection: React.FC<AddressInformationSectionProps> = ({ formData, onFieldChange }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          Address Information
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Street Address"
            value={formData.street || ""}
            onChange={onFieldChange("street")}
            helperText="Enter the complete street address"
          />

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              sx={{ flex: 1, minWidth: 250 }}
              label="City"
              value={formData.city || ""}
              onChange={onFieldChange("city")}
            />

            <TextField
              sx={{ flex: 1, minWidth: 250 }}
              label="Province/State"
              value={formData.province || ""}
              onChange={onFieldChange("province")}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              sx={{ flex: 1, minWidth: 250 }}
              label="Zip/Postal Code"
              value={formData.zipCode || ""}
              onChange={onFieldChange("zipCode")}
            />

            <TextField
              sx={{ flex: 1, minWidth: 250 }}
              label="Country"
              value={formData.country || ""}
              onChange={onFieldChange("country")}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AddressInformationSection;
