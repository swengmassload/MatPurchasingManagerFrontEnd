import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Button,
  Stack,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import  VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import  BuildIcon  from "@mui/icons-material/Build";
import   InventoryIcon  from "@mui/icons-material/Inventory";
import  ExpandMoreIcon  from "@mui/icons-material/ExpandMore";
import SaveIcon from "@mui/icons-material/Save";


import {
  RepairInProgressEventCreateRequestDTO,
  RMAResponseDTO,
  ProductItemDTO,
  RMAGetRequestByStage,
  ProductRepairQueryDTO,
} from "../../../Models/RMAManagerModels/Dto";
import RMASearchSection from "../AssessPackage/Components/RMASearchSection";
import { RMAListSection } from "../AssessPackage/Components";
import toast from "react-hot-toast";
import { useGetRMAByStage } from "../../../Hooks/useGetRMAByStage";
import { useCreateRepairProduct } from "../../../Hooks/useCreateRepairProduct";
import { useCreateChangeProductStage } from "../../../Hooks/useCreateChangeProductStage";
import { useGetAssessmentByRmaNumber } from "../../../Hooks/useGetAssessmentByRmaNumber";
import { DefaultRMAStages } from "../../../Constants/RMAStages";

import ProductionStageDialog from "./ProductionStageDialog";
import { DefaultProductionStages } from "../../../Constants/ProductionStages";

// Component to display products as cards (read-only)
const ProductDisplayCard: React.FC<{ product: ProductItemDTO; index: number }> = ({ product, index }) => {
  return (
    <Accordion sx={{ mb: 2 }} defaultExpanded={index === 0}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon  />}
        aria-controls={`product-${index}-content`}
        id={`product-${index}-header`}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <Typography variant="h6" color="primary">
            Product #{index + 1} - {product.serialNo} ({product.productionStage})
          </Typography>
          <Chip
            label={product.calibrationType}
            color={product.calibrationType === "Tension" ? "primary" : "secondary"}
            sx={{ mr: 2 }}
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" } }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Serial Number
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {product.serialNo}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Model Number
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {product.modelNo}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Capacity
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {product.productCapacity} {product.productUnit}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Warranty Check
            </Typography>
            <Chip
              label={product.warrantyCheck ? "Under Warranty" : "Out of Warranty"}
              color={product.warrantyCheck ? "success" : "warning"}
              size="small"
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Problem Type
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {product.problemType}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Problem Notes
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {product.problemNotes.toString().length > 0 ? product.problemNotes.substring(0, 50)+"...." : ""}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Solution Type
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {product.solutionType}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Solution Notes
            </Typography>
            <Typography variant="body1">{product.solutionNotes.toString().length > 0 ? product.solutionNotes.substring(0, 50)+"...." : ""}</Typography>
          </Box>
        </Box>

        {/* Repairs Done Section */}
        {product.repairsDone.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <BuildIcon  sx={{ mr: 1 }} />
              Repairs Done ({product.repairsDone.length})
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Hours Used</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {product.repairsDone.map((repair, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{repair.description}</TableCell>
                      <TableCell>{new Date(repair.date).toLocaleDateString()}</TableCell>
                      <TableCell>{repair.hoursUsed}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Parts Used Section */}
        {product.partsUsed.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <InventoryIcon  sx={{ mr: 1 }} />
              Parts Used ({product.partsUsed.length})
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {product.partsUsed.map((part, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{part.description}</TableCell>
                      <TableCell>{part.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

const RepairProduct = () => {
  // RMA List state using the API hook
  const rmaStageRequest: RMAGetRequestByStage = {
    Stage: DefaultRMAStages.SALESORDERADDED.stage,
    DraftAssessment: true, // Include draft assessments to see the DRAFT label
  };

  const {
    data: rmaList = [],
    isLoading: isLoadingList,
    error: rmaListError,
    refetch,
  } = useGetRMAByStage(rmaStageRequest, true);

  // Search state
  const [rmaNumber, setRmaNumber] = useState<string>("");
  const [searchResults, setSearchResults] = useState<RMAResponseDTO | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string>("");

  // Repair form state
  const [products, setProducts] = useState<ProductItemDTO[]>([]);
  const [note, setNote] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Form validation
  const [errors, setErrors] = useState<{
    notes?: string;
  }>({});

  // Production stage dialog state
  const [productionDialogOpen, setProductionDialogOpen] = useState<boolean>(false);
  const [productionStages, setProductionStages] = useState<{ [serialNo: string]: string }>({});
  const [isSavingProductionStages, setIsSavingProductionStages] = useState<boolean>(false);

  // Show error toast if RMA list fails to load
  useEffect(() => {
    if (rmaListError) {
      toast.error("Failed to load RMA list");
    }
  }, [rmaListError]);

  const [selectedRmaNumber, setSelectedRmaNumber] = useState<string | undefined>(undefined);
  const { data: existingAssessment, isLoading: isLoadingAssessment } = useGetAssessmentByRmaNumber(
    selectedRmaNumber,
    !!selectedRmaNumber
  );

  const handleSelectRMA = (rma: RMAResponseDTO) => {
    console.log("Selected RMA for repair:", rma);

    setSearchResults(rma);
    setSelectedRmaNumber(rma.rmaNumber.toString()); // Set the RMA number for the hook to check for existing assessment
    setSearchError("");

    // Show loading message while checking for existing assessment
    toast.success(`RMA #${rma.rmaNumber} selected - Loading assessment data for repair...`);
  };

  // Effect to handle the assessment loading after the hook fetches data
  useEffect(() => {
    if (selectedRmaNumber && !isLoadingAssessment) {
      if (existingAssessment) {
        console.log("Found existing assessment for repair:", existingAssessment);
        setProducts(existingAssessment.products);
        setNote("");
        toast.success(`RMA #${selectedRmaNumber} selected - Assessment data loaded for repair`);
      } else {
        console.log("No existing assessment found for RMA:", selectedRmaNumber);
        // Reset form for new repair
        setProducts([]);
        setNote("");
        toast.error(`RMA #${selectedRmaNumber} selected - No assessment data found`);
      }
    }
  }, [selectedRmaNumber, existingAssessment, isLoadingAssessment]);

  const handleSearch = async () => {
    if (!rmaNumber.trim()) {
      toast.error("Please enter an RMA number");
      return;
    }

    setIsSearching(true);
    setSearchError("");
    setSearchResults(null);

    try {
      // TODO: Replace with actual API call
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful search result - using RMA number
      const searchedRmaNumber = parseInt(rmaNumber);
      const mockResult: RMAResponseDTO = {
        rmaNumber: searchedRmaNumber,
        customerEmail: "jane@acme.com",
        dateIssued: new Date(),
        rmaProblemDescription: "Connectivity issues reported",
        stage: "Sales Order Added",
        salesPerson: "John Doe",
        companyName: "Acme Corporation",
        contactName: "Jane Smith",
        notes: "Search result - ready for repair",
        street: "123 Main St",
        city: "Springfield",
        province: "IL",
        zipCode: "62701",
        phoneNumber: "555-1234",
        country: "USA",
        draftAssessment: false,

        salesOrderId: "SO-2024-001234",
        guidId: "mock-guid",
      };

      setSearchResults(mockResult);
      handleSelectRMA(mockResult);
    } catch (error) {
      setSearchError("RMA not found or search failed");
      toast.error("Failed to find RMA");
    } finally {
      setIsSearching(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

   if (note && note.trim().length > 300) {
      newErrors.notes = "Notes must be at most 300 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { mutateAsync: createRepairProductMutation } = useCreateRepairProduct();
  const { mutateAsync: createChangeProductStageMutation } = useCreateChangeProductStage();

  // Verification stage handlers
  const handleOpenVerificationDialog = () => {
    const initialStages: { [serialNo: string]: string } = {};
    products.forEach((product) => {
      initialStages[product.serialNo] = product.productionStage || "";
    });
    setProductionStages(initialStages);
    setProductionDialogOpen(true);
  };

  const handleProductionStageChange = (serialNo: string, stage: string) => {
    setProductionStages((prev) => ({
      ...prev,
      [serialNo]: stage,
    }));
  };

  const handleSaveProductionStages = async () => {
    const updatedProducts = products.map((product) => ({
      ...product,
      productionStage: productionStages[product.serialNo] || product.productionStage,
    }));

    const newlist: ProductRepairQueryDTO[] = updatedProducts
      .filter((product) => product.productionStage !== "Not_Applicable")
      .filter((product) => {
        // Only include products where the stage has changed
        return DefaultProductionStages.AllStages.map(stage => stage.code).includes(product.productionStage);
      })
      .map((product) => ({
        productId: product.serialNo,
        rmaNumber: existingAssessment?.rmaNumber || 0,
        productionStage: product.productionStage,
      }));

    console.log("Updated products with verification stages:", newlist);
    setProducts(updatedProducts);

    // Show loading state
    setIsSavingProductionStages(true);

    try {
      // Only mutate if there are items to process
      if (newlist.length > 0) {
        await createChangeProductStageMutation(newlist);
      }

      // Only close dialog if mutation was successful
      setProductionDialogOpen(false);
      toast.success("Production stages updated successfully");
    } catch (error) {
      console.error("Error updating production stages:", error);
      toast.error("Failed to update production stages. Please try again.");
    } finally {
      // Always hide loading state
      setIsSavingProductionStages(false);
    }
  };
  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("Please fix validation errors before saving");
      return;
    }

    if (!searchResults) {
      toast.error("Please select an RMA first");
      return;
    }

    setIsSaving(true);

    const repairData: RepairInProgressEventCreateRequestDTO = {
      rMANumber: searchResults.rmaNumber,
      notes: note,
    };

    try {
      await createRepairProductMutation(repairData);
      // Reset form
      setNote("");
      setErrors({});
      refetch();
    } catch (error) {
      // Error handling is already done in the hook
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1600, margin: "0 auto", padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
          {/* Left Side - RMA List */}
          <Box sx={{ flex: "0 0 400px", minWidth: { xs: "100%", md: "400px" } }}>
            <RMAListSection
              rmaList={rmaList}
              onSelectRMA={handleSelectRMA}
              selectedRMANumber={searchResults?.rmaNumber}
              isLoading={isLoadingList}
            />
          </Box>

          {/* Right Side - Repair Form */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* RMA Search Section */}
            <RMASearchSection
              rmaNumber={rmaNumber}
              onRmaNumberChange={setRmaNumber}
              onSearch={handleSearch}
              isSearching={isSearching}
              searchResults={searchResults}
              searchError={searchError}
            />

            {/* Repair Form - Only show if search is successful */}
            {searchResults && (
              <Stack spacing={3} sx={{ mt: 3 }}>
                {/* Products Display Section */}
                {products.length > 0 ? (
                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography variant="h6" color="primary">
                        Products for Repair: ({products.length})
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<VerifiedUserIcon  />}
                        onClick={handleOpenVerificationDialog}
                        sx={{ minWidth: 200 }}
                      >
                        Change Production Stage
                      </Button>
                    </Box>
                    {products.map((product, index) => (
                      <ProductDisplayCard key={index} product={product} index={index} />
                    ))}
                  </Box>
                ) : (
                  <Box sx={{ textAlign: "center", py: 4 }}>
                    <Typography variant="h6" color="text.secondary">
                      No assessment data found for this RMA
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Please ensure this RMA has been assessed before starting repair.
                    </Typography>
                  </Box>
                )}

                {/* Note Field */}
                <Box sx={{ mt: 2 }}>
                  <label htmlFor="repair-note" style={{ fontWeight: "bold" }}>
                    Repair Notes *:
                  </label>
                  <textarea
                    id="repair-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={4}
                    style={{
                      width: "100%",
                      marginTop: 8,
                      padding: 8,
                      fontSize: 16,
                      border: errors.notes ? "1px solid #d32f2f" : "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    placeholder="Enter detailed notes about the repair work being performed..."
                  />
                  {errors.notes && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, display: "block" }}>
                      {errors.notes}
                    </Typography>
                  )}
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2, mt: 4 }}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon  />}
                    onClick={handleSave}
                    disabled={isSaving || products.length === 0}
                    sx={{ minWidth: 140 }}
                  >
                    {isSaving ? "Starting..." : "Start Repair"}
                  </Button>
                </Box>
              </Stack>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Production Stage Dialog */}
      <ProductionStageDialog
        open={productionDialogOpen}
        onClose={() => setProductionDialogOpen(false)}
        products={products}
        productionStages={productionStages}
        onStageChange={handleProductionStageChange}
        onSave={handleSaveProductionStages}
        isSaving={isSavingProductionStages}
      />
    </Box>
  );
};

export default RepairProduct;
