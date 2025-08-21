import { useEffect, useState } from "react";
import { ProblemDetails, RMAGetTrackingDetailRequestDTO, TrackReport } from "../../../Models/RMAManagerModels/Dto";
import { TrackByStageColumnHelper } from "./TrackByStageColumnHelper";
import { getColumnVisibility } from "../../../Utils/getColumnVisibility";
import { MaterialReactTable, MRT_RowSelectionState, useMaterialReactTable } from "material-react-table";
import { useGetRMATrackingDetails } from "../../../Hooks/useGetRMATrackingDetails";
import { muiTableHeaderCellColor } from "../../../Components/Common/ComponentStyles";
import CircularSpinner from "../../../Components/Common/CircularSpinner";
import TrackingDetailsDialog from "../TrackingShared/TrackingDetailsDialog";

interface TrackByStageMUITableProps {
  data: TrackReport[];
  hiddenColumns?: string[];
  enableRowSelection?: boolean;
  enableMultiRowSelection?: boolean;
}

const TrackByStageMUITable = ({ data, hiddenColumns, enableRowSelection = false }: TrackByStageMUITableProps) => {
  const columns = TrackByStageColumnHelper(); //s


  useEffect(() => {
    const columnVisibility = getColumnVisibility(columns, hiddenColumns);
    table.setColumnVisibility(columnVisibility);
  }, [hiddenColumns]);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const [enabledGetTrackingDetails, setEnabledGetTrackingDetails] = useState(false);
  const [trackingParams, setTrackingParams] = useState<RMAGetTrackingDetailRequestDTO | undefined>(undefined);
  const getTrackingDetails = useGetRMATrackingDetails(trackingParams, enabledGetTrackingDetails);
  const [openTrackingDetailsDialog, setOpenTrackingDetailsDialog] = useState(false);

  const table = useMaterialReactTable({
    columns,
    data,
    enableStickyHeader: true,
    initialState: {
      density: "compact",
      columnPinning: { left: ["ModelName"], right: ["Total"] },
    },

    enableColumnActions: false,
    enableColumnFilters: false,
    enableSorting: false,
    enableColumnDragging: false,
    enableRowSelection: enableRowSelection,
    enableDensityToggle: true,
    enableBottomToolbar: true,
    enableTopToolbar: true,
    enableColumnOrdering: true,
    enablePagination: true,
    enableHiding: false,
    enableColumnPinning: true,


    muiTableBodyRowProps: ({ row }) => ({
      onClick: row.getToggleSelectedHandler(),
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
        caption: {
          captionSide: "top",
        },
        cursor: "pointer",
      },
    }),

    state: { rowSelection },
    onRowSelectionChange: (selectedRows) => {
      setRowSelection(selectedRows);
    },

    positionToolbarAlertBanner: "bottom",
    // muiSearchTextFieldProps: {
    //   size: "small",
    //   variant: "outlined",
    // },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 20, 30],
      shape: "rounded",
      variant: "outlined",
      showFirstButton: false,
      showLastButton: false,
      showRowsPerPage: false,
    },
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.paper, //change default background color
    }),

muiTableHeadCellProps: {
  sx: {
    border: "1px solid rgba(81, 81, 81, .5)",
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    backgroundColor: muiTableHeaderCellColor,
    whiteSpace: "normal",
    wordWrap: "break-word",
    wordBreak: "break-all",
   // display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .Mui-TableHeadCell-Content": {
      justifyContent: "center",
    },
    "& .MuiTableSortLabel-root": {
      flexDirection: "column",
    },
  },
},
    // muiTableFooterCellProps: {
    //   sx: {
    //     border: "1px solid rgba(81, 81, 81, .5)",
    //     alignItems: "center",
    //     textAlign: "center",
    //     color: "black",
    //     backgroundColor: muiTableHeaderCellColor,
    //     fontWeight: "bold",
    //   },
    // },
    muiTableBodyCellProps: ({ cell }) => ({
      onClick: (event) => {
        event.stopPropagation(); // Prevent row selection
        const isFirstColumn = cell.column.columnDef.id === "ModelName";
        if (isFirstColumn) return;
        const cellValue = cell.getValue();
        if (Number.isNaN(cellValue)) return;
        if (cellValue === null || cellValue === undefined || cellValue == "0") return;

        const columnKey = cell.column.columnDef.id;
       // const firstColumnValue = cell.row.original.ModelName; //[firstColumn.accessorKey ];
        setTrackingParams({
          rMANumber: null,
          stage: columnKey,
          //modelName: firstColumnValue,
          GetRequestByrMANumber: false,
        });
        setEnabledGetTrackingDetails(true);
        // getTrackingDetails.refetch();
      },
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
      },
    }),
  });
  useEffect(() => {
    if (getTrackingDetails.isSuccess) {
      console.log("Tracking Details", getTrackingDetails.data);
      setOpenTrackingDetailsDialog(true);
    } else if (getTrackingDetails.error) {
      alert("Error Fetching Tracking Details");
      alert((getTrackingDetails.error as unknown as ProblemDetails).title);
    }
  }, [getTrackingDetails.isSuccess, getTrackingDetails.isFetching, getTrackingDetails.data]);

  const handleTrackingDetailsDialogClose = () => {
    setOpenTrackingDetailsDialog(false);
    setEnabledGetTrackingDetails(false);
    setTrackingParams(undefined);
  };
  return (
    <>
      <CircularSpinner
        isFetching={getTrackingDetails.isFetching}
        caption="Fetching Tracking Details..."
      ></CircularSpinner>
      {openTrackingDetailsDialog && trackingParams && (
        <TrackingDetailsDialog
          open={openTrackingDetailsDialog}
          onClose={handleTrackingDetailsDialogClose}
          data={getTrackingDetails.data || []}
          additionalInfo={
            trackingParams?.stage ? ` (${getTrackingDetails.data?.length} quantities  at ${trackingParams?.stage})` : ""
          }
        />
      )}
      <MaterialReactTable table={table} />
    </>
  );
};

export default TrackByStageMUITable;
