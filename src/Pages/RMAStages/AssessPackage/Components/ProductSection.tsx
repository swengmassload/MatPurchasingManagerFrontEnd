import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Divider, Alert } from "@mui/material";
import { ProductItemDTO, RepairItemDTO, PartItemDTO } from "../../../../Models/RMAManagerModels/Dto";
import { useGetProductsByProductId } from "../../../../Hooks/useGetProductBySerialNo";
import { useGetRMAProblemTypes } from "../../../../Hooks/useGetRMAProblemTypes";
import { useGetRMASolutionTypes } from "../../../../Hooks/useGetRMASolutionTypes";
import toast from "react-hot-toast";
import AddProductForm from "./ProductSectionComponents/AddProductForm";
import ProductsList from "./ProductSectionComponents/ProductsList";

interface ProductSectionProps {
  products: ProductItemDTO[];
  onProductsChange: (products: ProductItemDTO[]) => void;
  error?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({ products, onProductsChange, error }) => {
  const [newProduct, setNewProduct] = useState<ProductItemDTO>({
    productCapacity: 0,
    indicatorName: "",
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
    indicatorName?: string;
    problemType?: string;
    problemNotes?: string;
    pinDiameter?: string;
  }>({});

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [executeProductSearch, setExecuteProductSearch] = useState<boolean>(false);
  const [searchSerialNo, setSearchSerialNo] = useState<string | undefined>(undefined);
  const [problemTypes, setProblemTypes] = useState<string[]>([]);
  const [solutionTypes, setSolutionTypes] = useState<string[]>([]);

  // Hook for searching product by serial number
  const {
    data: productData,
    isLoading: isLoadingProduct,
    error: productError,
  } = useGetProductsByProductId(searchSerialNo, executeProductSearch);

  // Hook for fetching RMA problem types
  const { data: problemTypesData, error: problemTypesError } = useGetRMAProblemTypes();

  // Hook for fetching RMA solution types
  const { data: solutionTypesData, error: solutionTypesError } = useGetRMASolutionTypes();

  // Effect to handle problem types data
  useEffect(() => {
    if (problemTypesData && Array.isArray(problemTypesData)) {
      let extractedTypes: string[] = [];

      try {
        if (problemTypesData.length > 0 && typeof problemTypesData[0] === "string") {
          extractedTypes = problemTypesData as unknown as string[];
        } else if (problemTypesData.length > 0 && typeof problemTypesData[0] === "object") {
          extractedTypes = problemTypesData
            .map((item: any) => {
              return item.problemType || item.name || item.type || item.value || String(item);
            })
            .filter(Boolean);
        }

        if (extractedTypes.length > 0) {
          setProblemTypes(extractedTypes);
        }
      } catch (error) {
        console.error("Error processing problem types:", error);
        setProblemTypes([]);
      }
    } else if (problemTypesError) {
      console.error("Error fetching problem types:", problemTypesError);
      setProblemTypes([]);
    }
  }, [problemTypesData, problemTypesError]);

  // Effect to handle solution types data
  useEffect(() => {
    if (solutionTypesData && Array.isArray(solutionTypesData)) {
      let extractedTypes: string[] = [];

      try {
        if (solutionTypesData.length > 0 && typeof solutionTypesData[0] === "string") {
          extractedTypes = solutionTypesData as unknown as string[];
        } else if (solutionTypesData.length > 0 && typeof solutionTypesData[0] === "object") {
          extractedTypes = solutionTypesData
            .map((item: any) => {
              return item.solution || item.solutionType || item.name || item.type || item.value || String(item);
            })
            .filter(Boolean);
        }

        if (extractedTypes.length > 0) {
          setSolutionTypes(extractedTypes);
        }
      } catch (error) {
        console.error("Error processing solution types:", error);
        setSolutionTypes([]);
      }
    } else if (solutionTypesError) {
      console.error("Error fetching solution types:", solutionTypesError);
      setSolutionTypes([]);
    }
  }, [solutionTypesData, solutionTypesError]);

  // Effect to handle product search results
  useEffect(() => {
    if (executeProductSearch && !isLoadingProduct) {
      if (productError) {
        toast.error("Product not found with this serial number");
        setIsSearching(false);
        setExecuteProductSearch(false);
      } else if (productData) {
        setNewProduct({
          ...newProduct,
          productCapacity: productData.capacity || 0,
          productUnit: productData.weightUnit || "",
          modelNo: productData.modelName || "",
        });
        toast.success(`Product found! Populated details for ${productData.modelName}`);
        setIsSearching(false);
        setExecuteProductSearch(false);
      }
    } else if (executeProductSearch && isLoadingProduct) {
      setIsSearching(true);
    }
  }, [executeProductSearch, isLoadingProduct, productError, productData]);

  const handleSearchProduct = () => {
    if (!newProduct.serialNo.trim()) {
      toast.error("Please enter a serial number to search");
      return;
    }

    setSearchSerialNo(newProduct.serialNo.trim());
    setExecuteProductSearch(true);
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

    // if (!newProduct.indicatorName.trim()) {
    //   errors.indicatorName = "Indicator is required";
    // }

    if (!newProduct.problemType.trim()) {
      errors.problemType = "Problem type is required";
    }

    if (!newProduct.problemNotes.trim()) {
      errors.problemNotes = "Problem notes are required";
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
        indicatorName: "",
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

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <AddProductForm
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          validationErrors={validationErrors}
          setValidationErrors={setValidationErrors}
          problemTypes={problemTypes}
          solutionTypes={solutionTypes}
          isSearching={isSearching}
          onSearchProduct={handleSearchProduct}
          onAddProduct={handleAddProduct}
        />

        <ProductsList
          products={products}
          onDeleteProduct={handleDeleteProduct}
          onAddRepair={handleAddRepair}
          onDeleteRepair={handleDeleteRepair}
          onAddPart={handleAddPart}
          onDeletePart={handleDeletePart}
        />
      </CardContent>
    </Card>
  );
};

export default ProductSection;
