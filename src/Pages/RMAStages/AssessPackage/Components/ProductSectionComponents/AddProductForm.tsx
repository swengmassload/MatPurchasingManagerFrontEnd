import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Switch,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import { ProductItemDTO } from "../../../../../Models/RMAManagerModels/Dto";
import { standardInputSx, standardFormControlSx } from "../../../../../Constants/ComponentStyles";
import { useGetIndicatorsModels } from "../../../../../Hooks/useGetIndicatorsModels";

interface AddProductFormProps {
  newProduct: ProductItemDTO;
  setNewProduct: (product: ProductItemDTO) => void;
  validationErrors: any;
  setValidationErrors: (errors: any) => void;
  onAddProduct: () => void;
  onSearchProduct: () => void;
  isSearching: boolean;
  problemTypes: string[];
  solutionTypes: string[];
}

const AddProductForm: React.FC<AddProductFormProps> = ({
  newProduct,
  setNewProduct,
  validationErrors,
  setValidationErrors,
  onAddProduct,
  onSearchProduct,
  isSearching,
  problemTypes,
  solutionTypes,
}) => {
  const productUnits = ["lbs", "kg"];

  const indicatorsRequest = useGetIndicatorsModels();

  const handleClearForm = () => {
    setNewProduct({
      productCapacity: 0,
      productUnit: "",
      serialNo: "",
      modelNo: "",
      indicatorName: "",
      calibrationType: "Tension",
      warrantyCheck: false,
      problemType: "",
      problemNotes: "",
      solutionType: "",
      solutionNotes: "",
      repairsDone: [],
      partsUsed: [],
      productionStage: "",
      pinDiameter: 0,
    });
    setValidationErrors({});
  };

  return (
    <Box
      sx={{
        mb: 4,
        p: 3,
        border: "2px solid #e3f2fd",
        borderRadius: 2,
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <AddIcon sx={{ color: "primary.main", fontSize: 28 }} />
        <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main" }}>
          Add New Product
        </Typography>
      </Box>

      {/* Product Identification Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: "text.secondary" }}>
          🔍 Product Identification
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 2fr 1fr" },
            gap: 3,
            p: 2,
            bgcolor: "white",
            borderRadius: 1,
            border: "1px solid #e0e0e0",
          }}
        >
          <TextField
            label="Serial Number *"
            value={newProduct.serialNo}
            onChange={(e) => setNewProduct({ ...newProduct, serialNo: e.target.value })}
            error={Boolean(validationErrors.serialNo)}
            helperText={validationErrors.serialNo || "Enter serial number for product lookup"}
            variant="outlined"
            fullWidth
            sx={standardInputSx}
          />

          <TextField
            label="Model Number *"
            value={newProduct.modelNo}
            onChange={(e) => setNewProduct({ ...newProduct, modelNo: e.target.value })}
            error={Boolean(validationErrors.modelNo)}
            helperText={validationErrors.modelNo}
            variant="outlined"
            fullWidth
            sx={standardInputSx}
          />

          <Button
            variant="contained"
            startIcon={isSearching ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
            onClick={onSearchProduct}
            disabled={!newProduct.serialNo.trim() || isSearching}
            fullWidth
            sx={{
              height: "56px",
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
            }}
          >
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </Box>
      </Box>

      {/* Product Specifications Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: "text.secondary" }}>
          📋 Product Specifications
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
            gap: 3,
            p: 2,
            bgcolor: "white",
            borderRadius: 1,
            border: "1px solid #e0e0e0",
          }}
        >
          <TextField
            label="Product Capacity *"
            type="number"
            value={newProduct.productCapacity}
            onChange={(e) => setNewProduct({ ...newProduct, productCapacity: Number(e.target.value) })}
            error={Boolean(validationErrors.productCapacity)}
            helperText={validationErrors.productCapacity}
            variant="outlined"
            fullWidth
            sx={standardInputSx}
          />

          <FormControl fullWidth error={Boolean(validationErrors.productUnit)} sx={standardFormControlSx}>
            <InputLabel>Product Unit *</InputLabel>
            <Select
              value={newProduct.productUnit}
              label="Product Unit *"
              onChange={(e) => setNewProduct({ ...newProduct, productUnit: e.target.value })}
            >
              {productUnits.map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </Select>
            {validationErrors.productUnit && <FormHelperText>{validationErrors.productUnit}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth error={Boolean(validationErrors.indicator)} sx={standardFormControlSx}>
            <InputLabel>Indicator *</InputLabel>
            <Select
              value={newProduct.indicatorName}
              label="indicatorName *"
              onChange={(e) => setNewProduct({ ...newProduct, indicatorName: e.target.value })}
            >
              {indicatorsRequest.data &&
                indicatorsRequest.data?.length > 0 &&
                // Filter out existing "Others" indicators and add custom one
                [
                  ...indicatorsRequest.data.filter((indicator) => indicator.name !== "Others"),
                  { guidId: "01993071-8a1d-7dda-910f-7d911e9838e3", indicatorType: "Others", name: "Others" },
                ].map((indicator) => (
                  <MenuItem key={indicator.guidId} value={indicator.name}>
                    {indicator.indicatorType} - {indicator.name}
                  </MenuItem>
                ))}
            </Select>
            {validationErrors.indicator && <FormHelperText>{validationErrors.indicator}</FormHelperText>}
          </FormControl>

          <TextField
            label="Pin Diameter"
            type="number"
            value={newProduct.pinDiameter || ""}
            onChange={(e) => setNewProduct({ ...newProduct, pinDiameter: Number(e.target.value) || undefined })}
            error={Boolean(validationErrors.pinDiameter)}
            helperText={validationErrors.pinDiameter || "Optional specification"}
            variant="outlined"
            fullWidth
            sx={standardInputSx}
          />
        </Box>
      </Box>

      {/* Product Configuration Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: "text.secondary" }}>
          ⚙️ Product Configuration
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
            p: 2,
            bgcolor: "white",
            borderRadius: 1,
            border: "1px solid #e0e0e0",
          }}
        >
          <FormControl fullWidth sx={standardFormControlSx}>
            <InputLabel>Calibration Type</InputLabel>
            <Select
              value={newProduct.calibrationType}
              label="Calibration Type"
              onChange={(e) =>
                setNewProduct({ ...newProduct, calibrationType: e.target.value as "Tension" | "Compression" })
              }
            >
              <MenuItem value="Tension">Tension</MenuItem>
              <MenuItem value="Compression">Compression</MenuItem>
            </Select>
          </FormControl>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
              border: "1px dashed #ccc",
              borderRadius: 1,
              bgcolor: "#fafafa",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={newProduct.warrantyCheck}
                  onChange={(e) => setNewProduct({ ...newProduct, warrantyCheck: e.target.checked })}
                  color="primary"
                  size="medium"
                />
              }
              label={
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Warranty Coverage
                </Typography>
              }
            />
          </Box>
        </Box>
      </Box>

      {/* Problem Analysis Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: "text.secondary" }}>
          🔧 Problem Analysis
        </Typography>
        <Box
          sx={{
            p: 2,
            bgcolor: "white",
            borderRadius: 1,
            border: "1px solid #e0e0e0",
          }}
        >
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" }, gap: 3, mb: 2 }}>
            <FormControl fullWidth error={Boolean(validationErrors.problemType)} sx={standardFormControlSx}>
              <InputLabel>Problem Type *</InputLabel>
              <Select
                value={newProduct.problemType}
                label="Problem Type *"
                onChange={(e) => setNewProduct({ ...newProduct, problemType: e.target.value })}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {problemTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {validationErrors.problemType && <FormHelperText>{validationErrors.problemType}</FormHelperText>}
            </FormControl>

            <TextField
              label="Problem Description *"
              value={newProduct.problemNotes}
              onChange={(e) => setNewProduct({ ...newProduct, problemNotes: e.target.value })}
              error={Boolean(validationErrors.problemNotes)}
              helperText={validationErrors.problemNotes || "Describe the issue in detail (Max  400 characters)"}
              rows={3}
              variant="outlined"
              fullWidth
              sx={standardInputSx}
            />
          </Box>
        </Box>
      </Box>

      {/* Solution Planning Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: "text.secondary" }}>
          💡 Solution Planning
        </Typography>
        <Box
          sx={{
            p: 2,
            bgcolor: "white",
            borderRadius: 1,
            border: "1px solid #e0e0e0",
          }}
        >
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" }, gap: 3 }}>
            <FormControl fullWidth error={Boolean(validationErrors.solutionType)} sx={standardFormControlSx}>
              <InputLabel>Solution Type</InputLabel>
              <Select
                value={newProduct.solutionType}
                label="Solution Type"
                onChange={(e) => setNewProduct({ ...newProduct, solutionType: e.target.value })}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {solutionTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {validationErrors.solutionType && <FormHelperText>{validationErrors.solutionType}</FormHelperText>}
            </FormControl>

            <TextField
              label="Solution Notes"
              value={newProduct.solutionNotes}
              onChange={(e) => setNewProduct({ ...newProduct, solutionNotes: e.target.value })}
              rows={3}
              variant="outlined"
              fullWidth
              error={Boolean(validationErrors.solutionNotes)}
              helperText={
                validationErrors.solutionNotes || "Optional:Describe the planned solution (Max  400 characters)"
              }
              sx={standardInputSx}
            />
          </Box>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "flex-end",
          pt: 2,
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Button variant="outlined" color="secondary" onClick={handleClearForm} sx={{ minWidth: 120 }}>
          Clear Form
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddProduct}
          sx={{
            minWidth: 150,
            background: "linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)",
            boxShadow: "0 3px 5px 2px rgba(76, 175, 80, .3)",
            "&:hover": {
              background: "linear-gradient(45deg, #388E3C 30%, #689F38 90%)",
            },
          }}
        >
          Add Product
        </Button>
      </Box>
    </Box>
  );
};

export default AddProductForm;
