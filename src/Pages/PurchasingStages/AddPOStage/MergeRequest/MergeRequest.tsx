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
} from "@mui/material";
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Add as AddIcon, 
  ExpandMore as ExpandMoreIcon,
  ArrowForward as ArrowForwardIcon
} from "@mui/icons-material";
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useGetMaterialRequestByStage } from "../../../../Hooks/useGetMaterialRequestByStage";
import { useGetMaterialDetailsByGuid } from "../../../../Hooks/useGetMaterialDetailsByGuid";
import { useUpdateMaterialRequest } from "../../../../Hooks/useUpdateMaterialRequest";
import {
  MaterialRequestDetailsResponseDTO,
  MaterialRequestDetailsUpdateRequestDTO,
} from "../../../../Models/MatPurchasingModels/Dto";
import { PurchasingStages } from "../../../../Constants/PurchasingStages";
import { Guid } from "guid-typescript";

const MergeRequest: React.FC = () => {
  const [tableData, setTableData] = useState<MaterialRequestDetailsResponseDTO[]>([]);
  const [mergeTableData, setMergeTableData] = useState<MaterialRequestDetailsResponseDTO[]>([]);
  const [selectedGuid, setSelectedGuid] = useState<string | undefined>(undefined);
  const [enabledDetails, setEnabledDetails] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  // Fetch material requests by stage
  const materialRequestsQuery = useGetMaterialRequestByStage(
    { Stage: PurchasingStages.PRODMANAGERAPPROVAL.code },
    true // always enabled
  );

  // Fetch material details by guid
  const materialDetailsQuery = useGetMaterialDetailsByGuid({ MaterialRequest: selectedGuid }, enabledDetails);

  // Update material request mutation
  const updateMaterialRequestMutation = useUpdateMaterialRequest();

  const handleUseThis = (guidId: string) => {
    setSelectedGuid(guidId);
    setEnabledDetails(true);
  };

  const toggleCardExpansion = (guidId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(guidId)) {
        newSet.delete(guidId);
      } else {
        newSet.add(guidId);
      }
      return newSet;
    });
  };

  // When material details are fetched, populate the table
  useEffect(() => {
    if (materialDetailsQuery.data) {
      if (materialDetailsQuery.data.length > 0) {
        const newData: MaterialRequestDetailsResponseDTO[] = materialDetailsQuery.data.map(
          (detail: MaterialRequestDetailsResponseDTO) => ({
            materialRequestId: detail.materialRequestId,
            partCode: detail.partCode,
            pONumber: detail.pONumber,
            notes: detail.notes,
            description: detail.description,
            supplier: detail.supplier,
            triggerQuantity: detail.triggerQuantity,
            leadTimeInDays: detail.leadTimeInDays,
            guidId: detail.guidId,
          })
        );
        setTableData(newData);
      } else {
        setTableData([]);
      }
    }
  }, [materialDetailsQuery.data]);

  // Transfer item from column 2 to column 3
  const handleTransferItem = (index: number) => {
    const itemToTransfer = tableData[index];
    if (itemToTransfer) {
      // Add to merge table with new GUID to avoid conflicts
      const transferredItem = {
        ...itemToTransfer,
        guidId: Guid.create().toString(),
      };
      setMergeTableData(prev => [...prev, transferredItem]);
      
      // Remove from original table
      const newTableData = [...tableData];
      newTableData.splice(index, 1);
      setTableData(newTableData);
    }
  };

  // Delete item from merge table (column 3)
  const handleDeleteMergeItem = (index: number) => {
    const newMergeData = [...mergeTableData];
    newMergeData.splice(index, 1);
    setMergeTableData(newMergeData);
  };

  // Perform merge - print all items in column 3
  const handlePerformMerge = () => {
    console.log("=== PERFORM MERGE ===");
    console.log("Items to be merged:", mergeTableData);
    console.log("Total items:", mergeTableData.length);
    console.log("Merge data details:", JSON.stringify(mergeTableData, null, 2));
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
    positionActionsColumn: "last",
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
          <IconButton
            color="primary"
            size="small"
            onClick={() => table.setEditingRow(row)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Row">
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDeleteRow(row.index)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Transfer to Merge">
          <IconButton
            color="success"
            size="small"
            onClick={() => handleTransferItem(row.index)}
          >
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
    positionActionsColumn: "last",
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
          <IconButton
            color="primary"
            size="small"
            onClick={() => table.setEditingRow(row)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete from Merge">
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDeleteMergeItem(row.index)}
          >
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
        setEnabledDetails(false);
        materialRequestsQuery.refetch();
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

  return (
    <Box sx={{ width: "90%", padding: 2, boxSizing: "border-box" }}    >
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
            {materialRequestsQuery.isLoading && <Typography>Loading requests...</Typography>}
            {materialRequestsQuery.isError && <Typography color="error">Error loading requests</Typography>}
            {materialRequestsQuery.data?.map((request, idx) => (
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
                          transform: expandedCards.has(request.guidId) ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s',
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
                          <Typography variant="caption">
                            {formatDate(request.requestDate)}
                          </Typography>
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
            ))}
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
    </Box>
  );
};

export default MergeRequest;