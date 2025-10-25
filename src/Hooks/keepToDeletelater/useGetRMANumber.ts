import { useQuery } from "@tanstack/react-query";
import CRUDApi from "../../Api/CRUDApi";
import { BASEAPIURL } from "../../Constants/FixValues";
import { QueryKeys } from "../../Constants/TanstankQueryKeys";
import { RMANextNumberResponseDTO } from "../../Models/RMAManagerModels/Dto";
import { RMAManagerEnpoints } from "../../Constants/EndPoints";
import { useEffect } from "react";

export const useGetRMANumber = () => {
  const queryResult = useQuery<RMANextNumberResponseDTO[] | undefined, Error>({
    queryKey: [QueryKeys.useGetRMANumberKey.mainKey],
    queryFn: () =>
      CRUDApi<RMANextNumberResponseDTO, RMANextNumberResponseDTO>(
        BASEAPIURL + RMAManagerEnpoints.RMANextNumberEndpoint
      ).getAllData(),
    staleTime: 0, // Data is immediately stale
    gcTime: 0, // Don't keep in cache
    refetchOnMount: true, // Always refetch when component mounts
   // refetchOnWindowFocus: true, // Refetch when window gains focus
  });

  // Log successful responses
  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data) {
     // alert("useGetRMANumber search successful!");
      console.log("🎉 useGetRMANumber Response data:", queryResult.data);
    }
  }, [queryResult.isSuccess, queryResult.data]);

  return queryResult;
};
