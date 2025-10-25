import { useQuery } from "@tanstack/react-query";
import {  RMAManagerEnpoints } from "../../Constants/EndPoints";
import { BASEAPIURL } from "../../Constants/FixValues";
import { RMAProblemTypeResponseDTO } from "../../Models/RMAManagerModels/Dto";
import CRUDApi from "../../Api/CRUDApi";
import { QueryKeys } from "../../Constants/TanstankQueryKeys";


export const useGetRMAProblemTypes = () => {
  return  useQuery<RMAProblemTypeResponseDTO[] | undefined, Error>({
    queryKey: [QueryKeys.useGetRMAProblemTypesKey.mainKey],
    queryFn: () =>
      CRUDApi<RMAProblemTypeResponseDTO, RMAProblemTypeResponseDTO>(
        BASEAPIURL + RMAManagerEnpoints.GetRMAProblemTypesEndPoint
      ).getAllData(),
    staleTime: Infinity, // This will make sure that the data is never considered stale
    refetchOnWindowFocus: false, // Do not refetch on window focus
  });
}

