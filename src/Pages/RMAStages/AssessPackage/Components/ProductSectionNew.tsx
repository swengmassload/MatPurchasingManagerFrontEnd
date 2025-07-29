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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import { Add, Delete, ExpandMore, Build, Inventory } from "@mui/icons-material";
import { ProductItemDTO, RepairItemDTO, PartItemDTO } from "../../../../Models/RMAManagerModels/Dto";

interface ProductSectionProps {
  products: ProductItemDTO[];
  onProductsChange: (products: ProductItemDTO[]) => void;
  error?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({ products, onProductsChange, error }) => {
  const [newProduct, setNewProduct] = useState<ProductItemDTO>({
    productCapacity: "",
    productUnit: "",
    serialNo: "",
    modelNo: "",
    calibrationType: "Tension",
    solutionNotes: "",
    solutionType: "",
    warrantyCheck: false,
    repairsDone: [],
    partsUsed: [],
  });

  const [validationErrors, setValidationErrors] = useState<{
    productCapacity?: string;
    productUnit?: string;
    serialNo?: string;
    modelNo?: string;
  }>({});

  // Common units for product capacity
  const productUnits = ["lbs", "kg", "N", "kN", "tons", "grams", "ounces", "pounds"];

  const validateNewProduct = (): boolean => {
    const errors: typeof validationErrors = {};

    if (!newProduct.productCapacity.trim()) {
      errors.productCapacity = "Product capacity is required";
    }

    if (!newProduct.productUnit.trim()) {
      errors.productUnit = "Product unit is required";
    }

    if (!newProduct.serialNo.trim()) {
      errors.serialNo = "Serial number is required";
    }

    if (!newProduct.modelNo.trim()) {
      errors.modelNo = "Model number is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddProduct = () => {
    if (validateNewProduct()) {
      onProductsChange([...products, { ...newProduct }]);
      setNewProduct({
        productCapacity: "",
        productUnit: "",
        serialNo: "",
        modelNo: "",
        calibrationType: "Tension",
        solutionNotes: "",
        solutionType: "",
        warrantyCheck: false,
        repairsDone: [],
        partsUsed: [],
      });
      setValidationErrors({});
    }
  };

  const handleDeleteProduct = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    onProductsChange(updatedProducts);
  };

  const handleUpdateProduct = (index: number, updatedProduct: ProductItemDTO) => {
    const updatedProducts = [...products];
    updatedProducts[index] = updatedProduct;
    onProductsChange(updatedProducts);
  };

  const handleAddRepair = (productIndex: number, repair: RepairItemDTO) => {
    const updatedProduct = { ...products[productIndex] };
    updatedProduct.repairsDone = [...updatedProduct.repairsDone, repair];
    handleUpdateProduct(productIndex, updatedProduct);
  };

  const handleDeleteRepair = (productIndex: number, repairIndex: number) => {
    const updatedProduct = { ...products[productIndex] };
    updatedProduct.repairsDone = updatedProduct.repairsDone.filter((_, i) => i !== repairIndex);
    handleUpdateProduct(productIndex, updatedProduct);
  };

  const handleAddPart = (productIndex: number, part: PartItemDTO) => {
    const updatedProduct = { ...products[productIndex] };
    updatedProduct.partsUsed = [...updatedProduct.partsUsed, part];
    handleUpdateProduct(productIndex, updatedProduct);
  };

  const handleDeletePart = (productIndex: number, partIndex: number) => {
    const updatedProduct = { ...products[productIndex] };
    updatedProduct.partsUsed = updatedProduct.partsUsed.filter((_, i) => i !== partIndex);
    handleUpdateProduct(productIndex, updatedProduct);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          Products
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* Add New Product Form */}
        <Box sx={{ mb: 3, p: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Add New Product
          </Typography>

          {/* First Row */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
            <TextField
              label="Product Capacity *"
              value={newProduct.productCapacity}
              onChange={(e) => setNewProduct({ ...newProduct, productCapacity: e.target.value })}
              error={Boolean(validationErrors.productCapacity)}
              helperText={validationErrors.productCapacity}
              sx={{ flex: 1, minWidth: 150 }}
            />

            <FormControl sx={{ flex: 1, minWidth: 120 }} error={Boolean(validationErrors.productUnit)}>
              <InputLabel id="product-unit-select-label">Product Unit *</InputLabel>
              <Select
                labelId="product-unit-select-label"
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

            <TextField
              label="Serial No *"
              value={newProduct.serialNo}
              onChange={(e) => setNewProduct({ ...newProduct, serialNo: e.target.value })}
              error={Boolean(validationErrors.serialNo)}
              helperText={validationErrors.serialNo}
              sx={{ flex: 1, minWidth: 150 }}
            />
          </Box>

          {/* Second Row */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
            <TextField
              label="Model No *"
              value={newProduct.modelNo}
              onChange={(e) => setNewProduct({ ...newProduct, modelNo: e.target.value })}
              error={Boolean(validationErrors.modelNo)}
              helperText={validationErrors.modelNo}
              sx={{ flex: 1, minWidth: 150 }}
            />

            <FormControl sx={{ flex: 1, minWidth: 150 }}>
              <InputLabel id="calibration-type-select-label">Calibration Type</InputLabel>
              <Select
                labelId="calibration-type-select-label"
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

            <Box sx={{ flex: 1, minWidth: 150, display: "flex", alignItems: "center" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={newProduct.warrantyCheck}
                    onChange={(e) => setNewProduct({ ...newProduct, warrantyCheck: e.target.checked })}
                    color="primary"
                  />
                }
                label="Warranty Check"
              />
            </Box>
          </Box>

          <Button variant="contained" startIcon={<Add />} onClick={handleAddProduct} size="small">
            Add Product
          </Button>
        </Box>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Products List with Accordion */}
        {products.length > 0 ? (
          <Box>
            {products.map((product, productIndex) => (
              <Accordion key={productIndex} sx={{ mb: 2 }}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls={`product-${productIndex}-content`}
                  id={`product-${productIndex}-header`}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
                    <Typography variant="h6">
                      Product {productIndex + 1}: {product.modelNo}
                    </Typography>
                    <Chip
                      label={`${product.productCapacity} ${product.productUnit}`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Chip label={product.calibrationType} size="small" color="secondary" variant="outlined" />
                    <Chip
                      label={product.warrantyCheck ? "Warranty: Yes" : "Warranty: No"}
                      size="small"
                      color={product.warrantyCheck ? "success" : "default"}
                      variant="outlined"
                    />
                    <IconButton
                      color="error"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProduct(productIndex);
                      }}
                      sx={{ ml: "auto" }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <ProductDetailsPanel
                    product={product}
                    productIndex={productIndex}
                    onAddRepair={handleAddRepair}
                    onDeleteRepair={handleDeleteRepair}
                    onAddPart={handleAddPart}
                    onDeletePart={handleDeletePart}
                  />
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        ) : (
          <Alert severity="info">No products added yet. Please add at least one product.</Alert>
        )}
      </CardContent>
    </Card>
  );
};

// Product Details Panel Component
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
    description: "",
    date: new Date(),
    hoursUsed: 0,
  });

  const [newPart, setNewPart] = useState<PartItemDTO>({
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
              Serial No:
            </Typography>
            <Typography variant="body1">{product.serialNo}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Model:
            </Typography>
            <Typography variant="body1">{product.modelNo}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Capacity:
            </Typography>
            <Typography variant="body1">
              {product.productCapacity} {product.productUnit}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Calibration:
            </Typography>
            <Typography variant="body1">{product.calibrationType}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Repairs Done Section */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Build />
          <Typography variant="h6">Repairs Done</Typography>
        </Box>

        {/* Add Repair Form */}
        <Box sx={{ mb: 2, p: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Add Repair
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
            <TextField
              label="Repair Description *"
              value={newRepair.description}
              onChange={(e) => setNewRepair({ ...newRepair, description: e.target.value })}
              error={Boolean(repairErrors.description)}
              helperText={repairErrors.description}
              sx={{ flex: 2, minWidth: 200 }}
            />
            <TextField
              label="Date"
              type="date"
              value={newRepair.date.toISOString().split("T")[0]}
              onChange={(e) => setNewRepair({ ...newRepair, date: new Date(e.target.value) })}
              InputLabelProps={{ shrink: true }}
              sx={{ flex: 1, minWidth: 150 }}
            />
            <TextField
              label="Hours Used *"
              type="number"
              value={newRepair.hoursUsed || ""}
              onChange={(e) => setNewRepair({ ...newRepair, hoursUsed: parseFloat(e.target.value) || 0 })}
              error={Boolean(repairErrors.hoursUsed)}
              helperText={repairErrors.hoursUsed}
              inputProps={{ min: 0, step: 0.25 }}
              sx={{ flex: 1, minWidth: 120 }}
            />
          </Box>
          <Button variant="outlined" startIcon={<Add />} onClick={handleAddRepairClick} size="small">
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
                        <Delete />
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
          <Inventory />
          <Typography variant="h6">Parts Used</Typography>
        </Box>

        {/* Add Part Form */}
        <Box sx={{ mb: 2, p: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Add Part
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
            <TextField
              label="Part Description *"
              value={newPart.description}
              onChange={(e) => setNewPart({ ...newPart, description: e.target.value })}
              error={Boolean(partErrors.description)}
              helperText={partErrors.description}
              sx={{ flex: 2, minWidth: 200 }}
            />
            <TextField
              label="Quantity *"
              type="number"
              value={newPart.quantity || ""}
              onChange={(e) => setNewPart({ ...newPart, quantity: parseInt(e.target.value) || 1 })}
              error={Boolean(partErrors.quantity)}
              helperText={partErrors.quantity}
              inputProps={{ min: 1 }}
              sx={{ flex: 1, minWidth: 120 }}
            />
          </Box>
          <Button variant="outlined" startIcon={<Add />} onClick={handleAddPartClick} size="small">
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
                        <Delete />
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

export default ProductSection;
