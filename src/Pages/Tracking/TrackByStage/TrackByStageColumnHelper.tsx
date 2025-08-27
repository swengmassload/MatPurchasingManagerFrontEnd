import { createMRTColumnHelper } from "material-react-table";

import { TrackReport } from "../../../Models/RMAManagerModels/Dto";
import { DefaultRMAStages } from "../../../Constants/RMAStages";

const columnHelper = createMRTColumnHelper<TrackReport>();

  export const TrackByStageColumnHelper = () => {
  const result = [


    columnHelper.accessor((row) => row.PackageReceivedValue.toString(), {
      header: "RMA Received",
      id: DefaultRMAStages.PACKAGERECEIVED.stage,
      size: 80,
      enableEditing: false,

    }),

    columnHelper.accessor((row) => row.ProductAssessedValue.toString(), {
      header: "Assessment",
      id: DefaultRMAStages.PRODUCTASSESSED.stage,
      size: 80,
      enableEditing: false,

    }),

    columnHelper.accessor((row) => row.SalesOrderAddedValue.toString(), {
      header: "Waiting Sales Order",
      id: DefaultRMAStages.SALESORDERADDED.stage,
      size: 80,
      enableEditing: false,

    }),

    columnHelper.accessor((row) => row.RepairInProgressValue.toString(), {
      header: "Calibration /Repair",
      id: DefaultRMAStages.REPAIRINPROGRESS.stage,
      size: 80,
      enableEditing: false,

    }),

  ];

  return result;
};
