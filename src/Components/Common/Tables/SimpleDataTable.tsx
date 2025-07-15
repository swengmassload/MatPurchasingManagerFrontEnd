import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';

interface SimpleDataTableProps {
  columns: GridColDef[];
  rows: readonly GridValidRowModel[]; //GridRowsProp[];
  height?: number;
  maxPagSize?: number;
  pageSize?: number;
}

const SimpleDataTable = ({ columns, rows, height = 400, maxPagSize = 10, pageSize = 7 }: SimpleDataTableProps) => {
  return (
    <div style={{ height: height, width: '100%' }}>
      <DataGrid
        data-testid="SimpleDataTableId"
        rows={rows}
        columns={columns}
        initialState={
          { pagination: { paginationModel: { page: 0, pageSize: pageSize },   }, density: 'compact', }
         
        }
        pageSizeOptions={[pageSize, maxPagSize]}
        checkboxSelection 
        disableRowSelectionOnClick


      />
    </div>
  );
};

export default SimpleDataTable;
