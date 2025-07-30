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
import { DefaultRMAStages } from "../../../Constants/RMAStages";

// Mock assessment list for draft assessments
const mockAssessmentList: ProductAssessedEventCreateRequestDTO[] = [
  {
    rmaNumber: 107,
    status: false, // Draft
    products: [
      {
        productCapacity: "500",
        productUnit: "kg",
        serialNo: "SN001-2024",
        modelNo: "LC-500-A",
        calibrationType: "Tension",
        warrantyCheck: true,
        solutionType: "Replace Component",
        solutionNotes: "Replaced damaged load cell sensor due to overload condition",
        problemType: "Hardware Failure",
        ProblemNotes: "Load cell showing inconsistent readings above 400kg capacity",
        repairsDone: [
          {
            description: "Disassembled load cell housing",
            date: new Date("2024-01-15"),
            hoursUsed: 2.5,
          },
          {
            description: "Replaced strain gauge sensor",
            date: new Date("2024-01-15"),
            hoursUsed: 1.5,
          },
        ],
        partsUsed: [
          {
            description: "Strain gauge sensor - Model SG-500",
            quantity: 1,
          },
          {
            description: "Protective housing gasket",
            quantity: 1,
          },
        ],
      },
    ],
  },
  {
    rmaNumber: 103,
    status: false, // Draft
    products: [
      {
        productCapacity: "1000",
        productUnit: "lbs",
        serialNo: "SN002-2024",
        modelNo: "LC-1000-B",
        calibrationType: "Compression",
        warrantyCheck: false,
        solutionType: "Software Update",
        solutionNotes: "Updated firmware to version 2.1.3 to resolve calibration drift issues",
        problemType: "Software Issue",
        ProblemNotes: "Calibration values drifting over time, especially in high temperature environments",
        repairsDone: [
          {
            description: "Firmware update and recalibration",
            date: new Date("2024-01-16"),
            hoursUsed: 1.0,
          },
        ],
        partsUsed: [],
      },
      {
        productCapacity: "250",
        productUnit: "kg",
        serialNo: "SN003-2024",
        modelNo: "LC-250-C",
        calibrationType: "Tension",
        warrantyCheck: true,
        solutionType: "Repair Existing Component",
        solutionNotes: "Cleaned and resealed cable connection points",
        problemType: "Connection Problem",
        ProblemNotes: "Intermittent connection issues causing data loss",
        repairsDone: [
          {
            description: "Cable inspection and cleaning",
            date: new Date("2024-01-16"),
            hoursUsed: 0.5,
          },
        ],
        partsUsed: [
          {
            description: "Cable connector sealant",
            quantity: 1,
          },
        ],
      },
    ],
  },
  {
    rmaNumber: 110,
    status: false, // Draft
    products: [
      {
        productCapacity: "2000",
        productUnit: "kg",
        serialNo: "SN004-2024",
        modelNo: "LC-2000-D",
        calibrationType: "Compression",
        warrantyCheck: false,
        solutionType: "Complete Unit Replacement",
        solutionNotes: "Unit beyond economical repair due to extensive water damage",
        problemType: "Environmental Damage",
        ProblemNotes: "Water ingress caused corrosion of internal components and circuit board damage",
        repairsDone: [
          {
            description: "Initial assessment and documentation",
            date: new Date("2024-01-17"),
            hoursUsed: 1.0,
          },
        ],
        partsUsed: [],
      },
    ],
  },
];

const AssessPackage = () => {
  // RMA List state using the API hook
  const rmaStageRequest: RMAGetRequestByStage = {
    Stage: DefaultRMAStages.PACKAGERECEIVED.stage,
    DraftAssessment: true, // Include draft assessments to see the DRAFT label
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
    console.log("Selected RMA for assessment:", rma);
    console.log("RMA draftAssessment value:", rma.draftAssessment); // Debug log

    setSearchResults(rma);
    setRmaNumber(rma.rmaNumber.toString());
    setSearchError("");

    // If this is a draft assessment, look up existing assessment data
    if (rma.draftAssessment) {
      const existingAssessment = mockAssessmentList.find((assessment) => assessment.rmaNumber === rma.rmaNumber);

      if (existingAssessment) {
        console.log("Found existing draft assessment:", existingAssessment);
        setProducts(existingAssessment.products);
        setIsCompleted(existingAssessment.status);
        toast.success(`RMA #${rma.rmaNumber} selected - Loading draft assessment data`);
      } else {
        console.log("No existing assessment found for RMA:", rma.rmaNumber);
        setProducts([]);
        setIsCompleted(false);
        toast.success(`RMA #${rma.rmaNumber} selected for assessment`);
      }
    } else {
      // For non-draft assessments, start fresh
      setProducts([]);
      setIsCompleted(false);
      toast.success(`RMA #${rma.rmaNumber} selected for assessment`);
    }
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

      // Mock successful search result - using RMA number from our mock assessment list
      const searchedRmaNumber = parseInt(rmaNumber);
      const mockResult: RMAResponseDTO = {
        rmaNumber: searchedRmaNumber,
        customerEmail: "jane@acme.com",
        dateIssued: new Date(),
        rmaProblemDescription: "Connectivity issues reported",
        stage: "Package Received",
        salesPerson: "John Doe",
        companyName: "Acme Corporation",
        contactName: "Jane Smith",
        notes: "Search result - ready for assessment",
        street: "123 Main St",
        city: "Springfield",
        province: "IL",
        zipCode: "62701",
        phoneNumber: "555-1234",
        country: "USA",
        // Set draftAssessment to true if this RMA exists in our mock assessment list
        draftAssessment: mockAssessmentList.some((assessment) => assessment.rmaNumber === searchedRmaNumber),
        pinDiameter: 5,
        guidId: "mock-guid",
      };

      setSearchResults(mockResult);

      // If this is a draft assessment, populate existing data
      if (mockResult.draftAssessment) {
        const existingAssessment = mockAssessmentList.find(
          (assessment) => assessment.rmaNumber === mockResult.rmaNumber
        );

        if (existingAssessment) {
          console.log("Found existing draft assessment from search:", existingAssessment);
          setProducts(existingAssessment.products);
          setIsCompleted(existingAssessment.status);
          toast.success("RMA found successfully! Loading draft assessment data...");
        } else {
          setProducts([]);
          setIsCompleted(false);
          toast.success("RMA found successfully!");
        }
      } else {
        // For non-draft assessments, start fresh
        setProducts([]);
        setIsCompleted(false);
        toast.success("RMA found successfully!");
      }
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
      status: isCompleted, // Use checkbox state for completed/draft status
    };

    try {
      await createAssessmentMutation(assessmentData);
      // Reset form
      setProducts([]);
      setIsCompleted(false);
      setErrors({});
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
