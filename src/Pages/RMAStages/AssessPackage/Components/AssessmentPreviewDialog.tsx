import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
} from "@mui/material";
import { Print, Close, Assignment, Build, Inventory } from "@mui/icons-material";
import { RMAAssessmentCreateRequestDTO,  } from "../../../../Models/RMAManagerModels/Dto";

interface AssessmentPreviewDialogProps {
  open: boolean;
  onClose: () => void;
  assessmentData: RMAAssessmentCreateRequestDTO;
  rmaDetails?: {
    companyName?: string;
    contactName?: string;
    customerEmail?: string;
    rmaProblemDescription?: string;
  };
}

const AssessmentPreviewDialog: React.FC<AssessmentPreviewDialogProps> = ({
  open,
  onClose,
  assessmentData,
  rmaDetails,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          minHeight: "80vh",
          "@media print": {
            boxShadow: "none",
            margin: 0,
            maxWidth: "100%",
            minHeight: "100vh",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#1976d2",
          color: "white",
          "@media print": {
            backgroundColor: "#1976d2 !important",
            color: "white !important",
            "-webkit-print-color-adjust": "exact",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Assignment />
          <Typography variant="h5">RMA Assessment Report</Typography>
        </Box>
        <Box sx={{ "@media print": { display: "none" } }}>
          <IconButton onClick={handlePrint} sx={{ color: "white", mr: 1 }}>
            <Print />
          </IconButton>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3, "@media print": { p: 2 } }}>
        {/* Header Information */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: "#1976d2", fontWeight: "bold" }}>
            RMA Assessment Report
          </Typography>

          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 3, mb: 3 }}>
            <Paper sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
              <Typography variant="h6" gutterBottom color="primary">
                RMA Information
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    RMA Number:
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    #{assessmentData.rmaNumber}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Assessment Status:
                  </Typography>
                  <Chip
                    label={assessmentData.status ? "Completed" : "Draft"}
                    color={assessmentData.status ? "success" : "warning"}
                    size="small"
                  />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Assessment Date:
                  </Typography>
                  <Typography variant="body1">{formatDate(new Date())}</Typography>
                </Box>
              </Box>
            </Paper>

            {rmaDetails && (
              <Paper sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Customer Information
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Company:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {rmaDetails.companyName || "N/A"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Contact:
                    </Typography>
                    <Typography variant="body1">{rmaDetails.contactName || "N/A"}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Email:
                    </Typography>
                    <Typography variant="body1">{rmaDetails.customerEmail || "N/A"}</Typography>
                  </Box>
                </Box>
              </Paper>
            )}
          </Box>

          {rmaDetails?.rmaProblemDescription && (
            <Paper sx={{ p: 2, backgroundColor: "#fff3e0", mb: 3 }}>
              <Typography variant="h6" gutterBottom color="warning.dark">
                Original Problem Description
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {rmaDetails.rmaProblemDescription}
              </Typography>
            </Paper>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Products Assessment */}
        <Typography variant="h5" gutterBottom sx={{ color: "#1976d2", mb: 3 }}>
          Product Assessment Details ({assessmentData.products.length} Products)
        </Typography>

        {assessmentData.products.map((product, index) => (
          <Paper
            key={index}
            sx={{
              mb: 4,
              p: 3,
              border: "2px solid #e0e0e0",
              "@media print": { breakInside: "avoid" },
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: "#1976d2", mb: 2 }}>
              Product #{index + 1}
            </Typography>

            {/* Product Basic Information */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
                Product Information
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Serial Number:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {product.serialNo}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Model:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {product.modelNo}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Capacity:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {product.productCapacity} {product.productUnit}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Calibration Type:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {product.calibrationType}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Warranty Status:
                </Typography>
                <Chip
                  label={product.warrantyCheck ? "Under Warranty" : "Out of Warranty"}
                  color={product.warrantyCheck ? "success" : "error"}
                  size="small"
                />
              </Box>
            </Box>

            {/* Problem Details */}
            <Box sx={{ mb: 3, p: 2, backgroundColor: "#fff3e0", borderRadius: 1 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold", color: "#ed6c02" }}>
                Problem Analysis
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Problem Type:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {product.problemType}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Problem Notes:
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    {product.ProblemNotes}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Solution Details */}
            <Box sx={{ mb: 3, p: 2, backgroundColor: "#f0f7ff", borderRadius: 1 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
                Solution Implemented
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Solution Type:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {product.solutionType}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Solution Notes:
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    {product.solutionNotes}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Repairs Done */}
            {product.repairsDone.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <Build color="action" />
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Repairs Performed
                  </Typography>
                </Box>
                <TableContainer component={Paper} sx={{ backgroundColor: "#f9f9f9" }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Hours Used</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {product.repairsDone.map((repair, repairIndex) => (
                        <TableRow key={repairIndex}>
                          <TableCell>{repair.description}</TableCell>
                          <TableCell>{formatDate(repair.date)}</TableCell>
                          <TableCell>{repair.hoursUsed} hours</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {/* Parts Used */}
            {product.partsUsed.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <Inventory color="action" />
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Parts Used
                  </Typography>
                </Box>
                <TableContainer component={Paper} sx={{ backgroundColor: "#f9f9f9" }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {product.partsUsed.map((part, partIndex) => (
                        <TableRow key={partIndex}>
                          <TableCell>{part.description}</TableCell>
                          <TableCell>{part.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Paper>
        ))}

        {/* Assessment Summary */}
        <Paper sx={{ p: 3, backgroundColor: "#f5f5f5", mt: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: "#1976d2" }}>
            Assessment Summary
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total Products:
              </Typography>
              <Typography variant="h6">{assessmentData.products.length}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total Repairs:
              </Typography>
              <Typography variant="h6">
                {assessmentData.products.reduce((total, product) => total + product.repairsDone.length, 0)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total Parts Used:
              </Typography>
              <Typography variant="h6">
                {assessmentData.products.reduce((total, product) => total + product.partsUsed.length, 0)}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </DialogContent>

      <DialogActions sx={{ p: 2, "@media print": { display: "none" } }}>
        <Button onClick={handlePrint} startIcon={<Print />} variant="outlined">
          Print Report
        </Button>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssessmentPreviewDialog;
