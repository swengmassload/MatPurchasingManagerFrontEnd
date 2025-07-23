import { createMRTColumnHelper } from "material-react-table";

import { Box } from "@mui/material";
import { TrackReport } from "../../../Models/RMAManagerModels/Dto";
import { DefaultRMAStages } from "../../../Constants/RMAStages";

const columnHelper = createMRTColumnHelper<TrackReport>();

export const TrackByStageColumnHelper = (data: TrackReport[]) => {
  const result = [
    // columnHelper.accessor(
    //   "ModelName", //normal accessorKey
    //   {
    //     id: "ModelName", //unique accessorKey
    //     header: "ModelName",
    //     Header: () => {
    //       return (
    //         <Box sx={{ display: "grid", rowGap: 1 }}>
    //           <span>Model</span>
    //           <span>Name</span>
    //         </Box>
    //       );
    //     },
    //     size: 100,
    //     Footer: () => {
    //       return <Box sx={{ fontWeight: "bold" }}>Product Per Stage</Box>;
    //     },
    //   }
    // ),


        columnHelper.accessor((row) => row.LabelSentValue.toString(), {
      header: "Label Sent",
      //id: DefaultRMAStages.LABELSENT.code,
       id: DefaultRMAStages.LABELSENT.stage,
      size: 80,
      enableEditing: false,
      Footer: () => {
        const total = data.reduce((sum, item) => sum + (item.LabelSentValue || 0), 0);
        return <Box sx={{ fontWeight: "bold" }}> {total}</Box>;
      },
    }),



    columnHelper.accessor((row) => row.PackageReceivedValue.toString(), {
      header: "Package Received",
      id: DefaultRMAStages.PACKAGERECEIVED.stage,
      size: 80,
      enableEditing: false,
      Footer: () => {
        const total = data.reduce((sum, item) => sum + (item.PackageReceivedValue || 0), 0);
        return <Box sx={{ fontWeight: "bold" }}> {total}</Box>;
      },
    }),

    columnHelper.accessor((row) => row.ProductAssessedValue.toString(), {
      header: "Product Assessed",
      id: DefaultRMAStages.PRODUCTASSESSED.stage,
      size: 80,
      enableEditing: false,
      Footer: () => {
        const total = data.reduce((sum, item) => sum + (item.ProductAssessedValue || 0), 0);
        return <Box sx={{ fontWeight: "bold" }}> {total}</Box>;
      },
    }),

    columnHelper.accessor((row) => row.SalesOrderAddedValue.toString(), {
      header: "Sales Order",
      id: DefaultRMAStages.SALESORDERADDED.stage,
      size: 80,
      enableEditing: false,
      Footer: () => {
        const total = data.reduce((sum, item) => sum + (item.SalesOrderAddedValue || 0), 0);
        return <Box sx={{ fontWeight: "bold" }}> {total}</Box>;
      },
    }),

    columnHelper.accessor((row) => row.RepairInProgressValue.toString(), {
      header: "Repair In Progress",
      id: DefaultRMAStages.REPAIRINPROGRESS.stage,
      size: 80,
      enableEditing: false,
      Footer: () => {
        const total = data.reduce((sum, item) => sum + (item.RepairInProgressValue || 0), 0);
        return <Box sx={{ fontWeight: "bold" }}> {total}</Box>;
      },
    }),
    columnHelper.accessor((row) => row.RMACLOSEDValue.toString(), {
      header: "RMA Closed",
      id: DefaultRMAStages.RMA_CLOSED.stage,
      size: 80,
      enableEditing: false,
      Footer: () => {
        const total = data.reduce((sum, item) => sum + (item.RMACLOSEDValue || 0), 0);
        return <Box sx={{ fontWeight: "bold" }}> {total}</Box>;
      },
    }),
        columnHelper.accessor((row) => row.Total.toString(), {
      header: "Total",
      size: 70,
      Cell: ({ cell }) => <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>{cell.getValue()}</div>,
      Footer: () => {
        const total = data.reduce((sum, item) => sum + (item.Total || 0), 0);
        return <Box sx={{ fontWeight: "bold" }}>Total: {total}</Box>;
      },
    }),
  ];

  return result;
};
