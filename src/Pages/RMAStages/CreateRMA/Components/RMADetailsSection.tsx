import React from "react";
import { Box, Card, CardContent, Typography, TextField, Divider, Stack } from "@mui/material";
import { RMACreateRequestDTO } from "../../../../Models/RMAManagerModels/Dto";

interface RMADetailsSectionProps {
  formData: RMACreateRequestDTO;
  errors: Partial<RMACreateRequestDTO>;
  onFieldChange: (
    field: keyof RMACreateRequestDTO
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => void;
  onDateChange: (field: "dateIssued" | "dateReceived") => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RMADetailsSection: React.FC<RMADetailsSectionProps> = ({ formData, errors, onFieldChange, onDateChange }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          RMA Details
        </Typography>
        <Divider sx={{ mb: 1 }} />

        <Stack spacing={2}>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              sx={{ flex: 1, minWidth: 250 }}
              label="Date Issued"
              type="date"
              value={formData.dateIssued ? formData.dateIssued.toISOString().split("T")[0] : ""}
              onChange={onDateChange("dateIssued")}
              InputLabelProps={{ shrink: true }}
            />

            {/* <TextField
              sx={{ flex: 1, minWidth: 250 }}
              label="Date Received"
              type="date"
              value={formData.dateReceived ? formData.dateReceived.toISOString().split("T")[0] : ""}
              onChange={onDateChange("dateReceived")}
              InputLabelProps={{ shrink: true }}
            /> */}
          </Box>

          <TextField
            fullWidth
            label="Problem Description *"
            multiline
            rows={4}
            value={formData.rMAProblemDescription}
            onChange={onFieldChange("rMAProblemDescription")}
            error={Boolean(errors.rMAProblemDescription)}
            helperText={errors.rMAProblemDescription }
            placeholder="Describe the problem in less than 400 characters"
          />



          <TextField
            fullWidth
            label="Additional Notes"
            multiline
            rows={3}
            value={formData.notes}
            onChange={onFieldChange("notes")}
            error={Boolean(errors.notes) }
            helperText={errors.notes}
              placeholder="Any Additional Notes in less than 300 characters..."
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RMADetailsSection;
