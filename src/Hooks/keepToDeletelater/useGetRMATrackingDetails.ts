import { useQuery } from "@tanstack/react-query";
import CRUDApi from "../../Api/CRUDApi";

import { BASEAPIURL } from "../../Constants/FixValues";
import { QueryKeys } from "../../Constants/TanstankQueryKeys";

import { isEmptyOrNil } from "../../Utils/isEmptyOrNil";
import { RMAGetTrackingDetailRequestDTO, RMATrackingReportDetailResponseDTO } from "../../Models/RMAManagerModels/Dto";
import { RMAManagerEnpoints } from "../../Constants/EndPoints";

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
  return useQuery<RMATrackingReportDetailResponseDTO[] | undefined, Error>({
        queryKey: [QueryKeys.useGetRMATrackingDetails.mainKey, {...param }],
    queryFn: () =>
      CRUDApi<RMAGetTrackingDetailRequestDTO, RMATrackingReportDetailResponseDTO[]>(
        `${BASEAPIURL}${RMAManagerEnpoints.GetRMATrackingDetails}`
      ).getDataSinglewtQryParams(param as RMAGetTrackingDetailRequestDTO),
    enabled: validateTrackingRequest(param) && enabledGetTrackingDetails,
  });
};
