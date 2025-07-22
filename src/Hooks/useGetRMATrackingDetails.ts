import { useQuery } from "@tanstack/react-query";
import CRUDApi from "../Api/CRUDApi";

import { BASEAPIURL } from "../Constants/FixValues";
import { QueryKeys } from "../Constants/TanstankQueryKeys";

import { isEmptyOrNil } from "../Utils/isEmptyOrNil";
import { RMAGetTrackingDetailRequestDTO } from "../Models/RMAManagerModels/Dto";
import { RMAManagerEnpoints } from "../Constants/EndPoints";

const validateProductIdRequest = (prod: RMAGetTrackingDetailRequestDTO): boolean => {
  return !isEmptyOrNil(prod.rMANumber?.toString());
};

const validateStageModelRequest = (prod: RMAGetTrackingDetailRequestDTO): boolean => {
  return !isEmptyOrNil(prod.stage) ;
};

const validateTrackingRequest = (prod?: RMAGetTrackingDetailRequestDTO): boolean => {
  if (!prod) return false;

  return prod.GetRequestByrMANumber ? validateProductIdRequest(prod) : validateStageModelRequest(prod);
};

export const useGetRMATrackingDetails = (
  param: RMAGetTrackingDetailRequestDTO | undefined,
  enabledGetTrackingDetails: boolean
) => {
  return useQuery<RMAGetTrackingDetailRequestDTO[] | undefined, Error>({
   // queryKey: [QueryKeys.useGetTrackingDetailsKey.mainKey, { ...QueryKeys.useGetTrackingDetailsKey.subKeys }],
        queryKey: [QueryKeys.useGetRMATrackingDetails.mainKey, {...param }],
    queryFn: () =>
      CRUDApi<RMAGetTrackingDetailRequestDTO, RMAGetTrackingDetailRequestDTO[]>(
        `${BASEAPIURL}${RMAManagerEnpoints.GetRMATrackingDetails}`
      ).getDataSinglewtQryParams(param as RMAGetTrackingDetailRequestDTO),
    enabled: validateTrackingRequest(param) && enabledGetTrackingDetails,
  });
};
