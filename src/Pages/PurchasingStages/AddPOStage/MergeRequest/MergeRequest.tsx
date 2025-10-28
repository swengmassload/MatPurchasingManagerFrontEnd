import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Paper,
  Avatar,
  Divider,
  Chip,
  IconButton,
  Tooltip,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useGetMaterialRequestByStageWtDetails } from "../../../../Hooks/useGetMaterialRequestByStageWtDetails";
import { useUpdateMaterialRequest } from "../../../../Hooks/useUpdateMaterialRequest";
import {
  MaterialRequestDetailsResponseDTO,
  MaterialRequestDetailsUpdateRequestDTO,
  MaterialRequestWithDetailsResponseDTO,
} from "../../../../Models/MatPurchasingModels/Dto";
import { PurchasingStages } from "../../../../Constants/PurchasingStages";
import { Guid } from "guid-typescript";

const MergeRequest: React.FC = () => {
  const [tableData, setTableData] = useState<MaterialRequestDetailsResponseDTO[]>([]);
  const [mergeTableData, setMergeTableData] = useState<MaterialRequestDetailsResponseDTO[]>([]);
  const [selectedGuid, setSelectedGuid] = useState<string | undefined>(undefined);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [combinedData, setCombinedData] = useState<MaterialRequestWithDetailsResponseDTO | undefined>(undefined);
  const [availableDetails, setAvailableDetails] = useState<MaterialRequestDetailsResponseDTO[]>([]);
  const [showMergeDialog, setShowMergeDialog] = useState<boolean>(false);
  const [selectedMergeTarget, setSelectedMergeTarget] = useState<string>("");

  // Fetch material requests with details by stage
  const materialRequestsWithDetailsQuery = useGetMaterialRequestByStageWtDetails(
    { Stage: PurchasingStages.AddPOStage.code },
    true // always enabled
  );

  // Update material request mutation
  const updateMaterialRequestMutation = useUpdateMaterialRequest();

  // Update combined data and available details when data is fetched
  useEffect(() => {
    if (materialRequestsWithDetailsQuery.isSuccess && materialRequestsWithDetailsQuery.data) {
      console.log("Combined data received:", materialRequestsWithDetailsQuery.data);
      console.log("Type of data:", typeof materialRequestsWithDetailsQuery.data);
      console.log("Data keys:", Object.keys(materialRequestsWithDetailsQuery.data));

      // Check MaterialRequests (lowercase as returned by API)
      console.log("materialRequests:", materialRequestsWithDetailsQuery.data.materialRequests);
      console.log("Type of materialRequests:", typeof materialRequestsWithDetailsQuery.data.materialRequests);
      console.log(
        "Is materialRequests an array?",
        Array.isArray(materialRequestsWithDetailsQuery.data.materialRequests)
      );

      // Check MaterialRequestDetails (lowercase as returned by API)
      console.log("materialRequestDetails:", materialRequestsWithDetailsQuery.data.materialRequestDetails);
      console.log(
        "Type of materialRequestDetails:",
        typeof materialRequestsWithDetailsQuery.data.materialRequestDetails
      );
      console.log(
        "Is materialRequestDetails an array?",
        Array.isArray(materialRequestsWithDetailsQuery.data.materialRequestDetails)
      );

      setCombinedData(materialRequestsWithDetailsQuery.data);

      // Safely handle MaterialRequestDetails
      try {
        // Extra defensive check for materialRequestDetails (lowercase as returned by API)
        const details = materialRequestsWithDetailsQuery.data?.materialRequestDetails;
        console.log("Extracted details:", details);
        console.log("Details type:", typeof details);
        console.log("Details is array:", Array.isArray(details));

        if (details && Array.isArray(details)) {
          console.log("Setting available details with array of length:", details.length);
          // Use safer array creation
          const safeDetailsArray = [...details];
          setAvailableDetails(safeDetailsArray);
        } else {
          console.warn("materialRequestDetails is not iterable or is undefined/null, setting empty array");
          console.warn("Details value:", details);
          setAvailableDetails([]);
        }
      } catch (error) {
        console.error("Error processing materialRequestDetails:", error);
        console.error("Error details:", error);
        setAvailableDetails([]);
      }
    } else {
      console.log("No data received yet");
      setAvailableDetails([]);
    }
  }, [materialRequestsWithDetailsQuery.isSuccess, materialRequestsWithDetailsQuery.data]);

  const handleUseThis = (guidId: string) => {
    console.log("handleUseThis called with guidId:", guidId);
    console.log("combinedData:", combinedData);
    console.log("availableDetails:", availableDetails);
    console.log("availableDetails is array?", Array.isArray(availableDetails));

    if (combinedData && Array.isArray(availableDetails)) {
      try {
        // Filter MaterialRequestDetails for the selected material request
        const filteredDetails = availableDetails.filter((detail) => detail.materialRequestId === guidId);
        console.log("Filtered details:", filteredDetails);
        setTableData(filteredDetails);
        setSelectedGuid(guidId);
      } catch (error) {
        console.error("Error in handleUseThis:", error);
        setTableData([]);
      }
    } else {
      console.warn("Cannot execute handleUseThis: missing combinedData or availableDetails not array");
      setTableData([]);
    }
  };

  const toggleCardExpansion = (guidId: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(guidId)) {
        newSet.delete(guidId);
      } else {
        newSet.add(guidId);
      }
      return newSet;
    });
  };

  // Transfer item from column 2 to column 3
  const handleTransferItem = (index: number) => {
    const itemToTransfer = tableData[index];
    if (itemToTransfer) {
      console.log("Attempting to transfer item:", itemToTransfer);
      console.log(
        "Current merge table part codes:",
        mergeTableData.map((item) => item.partCode)
      );

      // Check if part code already exists in merge table (column 3)
      const existingPartCode = mergeTableData.find((item) => item.partCode === itemToTransfer.partCode);

      if (existingPartCode) {
        console.log(`Duplicate part code detected: ${itemToTransfer.partCode}`);
        alert(`Part code "${itemToTransfer.partCode}" already exists in the merge collection. Cannot add duplicate.`);
        return; // Exit without transferring or removing the item
      }

      // Add to merge table with new GUID to avoid conflicts
      const transferredItem = {
        ...itemToTransfer,
        guidId: Guid.create().toString(),
      };
      setMergeTableData((prev) => [...prev, transferredItem]);

      // Remove from original table
      const newTableData = [...tableData];
      newTableData.splice(index, 1);
      setTableData(newTableData);

      // Remove from available details (underlying data source)
      const newAvailableDetails = availableDetails.filter((detail) => detail.guidId !== itemToTransfer.guidId);
      setAvailableDetails(newAvailableDetails);

      console.log(`Successfully transferred part code "${itemToTransfer.partCode}" to merge collection`);
    }
  };

  // Delete item from merge table (column 3) and restore to materialRequestDetails
  const handleDeleteMergeItem = (index: number) => {
    const itemToRestore = mergeTableData[index];

    if (itemToRestore) {
      console.log("Restoring item to materialRequestDetails:", itemToRestore);

      // Create a restored item with original structure (remove the new GUID, keep original data)
      const restoredItem = {
        ...itemToRestore,
        // Note: We keep the current guidId since we may have generated a new one during transfer
      };

      // Add back to availableDetails (materialRequestDetails)
      setAvailableDetails((prev) => [...prev, restoredItem]);

      // If this item belongs to the currently selected material request, also add it back to tableData
      if (selectedGuid && itemToRestore.materialRequestId === selectedGuid) {
        setTableData((prev) => [...prev, restoredItem]);
        console.log("Item also restored to current table view");
      }

      // Remove from merge table
      const newMergeData = [...mergeTableData];
      newMergeData.splice(index, 1);
      setMergeTableData(newMergeData);

      console.log(`Successfully restored part code "${itemToRestore.partCode}" back to available details`);
    }
  };

  // Perform merge - show dialog to select target request
  const handlePerformMerge = () => {
    console.log("=== PERFORM MERGE ===");
    console.log("Items to be merged:", mergeTableData);
    console.log("Total items:", mergeTableData.length);

    if (mergeTableData.length === 0) {
      alert("No items to merge.");
      return;
    }

    // Reset selection and show dialog
    setSelectedMergeTarget("");
    setShowMergeDialog(true);
  };

  const columns: MRT_ColumnDef<MaterialRequestDetailsResponseDTO>[] = [
    {
      accessorKey: "partCode",
      header: "Part Code ✏️",
      size: 100,
      enableEditing: true,
      muiEditTextFieldProps: {
        required: true,
        placeholder: "Enter part code",
      },
    },
    {
      accessorKey: "description",
      header: "Description ✏️",
      size: 150,
      enableEditing: true,
      muiEditTextFieldProps: {
        required: true,
        placeholder: "Enter description",
      },
    },
    {
      accessorKey: "supplier",
      header: "Supplier ✏️",
      size: 120,
      enableEditing: true,
      muiEditTextFieldProps: {
        required: true,
        placeholder: "Enter supplier",
      },
    },
    {
      accessorKey: "triggerQuantity",
      header: "Trigger Qty ✏️",
      size: 100,
      enableEditing: true,
      muiEditTextFieldProps: {
        type: "number",
        required: true,
        placeholder: "Enter quantity",
      },
    },
    {
      accessorKey: "leadTimeInDays",
      header: "Lead Time ✏️",
      size: 100,
      enableEditing: true,
      muiEditTextFieldProps: {
        type: "number",
        required: true,
        placeholder: "Enter days",
      },
    },
    {
      accessorKey: "notes",
      header: "Notes ✏️",
      size: 150,
      enableEditing: true,
      muiEditTextFieldProps: {
        required: false,
        multiline: true,
        rows: 2,
        placeholder: "Add notes...",
      },
    },
  ];

  // Function to handle adding new row via dialog
  const handleCreateNewRow = () => {
    if (!selectedGuid) {
      alert("Please select a material request first by clicking 'Use This' on a card.");
      return;
    }
    table.setCreatingRow(true);
  };

  const table = useMaterialReactTable({
    columns,
    data: tableData,
    enableEditing: true,
    enableRowActions: true,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    positionActionsColumn: "first",
    onCreatingRowSave: ({ values, table }) => {
      if (!selectedGuid) {
        alert("Please select a material request first.");
        table.setCreatingRow(null);
        return;
      }

      const newRow: MaterialRequestDetailsResponseDTO = {
        ...(values as MaterialRequestDetailsResponseDTO),
        guidId: Guid.create().toString(),
        materialRequestId: selectedGuid,
      };

      const newData = [...tableData, newRow];
      setTableData(newData);
      table.setCreatingRow(null);
    },
    onCreatingRowCancel: ({ table }) => {
      table.setCreatingRow(null);
    },
    onEditingRowSave: ({ row, values, table }) => {
      const newData = [...tableData];
      const originalRow = newData[row.index];

      newData[row.index] = {
        ...(values as MaterialRequestDetailsResponseDTO),
        materialRequestId: originalRow.materialRequestId,
        guidId: originalRow.guidId,
      };

      setTableData(newData);
      table.setEditingRow(null);
    },
    onEditingRowCancel: ({ table }) => {
      table.setEditingRow(null);
    },
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <Tooltip title="Edit Row">
          <IconButton color="primary" size="small" onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Row">
          <IconButton color="error" size="small" onClick={() => handleDeleteRow(row.index)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Transfer to Merge">
          <IconButton color="success" size="small" onClick={() => handleTransferItem(row.index)}>
            <ArrowForwardIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  const mergeTable = useMaterialReactTable({
    columns,
    data: mergeTableData,
    enableEditing: true,
    enableRowActions: true,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    positionActionsColumn: "first",
    onEditingRowSave: ({ row, values, table }) => {
      const newData = [...mergeTableData];
      const originalRow = newData[row.index];

      newData[row.index] = {
        ...(values as MaterialRequestDetailsResponseDTO),
        materialRequestId: originalRow.materialRequestId,
        guidId: originalRow.guidId,
      };

      setMergeTableData(newData);
      table.setEditingRow(null);
    },
    onEditingRowCancel: ({ table }) => {
      table.setEditingRow(null);
    },
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <Tooltip title="Edit Row">
          <IconButton color="primary" size="small" onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete from Merge">
          <IconButton color="error" size="small" onClick={() => handleDeleteMergeItem(row.index)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  const handleDeleteRow = (index: number) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  };

  const handleSubmit = () => {
    const dataToSubmit = {
      materialRequestId: selectedGuid,
      items: tableData,
    };

    console.log("Submitting items:", dataToSubmit);
    console.log("Selected Material Request GUID:", selectedGuid);
    console.log("Table Data:", tableData);

    const updateData: MaterialRequestDetailsUpdateRequestDTO[] = tableData.map((item) => ({
      materialRequestId: item.materialRequestId,
      partCode: item.partCode,
      pONumber: item.pONumber,
      notes: item.notes,
      description: item.description,
      supplier: item.supplier,
      triggerQuantity: item.triggerQuantity,
      leadTimeInDays: item.leadTimeInDays,
      guidId: item.guidId,
    }));

    console.log("Formatted update data:", updateData);

    updateMaterialRequestMutation.mutate(updateData, {
      onSuccess: (response) => {
        console.log("Update successful:", response);
        setTableData([]);
        setSelectedGuid(undefined);
        // Refetch the data to get updated information
        materialRequestsWithDetailsQuery.refetch();
      },
      onError: (error) => {
        console.error("Update failed:", error);
      },
    });
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle merge dialog OK button
  const handleMergeDialogOk = () => {
    if (!selectedMergeTarget) {
      alert("Please select a material request to merge into.");
      return;
    }

    console.log("Selected merge target GUID:", selectedMergeTarget);

    // Check if the selected GUID still has unmerged items in availableDetails
    const hasUnmergedItems = availableDetails.some((detail) => detail.materialRequestId === selectedMergeTarget);
    const unmergedCount = availableDetails.filter((detail) => detail.materialRequestId === selectedMergeTarget).length;

    if (hasUnmergedItems) {
      alert(
        `Cannot use a request that has ${unmergedCount} unmerged items. Please transfer all items from this request first or select a different request.`
      );
      return;
    }

    // Find the selected request info for confirmation
    const selectedRequest = combinedData?.materialRequests?.find((req) => req.guidId === selectedMergeTarget);
    const requestLabel = selectedRequest
      ? `Request by ${selectedRequest.userName || "Unknown User"}`
      : "selected request";

    // Update materialRequestId for all items in merge collection
    const updatedMergeData = mergeTableData.map((item) => ({
      ...item,
      materialRequestId: selectedMergeTarget,
    }));

    setMergeTableData(updatedMergeData);
    setShowMergeDialog(false);
    setSelectedMergeTarget("");

    console.log("Successfully updated merge collection with new materialRequestId:", selectedMergeTarget);
    console.log("Updated merge data:", updatedMergeData);

    alert(`Successfully merged ${mergeTableData.length} items into ${requestLabel}.`);
  };

  // Handle merge dialog cancel button
  const handleMergeDialogCancel = () => {
    setShowMergeDialog(false);
    setSelectedMergeTarget("");
  };

  return (
    <Box sx={{ width: "90%", padding: 2, boxSizing: "border-box" }}>
      <Typography sx={{ p: 3 }} variant="h5" gutterBottom>
        Material Request Merge Manager
      </Typography>

      <Box p={2} sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", lg: "row" } }}>
        {/* First Column - Material Request Cards */}
        <Paper elevation={3} sx={{ p: 2, width: { xs: "100%", lg: "25%" }, maxHeight: "90vh", overflow: "auto" }}>
          <Typography variant="h6" gutterBottom>
            Material Requests
          </Typography>

          <Box mt={2} display="flex" flexDirection="column" gap={2}>
            {materialRequestsWithDetailsQuery.isLoading && <Typography>Loading requests...</Typography>}
            {materialRequestsWithDetailsQuery.isError && (
              <Typography color="error">
                Error loading requests: {materialRequestsWithDetailsQuery.error?.message}
              </Typography>
            )}
            {materialRequestsWithDetailsQuery.data &&
            materialRequestsWithDetailsQuery.data.materialRequests &&
            Array.isArray(materialRequestsWithDetailsQuery.data.materialRequests) &&
            materialRequestsWithDetailsQuery.data.materialRequests.length > 0
              ? materialRequestsWithDetailsQuery.data.materialRequests.map((request, idx) => (
                  <Card
                    key={request.guidId ?? idx}
                    variant="outlined"
                    sx={{
                      p: 1,
                      transition: "all 0.3s",
                      "&:hover": {
                        boxShadow: 4,
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Box display="flex" alignItems="flex-start" gap={1}>
                      <Avatar
                        sx={{
                          bgcolor: "primary.main",
                          width: 40,
                          height: 40,
                          fontSize: "1rem",
                          fontWeight: "bold",
                        }}
                      >
                        {idx + 1}
                      </Avatar>

                      <CardContent sx={{ flex: 1, p: 0, "&:last-child": { pb: 0 } }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                          <Box flex={1}>
                            <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">
                              Request #{idx + 1}
                            </Typography>
                            <Typography variant="body2" color="primary.main">
                              {request.userName || "Unknown User"}
                            </Typography>
                          </Box>
                          <IconButton
                            size="small"
                            onClick={() => toggleCardExpansion(request.guidId)}
                            sx={{
                              transform: expandedCards.has(request.guidId) ? "rotate(180deg)" : "rotate(0deg)",
                              transition: "transform 0.2s",
                            }}
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                        </Box>

                        <Collapse in={expandedCards.has(request.guidId)}>
                          <Divider sx={{ mb: 1 }} />

                          <Box display="flex" flexDirection="column" gap={1}>
                            {/* Request Date */}
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                              <Typography variant="caption" color="text.secondary" fontWeight="600">
                                Request Date:
                              </Typography>
                              <Typography variant="caption">{formatDate(request.requestDate)}</Typography>
                            </Box>

                            {/* Stage */}
                            {request.stage && (
                              <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="caption" color="text.secondary" fontWeight="600">
                                  Stage:
                                </Typography>
                                <Chip
                                  label={request.stage}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                  sx={{ fontSize: "0.6rem" }}
                                />
                              </Box>
                            )}

                            {/* GUID */}
                            <Box>
                              <Typography variant="caption" color="text.secondary" fontWeight="600" display="block">
                                GUID:
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  fontSize: "0.6rem",
                                  wordBreak: "break-all",
                                  fontFamily: "monospace",
                                  backgroundColor: "grey.100",
                                  p: 0.5,
                                  borderRadius: 0.5,
                                  display: "block",
                                }}
                              >
                                {request.guidId}
                              </Typography>
                            </Box>
                          </Box>

                          <Button
                            fullWidth
                            size="small"
                            variant="contained"
                            onClick={() => handleUseThis(request.guidId)}
                            sx={{ mt: 1 }}
                          >
                            Use This
                          </Button>
                        </Collapse>
                      </CardContent>
                    </Box>
                  </Card>
                ))
              : !materialRequestsWithDetailsQuery.isLoading &&
                !materialRequestsWithDetailsQuery.isError && (
                  <Typography variant="body2" color="text.secondary">
                    No material requests found
                  </Typography>
                )}
          </Box>
        </Paper>

        {/* Second Column - Material Details Table */}
        <Paper elevation={3} sx={{ p: 2, width: { xs: "100%", lg: "37.5%" } }}>
          <Typography variant="h6" gutterBottom>
            Material Details
          </Typography>
          <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleCreateNewRow}
              disabled={!selectedGuid}
              color="primary"
              size="small"
            >
              Add New Row
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={tableData.length === 0 || updateMaterialRequestMutation.isPending}
              size="small"
            >
              {updateMaterialRequestMutation.isPending ? "Submitting..." : "Submit"}
            </Button>
          </Box>
          <MaterialReactTable table={table} />
        </Paper>

        {/* Third Column - Merge Table */}
        <Paper elevation={3} sx={{ p: 2, width: { xs: "100%", lg: "37.5%" } }}>
          <Typography variant="h6" gutterBottom>
            Merge Collection ({mergeTableData.length} items)
          </Typography>
          <Box mb={2} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="success"
              onClick={handlePerformMerge}
              disabled={mergeTableData.length === 0}
              size="small"
            >
              Perform Merge
            </Button>
          </Box>
          <MaterialReactTable table={mergeTable} />
        </Paper>
      </Box>

      {/* Merge Target Selection Dialog */}
      <Dialog open={showMergeDialog} onClose={handleMergeDialogCancel} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontSize: "1.5rem", fontWeight: "bold", pb: 1 }}>
          Select Material Request for Merge
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1" color="text.primary" sx={{ mb: 3, fontSize: "1.1rem" }}>
            Choose which material request you want to merge all {mergeTableData.length} items into:
          </Typography>

          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ fontSize: "1rem", fontWeight: "bold", mb: 2 }}>
              Available Material Requests
            </FormLabel>
            <RadioGroup
              value={selectedMergeTarget}
              onChange={(e) => setSelectedMergeTarget(e.target.value)}
              sx={{ mt: 2 }}
            >
              {combinedData?.materialRequests?.map((request, idx) => {
                const unmergedCount = availableDetails.filter(
                  (detail) => detail.materialRequestId === request.guidId
                ).length;
                const hasUnmergedItems = unmergedCount > 0;

                return (
                  <FormControlLabel
                    key={request.guidId}
                    value={request.guidId}
                    control={<Radio disabled={hasUnmergedItems} />}
                    disabled={hasUnmergedItems}
                    sx={{
                      mb: 2,
                      p: 2,
                      border: "1px solid #e0e0e0",
                      borderRadius: 1,
                      backgroundColor: hasUnmergedItems ? "#fafafa" : "#fff",
                      "&:hover": {
                        backgroundColor: hasUnmergedItems ? "#fafafa" : "#f5f5f5",
                      },
                    }}
                    label={
                      <Box sx={{ ml: 1 }}>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "1.1rem" }}>
                            Request {idx + 1}
                          </Typography>
                          {hasUnmergedItems && (
                            <Chip
                              label={`${unmergedCount} unmerged items`}
                              size="medium"
                              color="warning"
                              variant="outlined"
                              sx={{ fontSize: "0.8rem" }}
                            />
                          )}
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          display="block"
                          sx={{ fontSize: "1rem", mb: 0.5 }}
                        >
                          User: {request.userName || "Unknown"}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          display="block"
                          sx={{ fontSize: "0.9rem", mb: 0.5 }}
                        >
                          Date: {formatDate(request.requestDate)}
                        </Typography>
                        {request.description && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            display="block"
                            sx={{
                              fontSize: "0.9rem",
                              fontStyle: "italic",
                              backgroundColor: "#f5f5f5",
                              p: 0.5,
                              borderRadius: 0.5,
                              mb: hasUnmergedItems ? 1 : 0,
                            }}
                          >
                            Description: {request.description}
                          </Typography>
                        )}
                        {hasUnmergedItems && (
                          <Typography
                            variant="body2"
                            color="warning.main"
                            display="block"
                            sx={{
                              fontStyle: "italic",
                              fontSize: "0.9rem",
                              fontWeight: "500",
                            }}
                          >
                            ⚠️ Cannot merge into this request (has unmerged items)
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleMergeDialogCancel} color="secondary" size="large" sx={{ fontSize: "1rem", px: 3 }}>
            Cancel
          </Button>
          <Button
            onClick={handleMergeDialogOk}
            color="primary"
            variant="contained"
            size="large"
            sx={{ fontSize: "1rem", px: 3 }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MergeRequest;
