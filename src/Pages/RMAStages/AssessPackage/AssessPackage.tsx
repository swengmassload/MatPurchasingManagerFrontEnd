import { useState, useEffect } from "react";
import { Box, Paper, Button, Stack } from "@mui/material";
import { Save } from "@mui/icons-material";
import {
  RMAAssessmentCreateRequestDTO,
  RMASearchResponseDTO,
  ProductItemDTO,
} from "../../../Models/RMAManagerModels/Dto";
import RMASearchSection from "./Components/RMASearchSection";
import { RMAListSection, ProductSection } from "./Components";
import toast from "react-hot-toast";

const AssessPackage = () => {
  // RMA List state
  const [rmaList, setRmaList] = useState<RMASearchResponseDTO[]>([]);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);

  // Search state
  const [rmaNumber, setRmaNumber] = useState<string>("");
  const [searchResults, setSearchResults] = useState<RMASearchResponseDTO | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string>("");

  // Assessment form state
  const [products, setProducts] = useState<ProductItemDTO[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Form validation
  const [errors, setErrors] = useState<{
    products?: string;
  }>({});

  // Load RMA list on component mount
  useEffect(() => {
    loadRMAList();
  }, []);

  const loadRMAList = async () => {
    setIsLoadingList(true);
    try {
      // TODO: Replace with actual API call
      // Simulating API call to get list of RMAs
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock RMA list data
      const mockRMAList: RMASearchResponseDTO[] = [
        {
          rmaNumber: 12345,
          customerName: "Acme Corporation",
          contactEmail: "jane@acme.com",
          productDescription: "Model XYZ-1000 Router",
          issueDescription: "Connectivity issues reported",
          status: "Package Received",
          dateCreated: new Date("2024-01-15"),
          guidId: "mock-guid-1",
        },
        {
          rmaNumber: 12346,
          customerName: "Tech Solutions Ltd",
          contactEmail: "support@techsolutions.com",
          productDescription: "Model ABC-500 Switch",
          issueDescription: "Power supply malfunction",
          status: "Package Received",
          dateCreated: new Date("2024-01-18"),
          guidId: "mock-guid-2",
        },
        {
          rmaNumber: 12347,
          customerName: "Global Networks Inc",
          contactEmail: "rma@globalnetworks.com",
          productDescription: "Model DEF-750 Firewall",
          issueDescription: "Configuration reset required",
          status: "Package Received",
          dateCreated: new Date("2024-01-20"),
          guidId: "mock-guid-3",
        },
      ];

      setRmaList(mockRMAList);
    } catch (error) {
      toast.error("Failed to load RMA list");
    } finally {
      setIsLoadingList(false);
    }
  };

  const handleSelectRMA = (rma: RMASearchResponseDTO) => {
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
      const mockResult: RMASearchResponseDTO = {
        rmaNumber: parseInt(rmaNumber),
        customerName: "Acme Corporation",
        contactEmail: "jane@acme.com",
        productDescription: "Model XYZ-1000 Router",
        issueDescription: "Connectivity issues reported",
        status: "Package Received",
        dateCreated: new Date(),
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
        userName: "Current User", // TODO: Get from user context
        timeStamp: new Date(),
      };

      // TODO: Replace with actual API call
      console.log("Saving assessment:", assessmentData);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Assessment saved successfully!");

      // Reset form
      setProducts([]);
      setErrors({});
    } catch (error) {
      console.error("Error saving assessment:", error);
      toast.error("Failed to save assessment");
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
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSave}
                    disabled={isSaving}
                    sx={{ minWidth: 140 }}
                  >
                    {isSaving ? "Saving..." : "Save Assessment"}
                  </Button>
                </Box>
              </Stack>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AssessPackage;
