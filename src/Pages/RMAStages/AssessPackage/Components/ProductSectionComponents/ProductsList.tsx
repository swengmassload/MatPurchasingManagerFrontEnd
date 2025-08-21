import React from "react";
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, Chip, IconButton, Alert } from "@mui/material";
import { ExpandMore, Delete } from "@mui/icons-material";
import { ProductItemDTO, RepairItemDTO, PartItemDTO } from "../../../../../Models/RMAManagerModels/Dto";
import ProductDetailsPanel from "./ProductDetailsPanel";

interface ProductsListProps {
  products: ProductItemDTO[];
  onDeleteProduct: (index: number) => void;
  onAddRepair: (productIndex: number, repair: RepairItemDTO) => void;
  onDeleteRepair: (productIndex: number, repairIndex: number) => void;
  onAddPart: (productIndex: number, part: PartItemDTO) => void;
  onDeletePart: (productIndex: number, partIndex: number) => void;
}

const ProductsList: React.FC<ProductsListProps> = ({
  products,
  onDeleteProduct,
  onAddRepair,
  onDeleteRepair,
  onAddPart,
  onDeletePart,
}) => {
  if (products.length === 0) {
    return <Alert severity="info">No products added yet. Please add at least one product.</Alert>;
  }

  return (
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
              {product.indicatorName && (
                <Chip label={`Indicator: ${product.indicatorName}`} size="small" color="info" variant="outlined" />
              )}
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
                  onDeleteProduct(productIndex);
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
              onAddRepair={onAddRepair}
              onDeleteRepair={onDeleteRepair}
              onAddPart={onAddPart}
              onDeletePart={onDeletePart}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ProductsList;
