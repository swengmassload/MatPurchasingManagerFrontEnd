import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
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

import  DeleteIcon from "@mui/icons-material/Delete";
import  BuildIcon  from "@mui/icons-material/Build";
import   InventoryIcon  from "@mui/icons-material/Inventory";
import AddIcon  from "@mui/icons-material/Add";






import { ProductItemDTO, RepairItemDTO, PartItemDTO } from "../../../../../Models/RMAManagerModels/Dto";
import { standardInputSx } from "../../../../../Constants/ComponentStyles";

interface ProductDetailsPanelProps {
  product: ProductItemDTO;
  productIndex: number;
  onAddRepair: (productIndex: number, repair: RepairItemDTO) => void;
  onDeleteRepair: (productIndex: number, repairIndex: number) => void;
  onAddPart: (productIndex: number, part: PartItemDTO) => void;
  onDeletePart: (productIndex: number, partIndex: number) => void;
}

const ProductDetailsPanel: React.FC<ProductDetailsPanelProps> = ({
  product,
  productIndex,
  onAddRepair,
  onDeleteRepair,
  onAddPart,
  onDeletePart,
}) => {
  const [newRepair, setNewRepair] = useState<RepairItemDTO>({
    repairItemId: 0,
    description: "",
    date: new Date(),
    hoursUsed: 0,
  });

  const [newPart, setNewPart] = useState<PartItemDTO>({
    partItemId: 0,
    description: "",
    quantity: 1,
  });

  const [repairErrors, setRepairErrors] = useState<{
    description?: string;
    hoursUsed?: string;
  }>({});

  const [partErrors, setPartErrors] = useState<{
    description?: string;
    quantity?: string;
  }>({});

  const validateRepair = (): boolean => {
    const errors: typeof repairErrors = {};
    if (!newRepair.description.trim()) {
      errors.description = "Description is required";
    }
    if (newRepair.hoursUsed <= 0) {
      errors.hoursUsed = "Hours must be greater than 0";
    }
    setRepairErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePart = (): boolean => {
    const errors: typeof partErrors = {};
    if (!newPart.description.trim()) {
      errors.description = "Description is required";
    }
    if (newPart.quantity <= 0) {
      errors.quantity = "Quantity must be greater than 0";
    }
    setPartErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddRepairClick = () => {
    if (validateRepair()) {
      onAddRepair(productIndex, { ...newRepair });
      setNewRepair({
        repairItemId: 0,
        description: "",
        date: new Date(),
        hoursUsed: 0,
      });
      setRepairErrors({});
    }
  };

  const handleAddPartClick = () => {
    if (validatePart()) {
      onAddPart(productIndex, { ...newPart });
      setNewPart({
        partItemId: 0,
        description: "",
        quantity: 1,
      });
      setPartErrors({});
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      {/* Product Basic Info */}
      <Box sx={{ mb: 3, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
        <Typography variant="subtitle2" gutterBottom>
          Product Details
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Serial Number:
            </Typography>
            <Typography variant="body1">{product.serialNo}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Indicator:
            </Typography>
            <Typography variant="body1">{product.indicatorName || "Not specified"}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Problem Type:
            </Typography>
            <Typography variant="body1">{product.problemType}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Solution Type:
            </Typography>
            <Typography variant="body1">{product.solutionType}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Repairs Done Section */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <BuildIcon />
          <Typography variant="h6">Repairs Done</Typography>
        </Box>

        {/* Add Repair Form */}
        <Box sx={{ mb: 2, p: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Add Repair
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2, alignItems: "flex-start" }}>
            <TextField
              label="Repair Description *"
              value={newRepair.description}
              onChange={(e) => setNewRepair({ ...newRepair, description: e.target.value })}
              error={Boolean(repairErrors.description)}
              helperText={repairErrors.description}
              sx={{
                flex: 2,
                minWidth: 300,
                ...standardInputSx,
              }}
            />
            <TextField
              label="Date"
              type="date"
              value={newRepair.date.toISOString().split("T")[0]}
              onChange={(e) => setNewRepair({ ...newRepair, date: new Date(e.target.value) })}
              InputLabelProps={{ shrink: true }}
              sx={{
                flex: 1,
                minWidth: 180,
                ...standardInputSx,
              }}
            />
            <TextField
              label="Hours Used *"
              type="number"
              value={newRepair.hoursUsed || ""}
              onChange={(e) => setNewRepair({ ...newRepair, hoursUsed: parseFloat(e.target.value) || 0 })}
              error={Boolean(repairErrors.hoursUsed)}
              helperText={repairErrors.hoursUsed}
              inputProps={{ min: 0, step: 0.25 }}
              sx={{
                flex: 1,
                minWidth: 150,
                ...standardInputSx,
              }}
            />
          </Box>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddRepairClick} size="small">
            Add Repair
          </Button>
        </Box>

        {/* Repairs Table */}
        {product.repairsDone.length > 0 ? (
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
                {product.repairsDone.map((repair, repairIndex) => (
                  <TableRow key={repairIndex}>
                    <TableCell>{repair.description}</TableCell>
                    <TableCell>{new Date(repair.date).toLocaleDateString()}</TableCell>
                    <TableCell>{repair.hoursUsed} hrs</TableCell>
                    <TableCell>
                      <IconButton color="error" size="small" onClick={() => onDeleteRepair(productIndex, repairIndex)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Alert severity="info">No repairs added for this product.</Alert>
        )}
      </Box>

      {/* Parts Used Section */}
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <InventoryIcon />
          <Typography variant="h6">Parts Used</Typography>
        </Box>

        {/* Add Part Form */}
        <Box sx={{ mb: 2, p: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Add Part
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2, alignItems: "flex-start" }}>
            <TextField
              label="Part Description *"
              value={newPart.description}
              onChange={(e) => setNewPart({ ...newPart, description: e.target.value })}
              error={Boolean(partErrors.description)}
              helperText={partErrors.description}
              sx={{
                flex: 3,
                minWidth: 300,
                ...standardInputSx,
              }}
            />
            <TextField
              label="Quantity *"
              type="number"
              value={newPart.quantity || ""}
              onChange={(e) => setNewPart({ ...newPart, quantity: parseInt(e.target.value) || 1 })}
              error={Boolean(partErrors.quantity)}
              helperText={partErrors.quantity}
              inputProps={{ min: 1 }}
              sx={{
                flex: 1,
                minWidth: 150,
                ...standardInputSx,
              }}
            />
          </Box>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddPartClick} size="small">
            Add Part
          </Button>
        </Box>

        {/* Parts Table */}
        {product.partsUsed.length > 0 ? (
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Description</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Quantity</strong>
                  </TableCell>
                  <TableCell width={50}>
                    <strong>Action</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {product.partsUsed.map((part, partIndex) => (
                  <TableRow key={partIndex}>
                    <TableCell>{part.description}</TableCell>
                    <TableCell>{part.quantity}</TableCell>
                    <TableCell>
                      <IconButton color="error" size="small" onClick={() => onDeletePart(productIndex, partIndex)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Alert severity="info">No parts added for this product.</Alert>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetailsPanel;
