import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import { Add, Delete, ExpandMore, Build, Inventory, Search } from "@mui/icons-material";
import { ProductItemDTO, RepairItemDTO, PartItemDTO } from "../../../../Models/RMAManagerModels/Dto";
import {
  standardInputSx,
  standardFormControlSx,
 
} from "../../../../Constants/ComponentStyles";
import toast from "react-hot-toast";

interface ProductSectionProps {
  products: ProductItemDTO[];
  onProductsChange: (products: ProductItemDTO[]) => void;
  error?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({ products, onProductsChange, error }) => {
  const [newProduct, setNewProduct] = useState<ProductItemDTO>({
    productCapacity: 0,
    productUnit: "",
    serialNo: "",
    modelNo: "",
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

  const [validationErrors, setValidationErrors] = useState<{
    productCapacity?: string;
    productUnit?: string;
    serialNo?: string;
    modelNo?: string;
    problemType?: string;
    ProblemNotes?: string;
    pinDiameter?: string;
  }>({});

  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Migration mapping for old problem types to new ones
  const problemTypeMigrationMap: Record<string, string> = {
    "Mechanical Damage": "Physical Damage",
    "Electrical Failure": "Hardware Failure",
    "Calibration Issue": "Calibration Error",
    Corrosion: "Environmental Damage",
    Overload: "Physical Damage",
    "Wear and Tear": "Physical Damage",
  };

  // Migration mapping for old solution types to new ones
  const solutionTypeMigrationMap: Record<string, string> = {
    Repair: "Repair Existing Component",
    Replace: "Replace Component",
    Calibrate: "Software Update",
    Clean: "Repair Existing Component",
    "No Action Required": "No Fault Found",
    "Beyond Repair": "Return as Defective",
    Other: "Return as Defective",
  };

  // Migrate existing products with old problem/solution types
  useEffect(() => {
    if (products.length > 0) {
      const migratedProducts = products.map((product) => {
        const migratedProduct = { ...product };

        // Migrate problem type if it's an old value
        if (problemTypeMigrationMap[product.problemType]) {
          migratedProduct.problemType = problemTypeMigrationMap[product.problemType];
        }

        // Migrate solution type if it's an old value
        if (solutionTypeMigrationMap[product.solutionType]) {
          migratedProduct.solutionType = solutionTypeMigrationMap[product.solutionType];
        }

        return migratedProduct;
      });

      // Check if any migration was needed
      const needsMigration = migratedProducts.some(
        (product, index) =>
          product.problemType !== products[index].problemType || product.solutionType !== products[index].solutionType
      );

      if (needsMigration) {
        onProductsChange(migratedProducts);
      }
    }
  }, [products, onProductsChange]);

  // Common units for product capacity
  const productUnits = ["lbs", "kg", "N", "kN", "tons", "grams", "ounces", "pounds"];

  const handleSearchProduct = async () => {
    if (!newProduct.serialNo.trim()) {
      toast.error("Please enter a serial number to search");
      return;
    }

    setIsSearching(true);
    try {
      // TODO: Replace with actual API call
      // Simulating API call to search product by serial number
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock product database
      const mockProductDatabase = [
        {
          serialNo: "SN123456",
          productCapacity: "1000",
          productUnit: "lbs",
          modelNo: "XYZ-1000",
        },
        {
          serialNo: "SN789012",
          productCapacity: "500",
          productUnit: "kg",
          modelNo: "ABC-500",
        },
        {
          serialNo: "SN345678",
          productCapacity: "750",
          productUnit: "N",
          modelNo: "DEF-750",
        },
        {
          serialNo: "SN901234",
          productCapacity: "2000",
          productUnit: "kN",
          modelNo: "GHI-2000",
        },
        {
          serialNo: "12345",
          productCapacity: "1500",
          productUnit: "lbs",
          modelNo: "TEST-1500",
        },
        {
          serialNo: "67890",
          productCapacity: "800",
          productUnit: "kg",
          modelNo: "DEMO-800",
        },
      ];

      // Search for product by serial number
      const foundProduct = mockProductDatabase.find(
        (product) => product.serialNo.toLowerCase() === newProduct.serialNo.toLowerCase()
      );

      if (foundProduct) {
        setNewProduct({
          ...newProduct,
          productCapacity: Number(foundProduct.productCapacity),
          productUnit: foundProduct.productUnit,
          modelNo: foundProduct.modelNo,
        });
        toast.success(`Product found! Populated details for ${foundProduct.modelNo}`);
      } else {
        toast.error("Product not found with this serial number");
      }
    } catch (error) {
      toast.error("Failed to search product");
    } finally {
      setIsSearching(false);
    }
  };

  const validateNewProduct = (): boolean => {
    const errors: typeof validationErrors = {};

    if (!newProduct.productCapacity) {
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

    if (!newProduct.problemType.trim()) {
      errors.problemType = "Problem type is required";
    }

    if (!newProduct.problemNotes.trim()) {
      errors.ProblemNotes = "Problem notes are required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddProduct = () => {
    if (validateNewProduct()) {
      onProductsChange([...products, { ...newProduct }]);
      setNewProduct({
        productCapacity: 0,
        productUnit: "",
        serialNo: "",
        modelNo: "",
        calibrationType: "Tension",
        warrantyCheck: false,
        problemType: "",
        problemNotes: "",
        solutionType: "",
        solutionNotes: "",
        repairsDone: [],
        partsUsed: [],
        productionStage: "", // Default value for new products
      });
      setValidationErrors({});
      toast.success("Product added successfully!");
    } else {
      toast.error("Please fill in all required fields");
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
    const nextId =
      (updatedProduct.repairsDone.length > 0 ? Math.max(...updatedProduct.repairsDone.map((r) => r.repairItemId)) : 0) +
      1;
    const repairWithId = {
      ...repair,
      repairItemId: nextId,
      serialNo: String(nextId),
    };
    updatedProduct.repairsDone = [...updatedProduct.repairsDone, repairWithId];
    handleUpdateProduct(productIndex, updatedProduct);
  };

  const handleDeleteRepair = (productIndex: number, repairIndex: number) => {
    const updatedProduct = { ...products[productIndex] };
    updatedProduct.repairsDone = updatedProduct.repairsDone.filter((_, i) => i !== repairIndex);
    handleUpdateProduct(productIndex, updatedProduct);
  };

  const handleAddPart = (productIndex: number, part: PartItemDTO) => {
    const updatedProduct = { ...products[productIndex] };
    const nextId =
      (updatedProduct.partsUsed.length > 0 ? Math.max(...updatedProduct.partsUsed.map((p) => p.partItemId)) : 0) + 1;
    const partWithId = {
      ...part,
      partItemId: nextId,
      serialNo: String(nextId),
    };
    updatedProduct.partsUsed = [...updatedProduct.partsUsed, partWithId];
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
            <Add sx={{ color: "primary.main", fontSize: 28 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main" }}>
              Add New Product
            </Typography>
          </Box>

          {/* Product Specifications Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: "text.secondary" }}>
              📋 Product Specifications
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
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
                startIcon={isSearching ? <CircularProgress size={20} color="inherit" /> : <Search />}
                onClick={handleSearchProduct}
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
                    <MenuItem value="Hardware Failure">Hardware Failure</MenuItem>
                    <MenuItem value="Software Issue">Software Issue</MenuItem>
                    <MenuItem value="Calibration Error">Calibration Error</MenuItem>
                    <MenuItem value="Physical Damage">Physical Damage</MenuItem>
                    <MenuItem value="Connection Problem">Connection Problem</MenuItem>
                    <MenuItem value="Performance Degradation">Performance Degradation</MenuItem>
                    <MenuItem value="Manufacturing Defect">Manufacturing Defect</MenuItem>
                    <MenuItem value="User Error">User Error</MenuItem>
                    <MenuItem value="Environmental Damage">Environmental Damage</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  {validationErrors.problemType && <FormHelperText>{validationErrors.problemType}</FormHelperText>}
                </FormControl>

                <TextField
                  label="Problem Description *"
                  value={newProduct.problemNotes}
                  onChange={(e) => setNewProduct({ ...newProduct, problemNotes: e.target.value })}
                  error={Boolean(validationErrors.ProblemNotes)}
                  helperText={validationErrors.ProblemNotes || "Describe the issue in detail"}
                  // multiline
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
                <FormControl fullWidth sx={standardFormControlSx}>
                  <InputLabel>Solution Type</InputLabel>
                  <Select
                    value={newProduct.solutionType}
                    label="Solution Type"
                    onChange={(e) => setNewProduct({ ...newProduct, solutionType: e.target.value })}
                  >
                    <MenuItem value="Replace Component">Replace Component</MenuItem>
                    <MenuItem value="Repair Existing Component">Repair Existing Component</MenuItem>
                    <MenuItem value="Software Update">Software Update</MenuItem>
                    <MenuItem value="Firmware Update">Firmware Update</MenuItem>
                    <MenuItem value="Complete Unit Replacement">Complete Unit Replacement</MenuItem>
                    <MenuItem value="No Fault Found">No Fault Found</MenuItem>
                    <MenuItem value="Customer Error">Customer Error</MenuItem>
                    <MenuItem value="Return as Defective">Return as Defective</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Solution Notes"
                  value={newProduct.solutionNotes}
                  onChange={(e) => setNewProduct({ ...newProduct, solutionNotes: e.target.value })}
                  helperText="Optional: Describe the planned solution"
                  //multiline
                  rows={3}
                  variant="outlined"
                  fullWidth
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
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setNewProduct({
                  productCapacity: 0,
                  productUnit: "",
                  serialNo: "",
                  modelNo: "",
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
              }}
              sx={{ minWidth: 120 }}
            >
              Clear Form
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddProduct}
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
                    {product.pinDiameter && (
                      <Chip label={`Pin: ${product.pinDiameter}`} size="small" color="info" variant="outlined" />
                    )}
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
          <Build />
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
