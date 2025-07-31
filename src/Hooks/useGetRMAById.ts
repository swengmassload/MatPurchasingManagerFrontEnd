//useGetProductsByProductId

import { useQuery } from "@tanstack/react-query";
import { RMAResponseDTO } from "../Models/RMAManagerModels/Dto";
import CRUDApi from "../Api/CRUDApi";
import { BASEAPIURL } from "../Constants/FixValues";
import { RMAManagerEnpoints } from "../Constants/EndPoints";


const isValidRmaNumber = (rmaNumber: string | null | undefined, enabledGetProduct: boolean): boolean => {
const result = rmaNumber !== null && rmaNumber !== undefined && !isNaN(Number(rmaNumber)) && rmaNumber.trim() !== "";
const finalResult = result && enabledGetProduct;
      return finalResult;
};

export const useGetRMAById = (rmaNumber: string | undefined, enabledGetProduct: boolean) => {
  return useQuery<RMAResponseDTO | undefined, Error>({

    queryKey: [],
    queryFn: () => {
      return CRUDApi<string , RMAResponseDTO>(
        `${BASEAPIURL}${RMAManagerEnpoints.RMAEndpoints}`
      ).getData(rmaNumber);
    },
    gcTime: 0, // Do not cache
    staleTime: 0, // Always stale, always refetch
    refetchOnMount: true,

    enabled: isValidRmaNumber(rmaNumber, enabledGetProduct),

  });
};
