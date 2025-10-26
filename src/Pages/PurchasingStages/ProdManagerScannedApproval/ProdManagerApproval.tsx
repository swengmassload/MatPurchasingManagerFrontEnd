import React, { useState, useEffect } from 'react'
import { Box, Button, Card, CardContent, Typography, Paper, Avatar, Divider, Chip } from '@mui/material'
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { useGetMaterialRequestByStage } from '../../../Hooks/useGetMaterialRequestByStage'
import { useGetMaterialDetailsByGuid } from '../../../Hooks/useGetMaterialDetailsByGuid'
import { MaterialRequestDetailsCreateRequestDTO, MaterialRequestDetailsResponseDTO } from '../../../Models/MatPurchasingModels/Dto'

const ProdManagerApproval: React.FC = () => {
  const [tableData, setTableData] = useState<MaterialRequestDetailsCreateRequestDTO[]>([])
  const [selectedGuid, setSelectedGuid] = useState<string | undefined>(undefined)
  const [enabledDetails, setEnabledDetails] = useState(false)

  // Fetch material requests by stage
  const materialRequestsQuery = useGetMaterialRequestByStage(
   // { Stage: 'ProdManagerApproval' },
      { Stage: 'New' },
    true // always enabled
  )

  // Fetch material details by guid
  const materialDetailsQuery = useGetMaterialDetailsByGuid(
    { materialGuidId: selectedGuid },
    enabledDetails
  )

  const handleUseThis = (guidId: string) => {
    setSelectedGuid(guidId)
    setEnabledDetails(prev => !prev) // Toggle to trigger query
  }

  // When material details are fetched, populate the table
  useEffect(() => {
    if (materialDetailsQuery.data && materialDetailsQuery.data.length > 0) {
      // Clear existing and populate with new data
      const newData: MaterialRequestDetailsCreateRequestDTO[] = materialDetailsQuery.data.map((detail: MaterialRequestDetailsResponseDTO) => ({
        partCode: detail.partCode,
        pONumber: detail.pONumber,
        notes: detail.notes,
        description: detail.description,
        supplier: detail.supplier,
        triggerQuantity: detail.triggerQuantity,
        leadTimeInDays: detail.leadTimeInDays,
        guidId: detail.guidId,
      }))
      setTableData(newData)
    }
  }, [materialDetailsQuery.data])

  const columns: MRT_ColumnDef<MaterialRequestDetailsCreateRequestDTO>[] = [
    { accessorKey: 'partCode', header: 'Part Code', size: 120, enableEditing: false },
    { 
      accessorKey: 'description', 
      header: 'Description', 
      size: 200,
      muiEditTextFieldProps: {
        required: false,
      },
    },
    { accessorKey: 'supplier', header: 'Supplier', size: 150, enableEditing: false },
    { 
      accessorKey: 'triggerQuantity', 
      header: 'Trigger Qty', 
      size: 100,
      muiEditTextFieldProps: {
        type: 'number',
        required: false,
      },
    },
    { 
      accessorKey: 'leadTimeInDays', 
      header: 'Lead Time (days)', 
      size: 120,
      muiEditTextFieldProps: {
        type: 'number',
        required: false,
      },
    },
    { 
      accessorKey: 'notes', 
      header: 'Notes', 
      size: 150,
      muiEditTextFieldProps: {
        required: false,
        multiline: true,
        rows: 2,
      },
    },
  ]

  const table = useMaterialReactTable({
    columns,
    data: tableData,
    enableEditing: true,
    editDisplayMode: 'table', // Makes the entire table editable
    onEditingRowSave: ({ row, values }) => {
      // Update the data when a row is saved
      const newData = [...tableData]
      newData[row.index] = values as MaterialRequestDetailsCreateRequestDTO
      setTableData(newData)
    },
  })

  const handleSubmit = () => {
    console.log('Submitting items:', tableData)
  }

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString()
  }

  return (
    <Box p={2} sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
      {/* First Column - Material Request Cards */}
      <Paper elevation={3} sx={{ p: 2, width: { xs: '100%', md: '30%' }, maxHeight: '90vh', overflow: 'auto' }}>
        <Typography variant="h6" gutterBottom>Material Requests</Typography>
        
        <Box mt={2} display="flex" flexDirection="column" gap={2}>
          {materialRequestsQuery.isLoading && (
            <Typography>Loading requests...</Typography>
          )}
          {materialRequestsQuery.isError && (
            <Typography color="error">Error loading requests</Typography>
          )}
          {materialRequestsQuery.data?.map((request, idx) => (
            <Card 
              key={request.guidId ?? idx} 
              variant="outlined" 
              sx={{ 
                p: 2,
                transition: 'all 0.3s',
                '&:hover': {
                  boxShadow: 4,
                  transform: 'translateY(-2px)',
                }
              }}
            >
              <Box display="flex" alignItems="flex-start" gap={2}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'primary.main', 
                    width: 56, 
                    height: 56,
                    fontSize: '1.25rem',
                    fontWeight: 'bold'
                  }}
                >
                  {request.userName?.charAt(0)?.toUpperCase() ?? 'U'}
                </Avatar>
                
                <CardContent sx={{ flex: 1, p: 0, '&:last-child': { pb: 0 } }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
                    <Box flex={1}>
                      <Typography variant="h6" color="primary.main" gutterBottom>
                        {request.userName || 'Unknown User'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {formatDate(request.requestDate)}
                      </Typography>
                      {request.stage && (
                        <Chip 
                          label={request.stage} 
                          size="small" 
                          color="primary" 
                          variant="outlined" 
                          sx={{ mt: 0.5 }}
                        />
                      )}
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 1.5 }} />
                  
                  <Box display="flex" flexDirection="column" gap={1}>
                    {request.description && (
                      <Box>
                        <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">
                          Description
                        </Typography>
                        <Typography variant="body2">
                          {request.description}
                        </Typography>
                      </Box>
                    )}
                    
                    {request.notes && (
                      <Box>
                        <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">
                          Notes
                        </Typography>
                        <Typography variant="body2">
                          {request.notes}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  
                  <Button 
                    fullWidth
                    size="medium" 
                    variant="contained" 
                    onClick={() => handleUseThis(request.guidId)}
                    sx={{ mt: 2 }}
                  >
                    Use This
                  </Button>
                </CardContent>
              </Box>
            </Card>
          ))}
        </Box>
      </Paper>

      {/* Second Column - Editable Material Details Table */}
      <Paper elevation={3} sx={{ p: 2, width: { xs: '100%', md: '70%' } }}>
        <Typography variant="h6" gutterBottom>Material Details</Typography>
        <Box mb={2} display="flex" justifyContent="flex-end">
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={tableData.length === 0}
          >
            Submit
          </Button>
        </Box>
        <MaterialReactTable table={table} />
      </Paper>
    </Box>
  )
}

export default ProdManagerApproval