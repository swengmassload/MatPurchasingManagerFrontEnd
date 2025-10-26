
import React, { useCallback, useState, useEffect } from 'react'
import { Box, TextField, Button, Card, CardContent, Typography, Checkbox, FormControlLabel, Paper, Avatar, Divider, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import toast from 'react-hot-toast'
import { useGetPartByBarcodeORPartCode } from '../../../../Hooks/useGetPartByBarcodeORPartCode'
import { useCreateMaterialRequest } from '../../../../Hooks/useCreateMaterialRequest'
import { PartsSearchParams, PartsTableResponseDTO, MaterialRequestDetailsCreateRequestDTO } from '../../../../Models/MatPurchasingModels/Dto'
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table'

const ScanKanbanCard: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [autoUse, setAutoUse] = useState(false)
  const [enabledSearch, setEnabledSearch] = useState(false)
  const [selectedRows, setSelectedRows] = useState<MaterialRequestDetailsCreateRequestDTO[]>([])
  const [searchParams, setSearchParams] = useState<PartsSearchParams | undefined>(undefined)
  const partsQuery = useGetPartByBarcodeORPartCode(searchParams, enabledSearch)
  const createMaterialRequest = useCreateMaterialRequest()

  const handleSearch = useCallback(() => {
    const params: PartsSearchParams = {
      SearchType: 'BarCode',
      BarCode: searchText || "",
      PartCode: null,
      Description: null,
    }
    setSearchParams(params)
    // toggle enable to trigger query
    setEnabledSearch(prev => !prev)
  }, [searchText])

  // when partsQuery returns and autoUse is enabled, insert first result into table
  useEffect(() => {
    if (autoUse && partsQuery.data && partsQuery.data.length > 0) {
      const first = partsQuery.data[0]
      // prevent duplicates
      if (selectedRows.some(r => r.partCode === first.partCode)) return
      const row: MaterialRequestDetailsCreateRequestDTO = {
        partCode: first.partCode,
        description: first.description,
        supplier: first.supplier,
        triggerQuantity: first.triggerQuantity,
        leadTimeInDays: first.leadTimeInDays,
        pONumber: undefined,
        notes: undefined,
        guidId: undefined,
      }
      setSelectedRows(prev => [row, ...prev])
    }
  }, [partsQuery.data, autoUse, selectedRows])

  const addPartToTable = (p: PartsTableResponseDTO) => {
    if (!p.partCode) return
    if (selectedRows.some(r => r.partCode === p.partCode)) {
      toast.error('Part already added to table')
      return
    }
    const row: MaterialRequestDetailsCreateRequestDTO = {
      partCode: p.partCode,
      description: p.description,
      supplier: p.supplier,
      triggerQuantity: p.triggerQuantity,
      leadTimeInDays: p.leadTimeInDays,
      pONumber: undefined,
      notes: undefined,
      guidId: undefined,
    }
    setSelectedRows(prev => [row, ...prev])
  }

  const handleDeleteRow = (partCode: string | undefined) => {
    setSelectedRows(prev => prev.filter(row => row.partCode !== partCode))
  }

  const columns: MRT_ColumnDef<MaterialRequestDetailsCreateRequestDTO>[] = [
    { accessorKey: 'partCode', header: 'Part Code', size: 120 },
    { accessorKey: 'description', header: 'Description', size: 200 },
    { accessorKey: 'supplier', header: 'Supplier', size: 150 },
    { accessorKey: 'triggerQuantity', header: 'Trigger Qty', size: 100 },
    { accessorKey: 'leadTimeInDays', header: 'Lead Time (days)', size: 120 },
  ]

  const table = useMaterialReactTable({ 
    columns, 
    data: selectedRows,
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <IconButton
        color="error"
        onClick={() => handleDeleteRow(row.original.partCode)}
        disabled={createMaterialRequest.isPending}
      >
        <DeleteIcon />
      </IconButton>
    ),
  })

  const handleSubmit = () => {
    console.log('Submitting items:', selectedRows)
    createMaterialRequest.mutate(selectedRows, {
      onSuccess: () => {
        setSelectedRows([])
      }
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Box p={2} sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
      <Paper elevation={3} sx={{ p: 2, width: { xs: '100%', md: '30%' } }}>
        <Typography variant="h6" gutterBottom>Search</Typography>
        <Box display="flex" gap={1} mb={2}>
          <TextField fullWidth label="Barcode" value={searchText} onChange={e => setSearchText(e.target.value)} onKeyPress={handleKeyPress} />
          <Button variant="contained" onClick={handleSearch}>Search</Button>
        </Box>
        <FormControlLabel control={<Checkbox checked={autoUse} onChange={(_, v) => setAutoUse(v)} />} label="Auto Use First Result" />

        <Box mt={2} display="flex" flexDirection="column" gap={2}>
          {partsQuery.data?.map((p, idx) => (
            <Card 
              key={p.guidId ?? idx} 
              variant="outlined" 
              sx={{ 
                display: 'flex', 
                gap: 2, 
                alignItems: 'flex-start', 
                p: 2,
                transition: 'all 0.3s',
                '&:hover': {
                  boxShadow: 4,
                  transform: 'translateY(-2px)',
                }
              }}
            >
              <Avatar 
                sx={{ 
                  bgcolor: 'primary.main', 
                  width: 64, 
                  height: 64,
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}
              >
                {p.partCode?.charAt(0) ?? 'P'}
              </Avatar>
              <CardContent sx={{ flex: 1, p: 0, '&:last-child': { pb: 0 } }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Box>
                    <Typography variant="h6" color="primary.main" gutterBottom>
                      {p.partCode || 'Unknown Part'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      {p.description || 'No description available'}
                    </Typography>
                  </Box>
                  <Button 
                    size="medium" 
                    variant="contained" 
                    onClick={() => addPartToTable(p)}
                    sx={{ minWidth: 120 }}
                  >
                    Use This
                  </Button>
                </Box>
                
                <Divider sx={{ my: 1.5 }} />
                
                <Box 
                  display="grid" 
                  gridTemplateColumns="repeat(2, 1fr)" 
                  gap={1.5}
                  sx={{ mt: 2 }}
                >
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">
                      Barcode
                    </Typography>
                    <Typography variant="body2">
                      {p.barcodeCode || 'N/A'}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">
                      Supplier
                    </Typography>
                    <Typography variant="body2">
                      {p.supplier || 'Not specified'}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">
                      Trigger Quantity
                    </Typography>
                    <Typography variant="body2">
                      {p.triggerQuantity ?? '-'}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">
                      Lead Time
                    </Typography>
                    <Typography variant="body2">
                      {p.leadTimeInDays ? `${p.leadTimeInDays} days` : '-'}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, width: { xs: '100%', md: '70%' } }}>
        <Typography variant="h6" gutterBottom>Result</Typography>
        <Box mb={2} display="flex" justifyContent="flex-end">
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={createMaterialRequest.isPending || selectedRows.length === 0}
          >
            {createMaterialRequest.isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </Box>
        <MaterialReactTable table={table} />
      </Paper>
    </Box>
  )
}

export default ScanKanbanCard