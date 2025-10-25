// import { useQuery } from "@tanstack/react-query";
// import { DefaultRMAStages } from "../Constants/PurchasingStages";
// import { RMAGetRequestByStage, RMAResponseDTO } from "../Models/RMAManagerModels/Dto";
// import CRUDApi from "../Api/CRUDApi";
// import { BASEAPIURL } from "../Constants/FixValues";
// import { QueryKeys } from "../Constants/TanstankQueryKeys";
// import { RMAManagerEnpoints } from "../Constants/EndPoints";

// const isValidStage = (rma: RMAGetRequestByStage | null | undefined): boolean => {
//   return !!(
//     rma?.Stage &&
//     rma.Stage.trim() !== "" &&
//     DefaultRMAStages.AllStages.some((stage) => stage.stage === rma.Stage)
//   );
// };

// export const useGetRMAByStage = (param: RMAGetRequestByStage | undefined, enabledGetProduct: boolean) => {
//   return useQuery<RMAResponseDTO[] | undefined, Error>({
//     queryKey: [QueryKeys.useGetRMATrackingDetails.mainKey, { stage: param?.Stage }],
//     queryFn: () =>
//       CRUDApi<RMAGetRequestByStage, RMAResponseDTO[]>(
//         `${BASEAPIURL}${RMAManagerEnpoints.RMAProductByStage}`
//       ).getDataSinglewtQryParams(param as RMAGetRequestByStage),
//     enabled: isValidStage(param) && enabledGetProduct,
//   });
// };
