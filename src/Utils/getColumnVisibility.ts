import { MRT_ColumnDef, MRT_RowData } from "material-react-table";




export function getColumnVisibility<T extends MRT_RowData>(
  columns: (MRT_ColumnDef<T, string> | MRT_ColumnDef<T, string | null> | MRT_ColumnDef<T, boolean>| 
       MRT_ColumnDef<T, string | undefined>
       //| MRT_ColumnDef<T, TrackReportProps
      // | MRT_ColumnDef<T, TrackReportProps | null> | MRT_ColumnDef<T, TrackReportProps | undefined>
       //>
      )[],
  hiddenColumns?: string[]
) {
  return columns.reduce((acc, element) => {
    if (hiddenColumns?.includes(element.accessorKey as string)) {
      return {
        ...acc,
        [element.accessorKey as string]: false,
      };
    }
    return {
      ...acc,
      [element.accessorKey as string]: true,
    };
  }, {});
}
