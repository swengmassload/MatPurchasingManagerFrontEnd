import React, { useMemo } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table'
import { useGetParts } from '../../../Hooks/useGetParts'
import { PartsTableResponseDTO } from '../../../Models/MatPurchasingModels/Dto'

const ViewEditPart: React.FC = () => {
  // fetch parts
  const partsQuery = useGetParts()

  const data = partsQuery.data ?? ([] as PartsTableResponseDTO[])

  const columns = useMemo<MRT_ColumnDef<PartsTableResponseDTO>[]>(
    () => [
      { accessorKey: 'partCode', header: 'Part Code' },
      { accessorKey: 'barcodeCode', header: 'Barcode' },
      { accessorKey: 'description', header: 'Description' },
      { accessorKey: 'supplier', header: 'Supplier' },
      { accessorKey: 'triggerQuantity', header: 'Trigger Quantity' },
      { accessorKey: 'leadTimeInDays', header: 'Lead Time (days)' },
    ],
    [],
  )

  const table = useMaterialReactTable({ columns, data })

  if (partsQuery.isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={4}>
        <CircularProgress />
      </Box>
    )
  }

  if (partsQuery.isError) {
    return (
      <Box p={4}>
        <Typography color="error">Failed to load parts.</Typography>
      </Box>
    )
  }

  return (
    <Box p={2}>
      <MaterialReactTable table={table} />
    </Box>
  )
}

export default ViewEditPart