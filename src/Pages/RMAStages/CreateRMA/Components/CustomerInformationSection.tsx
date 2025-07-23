import React from "react";
import { Box, Card, CardContent, Typography, TextField, Divider, Stack } from "@mui/material";
import { RMACreateRequestDTO } from "../../../../Models/RMAManagerModels/Dto";

interface CustomerInformationSectionProps {
  formData: RMACreateRequestDTO;
  errors: Partial<RMACreateRequestDTO>;
  onFieldChange: (
    field: keyof RMACreateRequestDTO
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => void;
}

const CustomerInformationSection: React.FC<CustomerInformationSectionProps> = ({ formData, errors, onFieldChange }) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <div /> {/* Empty div for spacing */}
          <Typography variant="h6" color="primary" sx={{ textAlign: "center" }}>
            Customer Information
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "blue",
              fontWeight: "bold",
              textAlign: "right",
            }}
          >
            RMA NUMBER: {formData.rMANumber || ""}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              sx={{ flex: 1, minWidth: 250 }}
              label="Customer Email *"
              type="email"
              value={formData.customerEmail}
              onChange={onFieldChange("customerEmail")}
              error={Boolean(errors.customerEmail)}
              helperText={errors.customerEmail}
            />

            <TextField
              sx={{ flex: 1, minWidth: 250 }}
              label="Company Name *"
              value={formData.companyName}
              onChange={onFieldChange("companyName")}
              error={Boolean(errors.companyName)}
              helperText={errors.companyName}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              sx={{ flex: 1, minWidth: 250 }}
              label="Contact Name *"
              value={formData.contactName}
              onChange={onFieldChange("contactName")}
              error={Boolean(errors.contactName)}
              helperText={errors.contactName}
            />

            <TextField
              sx={{ flex: 1, minWidth: 250 }}
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={onFieldChange("phoneNumber")}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber}
            />
          </Box>
{/* 
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>


            <TextField
              sx={{ flex: 1, minWidth: 250 }}
              label="Fax Number"
              value={formData.faxNumber}
              onChange={onFieldChange("faxNumber")}
            />
          </Box> */}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CustomerInformationSection;
