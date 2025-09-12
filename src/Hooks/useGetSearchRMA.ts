import { useQuery } from "@tanstack/react-query";
import CRUDApi from "../Api/CRUDApi";
import { RMAManagerEnpoints } from "../Constants/EndPoints";
import { BASEAPIURL } from "../Constants/FixValues";
import { RMASearchRequestDTO, RMATrackingReportDetailResponseDTO } from "../Models/RMAManagerModels/Dto";
import { QueryKeys } from "../Constants/TanstankQueryKeys";

const validateTrackingRequest = (param: RMASearchRequestDTO | undefined): boolean => {
  if (!param) return false;

  // Add your validation logic here
  return true;
};

export const useGetSearchRMA = (param: RMASearchRequestDTO | undefined, enabledGetTrackingDetails: boolean) => {
  return useQuery<RMATrackingReportDetailResponseDTO[] | undefined, Error>({
    queryKey: [QueryKeys.useGetSearchRMA.mainKey, { ...param }],
    queryFn: () =>
      CRUDApi<RMASearchRequestDTO, RMATrackingReportDetailResponseDTO[]>(
        `${BASEAPIURL}${RMAManagerEnpoints.GetTrackingDetailsBySpecifics}`
      ).getDataSinglewtQryParams(param as RMASearchRequestDTO),
          gcTime: 0, // Do not cache
    staleTime: 0, // Always stale, always refetch
    
    enabled: validateTrackingRequest(param) && enabledGetTrackingDetails,
  });
};
