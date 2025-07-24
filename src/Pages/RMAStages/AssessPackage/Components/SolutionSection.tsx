import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

interface SolutionSectionProps {
  solutionType: string;
  solutionNotes: string;
  onSolutionTypeChange: (value: string) => void;
  onSolutionNotesChange: (value: string) => void;
  errors: {
    solutionType?: string;
    solutionNotes?: string;
  };
}

const SolutionSection: React.FC<SolutionSectionProps> = ({
  solutionType,
  solutionNotes,
  onSolutionTypeChange,
  onSolutionNotesChange,
  errors,
}) => {
  // Mock solution types - these would come from an API
  const solutionTypes = [
    "Replace Component",
    "Repair Existing Component",
    "Software Update",
    "Firmware Update",
    "Complete Unit Replacement",
    "No Fault Found",
    "Customer Error",
    "Return as Defective",
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          Solution Details
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Solution Type */}
          <FormControl fullWidth error={Boolean(errors.solutionType)}>
            <InputLabel>Solution Type *</InputLabel>
            <Select value={solutionType} onChange={(e) => onSolutionTypeChange(e.target.value)} label="Solution Type *">
              {solutionTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            {errors.solutionType && (
              <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                {errors.solutionType}
              </Typography>
            )}
          </FormControl>

          {/* Solution Notes */}
          <TextField
            fullWidth
            label="Solution Notes *"
            multiline
            rows={4}
            value={solutionNotes}
            onChange={(e) => onSolutionNotesChange(e.target.value)}
            error={Boolean(errors.solutionNotes)}
            helperText={
              errors.solutionNotes || "Describe the solution implemented, diagnosis results, and any relevant details"
            }
            placeholder="Provide detailed notes about the solution implemented, diagnosis process, testing performed, and any additional observations..."
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SolutionSection;
