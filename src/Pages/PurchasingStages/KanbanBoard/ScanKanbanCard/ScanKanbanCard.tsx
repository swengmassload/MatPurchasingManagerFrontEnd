
import React, { useCallback, useMemo, useState } from 'react'
import { Box, TextField, Button, Card, CardContent, Typography, Checkbox, FormControlLabel } from '@mui/material'
import { useGetPartByBarcodeORPartCode } from '../../../../Hooks/useGetPartByBarcodeORPartCode'
import { PartsSearchParams, PartsTableResponseDTO, MaterialRequestDetailsCreateRequestDTO } from '../../../../Models/MatPurchasingModels/Dto'
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table'

// simple fallback GUID generator if uuid not available
const makeGuid = () => 'guid-' + Math.random().toString(36).slice(2, 10)

const ScanKanbanCard: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [autoUse, setAutoUse] = useState(false)
  const [enabledSearch, setEnabledSearch] = useState(false)
  const [selectedRows, setSelectedRows] = useState<MaterialRequestDetailsCreateRequestDTO[]>([])

  const [searchParams, setSearchParams] = useState<PartsSearchParams | undefined>(undefined)

  const partsQuery = useGetPartByBarcodeORPartCode(searchParams, enabledSearch)

  const handleSearch = useCallback(() => {
    const params: PartsSearchParams = {
      SearchType: 'BarCode',
      BarCode: searchText || null,
      PartCode: null,
      Description: null,
    }
    setSearchParams(params)
    // toggle enable to trigger query
    setEnabledSearch(prev => !prev)
  }, [searchText])

  // when partsQuery returns and autoUse is enabled, insert first result into table
  React.useEffect(() => {
    if (autoUse && partsQuery.data && partsQuery.data.length > 0) {
      const first = partsQuery.data[0]
      const guid = makeGuid()
      const row: MaterialRequestDetailsCreateRequestDTO = {
        guidId: guid,
        partCode: first.partCode,
      }
      setSelectedRows([row, ...selectedRows])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partsQuery.data, autoUse])

  const addPartToTable = (p: PartsTableResponseDTO) => {
    const guid = makeGuid()
    const row: MaterialRequestDetailsCreateRequestDTO = {
      guidId: guid,
      partCode: p.partCode,
    }
    setSelectedRows(prev => [row, ...prev])
  }

  const columns = useMemo<MRT_ColumnDef<MaterialRequestDetailsCreateRequestDTO>[]>(() => [
    { accessorKey: 'partCode', header: 'Part Code' },
    { accessorKey: 'pONumber', header: 'PO Number' },
    { accessorKey: 'userName', header: 'User' },
    { accessorKey: 'notes', header: 'Notes' },
  ], [])

  const table = useMaterialReactTable({ columns, data: selectedRows })

  const handleSubmit = () => {
    console.log('Submitting items:', selectedRows)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Box display="flex" gap={2} p={2}>
      <Box flex={1}>
        <Box display="flex" gap={1} mb={2}>
          <TextField fullWidth label="Barcode" value={searchText} onChange={e => setSearchText(e.target.value)} onKeyPress={handleKeyPress} />
          <Button variant="contained" onClick={handleSearch}>Search</Button>
        </Box>
        <FormControlLabel control={<Checkbox checked={autoUse} onChange={(_, v) => setAutoUse(v)} />} label="Auto Use First Result" />

        <Box mt={2} display="flex" flexDirection="column" gap={2}>
          {partsQuery.data?.map((p, idx) => (
            <Card key={p.guidId ?? idx} variant="outlined">
              <CardContent>
                <Typography variant="subtitle1">{p.partCode}</Typography>
                <Typography variant="body2">{p.description}</Typography>
                <Box mt={1} display="flex" gap={1}>
                  <Button size="small" variant="contained" onClick={() => addPartToTable(p)}>Use This</Button>
                  <Button size="small" variant="outlined" onClick={() => { /* placeholder for check */ }}>Check</Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Box flex={1}>
        <Box mb={2}>
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
        <MaterialReactTable table={table} />
      </Box>
    </Box>
  )
}

export default ScanKanbanCard