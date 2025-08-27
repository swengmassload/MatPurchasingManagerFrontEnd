import { useState, useEffect } from "react";
import { Box, Paper, Button, Stack, Checkbox, FormControlLabel } from "@mui/material";
import { Save, Visibility } from "@mui/icons-material";
import {
  ProductAssessedEventCreateRequestDTO,
  RMAResponseDTO,
  ProductItemDTO,
  RMAGetRequestByStage,
} from "../../../Models/RMAManagerModels/Dto";
import RMASearchSection from "./Components/RMASearchSection";
import { RMAListSection, ProductSection } from "./Components";
import AssessmentPreviewDialog from "./Components/AssessmentPreviewDialog";
import toast from "react-hot-toast";
import { useGetRMAByStage } from "../../../Hooks/useGetRMAByStage";
import { useCreateAssessment } from "../../../Hooks/useCreateAssessment";
import { useGetAssessmentByRmaNumber } from "../../../Hooks/useGetAssessmentByRmaNumber";
import { useGetRMAById } from "../../../Hooks/useGetRMAById";
import { DefaultRMAStages } from "../../../Constants/RMAStages";

const AssessPackage = () => {
  // RMA List state using the API hook
  const rmaStageRequest: RMAGetRequestByStage = {
    Stage: DefaultRMAStages.PACKAGERECEIVED.stage,
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
  const [executeSearch, setExecuteSearch] = useState<boolean>(false);
  const [searchRmaNumber, setSearchRmaNumber] = useState<string | undefined>(undefined);

  // Assessment form state
  const [products, setProducts] = useState<ProductItemDTO[]>([]);
  const [note, setNote] = useState<string>("");
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

  const [selectedRmaNumber, setSelectedRmaNumber] = useState<string | undefined>(undefined);
  const { data: existingAssessment, isLoading: isLoadingAssessment } = useGetAssessmentByRmaNumber(
    selectedRmaNumber,
    !!selectedRmaNumber
  );

  // Hook for searching RMA by ID
  const {
    data: searchRmaData,
    isLoading: isSearchingRMA,
    error: searchRMAError,
  } = useGetRMAById(searchRmaNumber, executeSearch);

  const handleSelectRMA = (rma: RMAResponseDTO) => {
    rma.draftAssessment ? console.log("Selected RMA for assessment:", rma) : <></>;
    // If draftAssessment is true, we can proceed with the assessment

    setSearchResults(rma);
    setSelectedRmaNumber(rma.rmaNumber.toString()); // Set the RMA number for the hook to check for existing assessment
    setSearchError("");

    // Show loading message while checking for existing assessment
    if (rma.draftAssessment) {
      toast.success(`RMA #${rma.rmaNumber} selected - Checking for existing assessment...`);
    }
  };

  // Effect to handle the assessment loading after the hook fetches data
  useEffect(() => {
    if (selectedRmaNumber && !isLoadingAssessment && searchResults?.draftAssessment) {
      if (existingAssessment) {
        toast.success(`RMA #${selectedRmaNumber} selected - Loading existing assessment data`);
        console.log("Found existing draft assessment via API:", existingAssessment);
        setProducts(existingAssessment.products);
        setIsCompleted(existingAssessment.assessmentStatus);
        setNote(existingAssessment.notes || "");
        toast.success(`RMA #${selectedRmaNumber} selected - Loading draft assessment data`);
      } else {
        console.log("No existing assessment found for RMA:", selectedRmaNumber);
        // Reset form for new assessment
        setProducts([]);
        setIsCompleted(false);
        setNote("");
        toast.success(`RMA #${selectedRmaNumber} selected - Ready for new assessment`);
      }
    } else if (selectedRmaNumber && !isLoadingAssessment && !searchResults?.draftAssessment) {
      // RMA without draft assessment - reset form for new assessment
      console.log("RMA has no draft assessment, starting fresh:", selectedRmaNumber);
      setProducts([]);
      setIsCompleted(false);
      setNote("");
      toast.success(`RMA #${selectedRmaNumber} selected - Ready for new assessment`);
    }
  }, [selectedRmaNumber, existingAssessment, isLoadingAssessment, searchResults?.draftAssessment]);

  // Effect to handle search results from useGetRMAById
  useEffect(() => {
    if (executeSearch && !isSearchingRMA) {
      if (searchRMAError) {
        setSearchError("RMA not found or search failed");
        toast.error("Failed to find RMA");
        setIsSearching(false);
        setExecuteSearch(false);
      } else if (searchRmaData) {
        setSearchResults(searchRmaData);
        setSearchError("");
        setIsSearching(false);
        setExecuteSearch(false);
        toast.success(`RMA #${searchRmaData.rmaNumber} found successfully`);
      }
    } else if (executeSearch && isSearchingRMA) {
      setIsSearching(true);
    }
  }, [executeSearch, isSearchingRMA, searchRMAError, searchRmaData]);

  const handleSearch = async () => {
    if (!rmaNumber.trim()) {
      toast.error("Please enter an RMA number");
      return;
    }

    // Reset previous search state
    setSearchError("");
    setSearchResults(null);

    // Set the RMA number to search and enable the hook
    setSearchRmaNumber(rmaNumber.trim());
    setExecuteSearch(true);
  };

  const validateForm = (): boolean => {
 
    const newErrors: typeof errors = {};

    if (products.length === 0) {
      newErrors.products = "At least one product is required";
    } else {
      // Check if all products have required problem fields
      const productsWithMissingProblemInfo = products.filter((product) => {
      
        console.log("Validating product:", product);
        const result = !product.problemType?.trim() || !product.problemNotes?.trim();
        return result;
      });

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

  const { mutateAsync: createAssessmentMutation } = useCreateAssessment();

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

    const assessmentData: ProductAssessedEventCreateRequestDTO = {
      rmaNumber: searchResults.rmaNumber,
      products,
      notes: note,
      assessmentStatus: isCompleted,
    };

    try {
      await createAssessmentMutation(assessmentData);
      // Reset form
      setProducts([]);
      setIsCompleted(false);
      setNote("");
      setErrors({});
      refetch();
    } catch (error) {
      // Error handling is already done in the hook
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

                {/* Note Field */}
                <Box sx={{ mt: 2 }}>
                  <label htmlFor="assessment-note" style={{ fontWeight: "bold" }}>
                    Assessment Note:
                  </label>
                  <textarea
                    id="assessment-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    style={{ width: "100%", marginTop: 8, padding: 8, fontSize: 16 }}
                    placeholder="Enter any notes for this assessment..."
                  />
                </Box>

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
            assessmentStatus: isCompleted,
            notes: note,
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
