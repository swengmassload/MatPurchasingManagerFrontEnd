// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Divider,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Alert,
//   Chip,
// } from "@mui/material";
// import { Add, Delete } from "@mui/icons-material";
// import { PartItemDTO } from "../../../../Models/RMAManagerModels/Dto";

// interface PartsUsedSectionProps {
//   partsUsed: PartItemDTO[];
//   onPartsUsedChange: (parts: PartItemDTO[]) => void;
//   error?: string;
// }

// const PartsUsedSection: React.FC<PartsUsedSectionProps> = ({ partsUsed, onPartsUsedChange, error }) => {
//   const [newPart, setNewPart] = useState<PartItemDTO>({
//     description: "",
//     quantity: 1,
//   //  cost: 0,
//   });

//   const [validationErrors, setValidationErrors] = useState<{
//     description?: string;
//     quantity?: string;
//     cost?: string;
//   }>({});

//   const validateNewPart = (): boolean => {
//     const errors: typeof validationErrors = {};

//     if (!newPart.description.trim()) {
//       errors.description = "Part description is required";
//     }

//     if (newPart.quantity <= 0) {
//       errors.quantity = "Quantity must be greater than 0";
//     }

//     if (newPart.cost < 0) {
//       errors.cost = "Cost cannot be negative";
//     }

//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleAddPart = () => {
//     if (validateNewPart()) {
//       onPartsUsedChange([...partsUsed, { ...newPart }]);
//       setNewPart({
//         description: "",
//         quantity: 1,
//         cost: 0,
//       });
//       setValidationErrors({});
//     }
//   };

//   const handleDeletePart = (index: number) => {
//     const updatedParts = partsUsed.filter((_, i) => i !== index);
//     onPartsUsedChange(updatedParts);
//   };

//   const calculateTotalCost = (): number => {
//     return partsUsed.reduce((total, part) => total + part.quantity * part.cost, 0);
//   };

//   const formatCurrency = (amount: number): string => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(amount);
//   };

//   return (
//     <Card>
//       <CardContent>
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
//           <Typography variant="h6" color="primary">
//             Parts Used
//           </Typography>
//           {partsUsed.length > 0 && (
//             <Chip label={`Total: ${formatCurrency(calculateTotalCost())}`} color="primary" variant="outlined" />
//           )}
//         </Box>
//         <Divider sx={{ mb: 2 }} />

//         {/* Add New Part Form */}
//         <Box sx={{ mb: 3, p: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}>
//           <Typography variant="subtitle2" gutterBottom>
//             Add New Part
//           </Typography>

//           <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
//             <TextField
//               label="Part Description *"
//               value={newPart.description}
//               onChange={(e) => setNewPart({ ...newPart, description: e.target.value })}
//               error={Boolean(validationErrors.description)}
//               helperText={validationErrors.description}
//               sx={{ flex: 2, minWidth: 200 }}
//             />

//             <TextField
//               label="Quantity *"
//               type="number"
//               value={newPart.quantity || ""}
//               onChange={(e) => setNewPart({ ...newPart, quantity: parseInt(e.target.value) || 1 })}
//               error={Boolean(validationErrors.quantity)}
//               helperText={validationErrors.quantity}
//               inputProps={{ min: 1 }}
//               sx={{ flex: 1, minWidth: 100 }}
//             />

//             <TextField
//               label="Unit Cost"
//               type="number"
//               value={newPart.cost || ""}
//               onChange={(e) => setNewPart({ ...newPart, cost: parseFloat(e.target.value) || 0 })}
//               error={Boolean(validationErrors.cost)}
//               helperText={validationErrors.cost}
//               inputProps={{ min: 0, step: 0.01 }}
//               InputProps={{
//                 startAdornment: "$",
//               }}
//               sx={{ flex: 1, minWidth: 120 }}
//             />
//           </Box>

//           <Button variant="contained" startIcon={<Add />} onClick={handleAddPart} size="small">
//             Add Part
//           </Button>
//         </Box>

//         {/* Error Message */}
//         {error && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {error}
//           </Alert>
//         )}

//         {/* Parts Table */}
//         {partsUsed.length > 0 ? (
//           <TableContainer component={Paper} variant="outlined">
//             <Table size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>
//                     <strong>Description</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Quantity</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Unit Cost</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Total Cost</strong>
//                   </TableCell>
//                   <TableCell width={50}>
//                     <strong>Action</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {partsUsed.map((part, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{part.description}</TableCell>
//                     <TableCell>{part.quantity}</TableCell>
//                     <TableCell>{formatCurrency(part.cost)}</TableCell>
//                     <TableCell>
//                       <strong>{formatCurrency(part.quantity * part.cost)}</strong>
//                     </TableCell>
//                     <TableCell>
//                       <IconButton color="error" size="small" onClick={() => handleDeletePart(index)}>
//                         <Delete />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//               {partsUsed.length > 1 && (
//                 <TableHead>
//                   <TableRow>
//                     <TableCell colSpan={3} align="right">
//                       <strong>Grand Total:</strong>
//                     </TableCell>
//                     <TableCell>
//                       <strong>{formatCurrency(calculateTotalCost())}</strong>
//                     </TableCell>
//                     <TableCell />
//                   </TableRow>
//                 </TableHead>
//               )}
//             </Table>
//           </TableContainer>
//         ) : (
//           <Alert severity="info">No parts added yet. Add parts that were used in the repair process.</Alert>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default PartsUsedSection;
