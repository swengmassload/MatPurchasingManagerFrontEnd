import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  Box,
} from "@mui/material";
import { ProductItemDTO } from "../../../Models/RMAManagerModels/Dto";
import { DefaultProductionStages } from "../../../Constants/ProductionStages";

interface ProductionStageDialogProps {
  open: boolean;
  onClose: () => void;
  products: ProductItemDTO[];
  productionStages: { [serialNo: string]: string };
  onStageChange: (serialNo: string, stage: string) => void;
  onSave: () => void;
  isSaving?: boolean;
}

const ProductionStageDialog: React.FC<ProductionStageDialogProps> = ({
  open,
  onClose,
  products,
  productionStages,
  onStageChange,
  onSave,
  isSaving = false,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Change Product Stage in Product Manager</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Serial Number</TableCell>
                <TableCell> Product Stage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.serialNo}>
                  <TableCell>{product.serialNo}</TableCell>
                  <TableCell>
                    <FormControl fullWidth size="small">
                      <Select
                        value={productionStages[product.serialNo] || ""}
                        onChange={(e) => onStageChange(product.serialNo, e.target.value)}
                      >
                        {[
                          {
                            stage: "Not Applicable",
                            code: "Not_Applicable",
                            priority: -2,
                          },
                          ...DefaultProductionStages.AllStages,
                        ].map((stage) => (
                          <MenuItem key={stage.stage} value={stage.code}>
                            {stage.stage}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSaving}>
          Cancel
        </Button>
        <Button onClick={onSave} variant="contained" disabled={isSaving}>
          {isSaving && (
            <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
              <CircularProgress size={16} color="inherit" />
            </Box>
          )}
          {isSaving ? "Saving..." : "Apply Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductionStageDialog;
