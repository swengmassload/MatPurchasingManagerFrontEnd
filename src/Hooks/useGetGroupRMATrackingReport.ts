import { useQuery } from "@tanstack/react-query";
import CRUDApi from "../Api/CRUDApi";
import { BASEAPIURL } from "../Constants/FixValues";
import { RMAManagerEnpoints } from "../Constants/EndPoints";
import { TrackingGroupedProductDTO } from "../Models/RMAManagerModels/Dto";

export const useGetGroupRMATrackingReport = () => {
  return useQuery<TrackingGroupedProductDTO[] | undefined, Error>({
    queryKey: [], // You can use an empty array or a unique value if you want, but it must be an array
    queryFn: () =>
      CRUDApi<TrackingGroupedProductDTO, TrackingGroupedProductDTO>(
        BASEAPIURL + RMAManagerEnpoints.TrackingGroupedRMAProduct
      ).getAllData(),
    gcTime: 0, // Do not cache
    staleTime: 0, // Always stale, always refetch
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};