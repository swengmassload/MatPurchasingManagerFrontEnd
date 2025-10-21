// import { useEffect, useState } from "react";
// import { TrackingGroupedProductDTO, TrackReport } from "../../../Models/RMAManagerModels/Dto";
// import { useGetGroupRMATrackingReport } from "../../../Hooks/useGetGroupRMATrackingReport";
// import { TabHeader } from "../../../Components/Common/Headers";
// import CircularSpinner from "../../../Components/Common/CircularSpinner";
// import TrackByStageMUITable from "./TrackByStageMUITable";
// import { GetTrackReportForRMA } from "./GetTrackReportForRMA";
// import { Box } from "@mui/material";

// interface TrackByStageProps {}

// function ConvertTrackingGroupedProductDTOToTrackReport(data: TrackingGroupedProductDTO[]): undefined | TrackReport[] {
//   if (!data) return undefined;

//   if (data.length === 0) return undefined;

//   console.log("ConvertTrackingGroupedProductDTOToTrackReport", data);

//  const result: TrackReport[] = [];

//     const trackReport = GetTrackReportForRMA(data);

//     result.push(trackReport);

//  // });
//   return result;
// }
// const TrackByStage = ({}: TrackByStageProps) => {
//   const [trackingData, setTrackingData] = useState<TrackReport[] | undefined>([]);
//   const request = useGetGroupRMATrackingReport();

//   useEffect(() => {
//     if (request.isSuccess && request.data) {
//       const conveterdData = ConvertTrackingGroupedProductDTOToTrackReport(request.data);

//       setTrackingData(conveterdData);
//     }
//   }, [request.isSuccess]);

//   return (
//     <>
//       <TabHeader textAlign="left">Track by Production Stages</TabHeader>
//        <CircularSpinner isFetching={request.isFetching} caption="Loading..."></CircularSpinner>
// <Box  sx={{ width: "100%", height: "100%", overflow: "auto" ,pl: 5,pr: 50}}>
//   {trackingData && <TrackByStageMUITable data={trackingData} />}
// </Box>
//     </>
//   );
// };

// export default TrackByStage;
