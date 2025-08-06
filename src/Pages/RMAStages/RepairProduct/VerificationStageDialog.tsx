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
} from "@mui/material";
import { ProductItemDTO } from "../../../Models/RMAManagerModels/Dto";
import { DefaultProductionStages } from "../../../Constants/ProductionStages";

interface VerificationStageDialogProps {
  open: boolean;
  onClose: () => void;
  products: ProductItemDTO[];
  verificationStages: { [serialNo: string]: string };
  onStageChange: (serialNo: string, stage: string) => void;
  onSave: () => void;
}

const VerificationStageDialog: React.FC<VerificationStageDialogProps> = ({
  open,
  onClose,
  products,
  verificationStages,
  onStageChange,
  onSave,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Change Verification Stages</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Serial Number</TableCell>
                <TableCell>Verification Stage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.serialNo}>
                  <TableCell>{product.serialNo}</TableCell>
                  <TableCell>
                    <FormControl fullWidth size="small">
                      <Select
                        value={verificationStages[product.serialNo] || ""}
                        onChange={(e) => onStageChange(product.serialNo, e.target.value)}
                      >
                        {DefaultProductionStages.AllStages.map((stage) => (
                          <MenuItem key={stage.stage} value={stage.stage}>
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VerificationStageDialog;
