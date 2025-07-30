import { useState, useEffect } from "react";
import { Box, Paper, Button, Stack, Checkbox, FormControlLabel } from "@mui/material";
import { Save, Visibility } from "@mui/icons-material";
import {
  RMAAssessmentCreateRequestDTO,
  RMAResponseDTO,
  ProductItemDTO,
  RMAGetRequestByStage,
} from "../../../Models/RMAManagerModels/Dto";
import RMASearchSection from "./Components/RMASearchSection";
import { RMAListSection, ProductSection } from "./Components";
import AssessmentPreviewDialog from "./Components/AssessmentPreviewDialog";
import toast from "react-hot-toast";
import { useGetRMAByStage } from "../../../Hooks/useGetRMAByStage";
import { DefaultRMAStages } from "../../../Constants/RMAStages";

const AssessPackage = () => {
  // RMA List state using the API hook
  const rmaStageRequest: RMAGetRequestByStage = {
    Stage: DefaultRMAStages.PACKAGERECEIVED.stage,
  };

  const { data: rmaList = [], isLoading: isLoadingList, error: rmaListError } = useGetRMAByStage(rmaStageRequest, true);

  // Search state
  const [rmaNumber, setRmaNumber] = useState<string>("");
  const [searchResults, setSearchResults] = useState<RMAResponseDTO | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string>("");

  // Assessment form state
  const [products, setProducts] = useState<ProductItemDTO[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  // Form validation
  const [errors, setErrors] = useState<{
    products?: string;
  }>({});

  // Show error toast if RMA list fails to load
  useEffect(() => {
    if (rmaListError) {
      toast.error("Failed to load RMA list");
    }
  }, [rmaListError]);

  const handleSelectRMA = (rma: RMAResponseDTO) => {
    setSearchResults(rma);
    setRmaNumber(rma.rmaNumber.toString());
    setSearchError("");
    toast.success(`RMA #${rma.rmaNumber} selected for assessment`);
  };

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

      // Mock successful search result
      const mockResult: RMAResponseDTO = {
        rmaNumber: parseInt(rmaNumber),
        customerEmail: "jane@acme.com",
        dateIssued: new Date(),
        rmaProblemDescription: "Connectivity issues reported",
        stage: "Package Received",
        salesPerson: "John Doe",
        companyName: "Acme Corporation",
        contactName: "Jane Smith",
        notes: "Search result - ready for assessment",
        guidId: "mock-guid",
      };

      setSearchResults(mockResult);
      toast.success("RMA found successfully!");
    } catch (error) {
      setSearchError("RMA not found or search failed");
      toast.error("Failed to find RMA");
    } finally {
      setIsSearching(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (products.length === 0) {
      newErrors.products = "At least one product is required";
    } else {
      // Check if all products have required problem fields
      const productsWithMissingProblemInfo = products.filter(
        (product) => !product.problemType?.trim() || !product.ProblemNotes?.trim()
      );

      if (productsWithMissingProblemInfo.length > 0) {
        newErrors.products = "All products must have problem type and problem notes";
      }

      // Check if all products have required solution fields
      const productsWithMissingSolution = products.filter(
        (product) => !product.solutionType?.trim() || !product.solutionNotes?.trim()
      );

      if (productsWithMissingSolution.length > 0) {
        newErrors.products = "All products must have solution type and solution notes";
      }

      // Check if products have repairs and parts
      const hasProductsWithRepairsOrParts = products.some(
        (product) => product.repairsDone.length > 0 || product.partsUsed.length > 0
      );

      if (!hasProductsWithRepairsOrParts) {
        newErrors.products = "At least one product must have repairs or parts";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("Please fix validation errors before saving");
      return;
    }

    if (!searchResults) {
      toast.error("Please search for an RMA first");
      return;
    }

    setIsSaving(true);

    try {
      const assessmentData: RMAAssessmentCreateRequestDTO = {
        rmaNumber: searchResults.rmaNumber,
        products,
        status: isCompleted, // Use checkbox state for completed/draft status
      };

      // TODO: Replace with actual API call
      console.log("Saving assessment:", assessmentData);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(`Assessment saved ${isCompleted ? "as completed" : "as draft"} successfully!`);

      // Reset form
      setProducts([]);
      setIsCompleted(false);
      setErrors({});
    } catch (error) {
      console.error("Error saving assessment:", error);
      toast.error("Failed to save assessment");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    if (!validateForm()) {
      toast.error("Please fix validation errors before previewing");
      return;
    }

    if (!searchResults) {
      toast.error("Please search for an RMA first");
      return;
    }

    setShowPreview(true);
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

          {/* Right Side - Assessment Form */}
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

            {/* Assessment Form - Only show if search is successful */}
            {searchResults && (
              <Stack spacing={3} sx={{ mt: 3 }}>
                {/* Product Section */}
                <ProductSection products={products} onProductsChange={setProducts} error={errors.products} />

                {/* Action Buttons */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2, mt: 4 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isCompleted}
                        onChange={(e) => setIsCompleted(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Mark as Completed"
                    sx={{ mr: 2 }}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<Visibility />}
                    onClick={handlePreview}
                    disabled={products.length === 0}
                    sx={{ minWidth: 120 }}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSave}
                    disabled={isSaving}
                    sx={{ minWidth: 140 }}
                  >
                    {isSaving ? "Saving..." : `Save ${isCompleted ? "Completed" : "Draft"}`}
                  </Button>
                </Box>
              </Stack>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Assessment Preview Dialog */}
      {showPreview && searchResults && (
        <AssessmentPreviewDialog
          open={showPreview}
          onClose={() => setShowPreview(false)}
          assessmentData={{
            rmaNumber: searchResults.rmaNumber,
            products: products,
            status: isCompleted,
          }}
          rmaDetails={{
            companyName: searchResults.companyName,
            contactName: searchResults.contactName,
            customerEmail: searchResults.customerEmail,
            rmaProblemDescription: searchResults.rmaProblemDescription,
          }}
        />
      )}
    </Box>
  );
};

export default AssessPackage;
