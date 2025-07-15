import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Person } from './testdata';
import { Box } from '@mui/material';

//example data type
interface BaseMUITableProps {

  data: Person[];
}  


const BaseMUITable = ({data}: BaseMUITableProps ) => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'name.isActive',
        header: 'Active',
        size: 150,
        

        Cell: ({ cell }) => (
            <Box
              component="span"
              sx={(theme) => ({
                backgroundColor:
                  cell.getValue<boolean>() === true
                    ? theme.palette.error.dark

                      : theme.palette.success.dark,
                borderRadius: '0.25rem',
                color: '#fff',
                maxWidth: '9ch',
                p: '0.25rem',
              })}
            >
              {cell.getValue<number>()?.toLocaleString?.('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Box>
          ),


      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
        size: 200,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 150,

      },
      {
        accessorKey: 'state',
        header: 'State',
        size: 150,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({ columns, data, });
  return <MaterialReactTable table={table} />;
};

export default BaseMUITable;
