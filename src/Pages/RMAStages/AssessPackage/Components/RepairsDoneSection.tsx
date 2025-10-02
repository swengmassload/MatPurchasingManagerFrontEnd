import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Alert,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { RepairItemDTO } from "../../../../Models/RMAManagerModels/Dto";

interface RepairsDoneSectionProps {
  repairsDone: RepairItemDTO[];
  onRepairsDoneChange: (repairs: RepairItemDTO[]) => void;
  error?: string;
}

const RepairsDoneSection: React.FC<RepairsDoneSectionProps> = ({ repairsDone, onRepairsDoneChange, error }) => {
  const [newRepair, setNewRepair] = useState<RepairItemDTO>({
    description: "",
    repairItemId: 0,
    date: new Date(),
    hoursUsed: 0,
  });

  const [validationErrors, setValidationErrors] = useState<{
    description?: string;
    hoursUsed?: string;
  }>({});

  const validateNewRepair = (): boolean => {
    const errors: typeof validationErrors = {};

    if (!newRepair.description.trim()) {
      errors.description = "Description is required";
    }
if (newRepair.description && newRepair.description.trim().length > 400) {
      errors.description = "description must be at most 400 characters long";
    }
    if (newRepair.hoursUsed <= 0) {
      errors.hoursUsed = "Hours must be greater than 0";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddRepair = () => {
    if (validateNewRepair()) {
      onRepairsDoneChange([...repairsDone, { ...newRepair }]);
      setNewRepair({
        repairItemId: 0,
        description: "",
        date: new Date(),
        hoursUsed: 0,
      });
      setValidationErrors({});
    }
  };

  const handleDeleteRepair = (index: number) => {
    const updatedRepairs = repairsDone.filter((_, i) => i !== index);
    onRepairsDoneChange(updatedRepairs);
  };

  const handleDateChange = (dateString: string) => {
    setNewRepair({ ...newRepair, date: new Date(dateString) });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          Repairs Done
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* Add New Repair Form */}
        <Box sx={{ mb: 3, p: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Add New Repair
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
            <TextField
              label="Description *"
              value={newRepair.description}
              onChange={(e) => setNewRepair({ ...newRepair, description: e.target.value })}
              error={Boolean(validationErrors.description)}
              helperText={validationErrors.description}
              sx={{ flex: 2, minWidth: 300 }}
            />

            <TextField
              label="Date"
              type="date"
              value={newRepair.date.toISOString().split("T")[0]}
              onChange={(e) => handleDateChange(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ flex: 1, minWidth: 150 }}
            />

            <TextField
              label="Hours Used *"
              type="number"
              value={newRepair.hoursUsed || ""}
              onChange={(e) => setNewRepair({ ...newRepair, hoursUsed: parseFloat(e.target.value) || 0 })}
              error={Boolean(validationErrors.hoursUsed)}
              helperText={validationErrors.hoursUsed}
              inputProps={{ min: 0, step: 0.25 }}
              sx={{ flex: 1, minWidth: 120 }}
            />
          </Box>

          <Button variant="contained" startIcon={<Add />} onClick={handleAddRepair} size="small">
            Add Repair
          </Button>
        </Box>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Repairs Table */}
        {repairsDone.length > 0 ? (
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Description</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Date</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Hours</strong>
                  </TableCell>
                  <TableCell width={50}>
                    <strong>Action</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {repairsDone.map((repair, index) => (
                  <TableRow key={index}>
                    <TableCell>{repair.description}</TableCell>
                    <TableCell>{new Date(repair.date).toLocaleDateString()}</TableCell>
                    <TableCell>{repair.hoursUsed} hrs</TableCell>
                    <TableCell>
                      <IconButton color="error" size="small" onClick={() => handleDeleteRepair(index)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Alert severity="info">No repairs added yet. Please add at least one repair item.</Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default RepairsDoneSection;
