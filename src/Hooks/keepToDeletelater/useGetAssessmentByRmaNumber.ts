import { useQuery } from "@tanstack/react-query";

import CRUDApi from "../../Api/CRUDApi";
import { BASEAPIURL } from "../../Constants/FixValues";
import { RMAManagerEnpoints } from "../../Constants/EndPoints";
import { ProductAssessedEventCreateRequestDTO } from "../../Models/RMAManagerModels/Dto";

const isValidRmaNumber = (rmaNumber: string | null | undefined, enabledGetProduct: boolean): boolean => {
  const result = rmaNumber !== null && rmaNumber !== undefined && !isNaN(Number(rmaNumber)) && rmaNumber.trim() !== "";
  const finalResult = result && enabledGetProduct;
  return finalResult;
};

export const useGetAssessmentByRmaNumber = (rmaNumber: string | undefined, enabledGetProduct: boolean) => {
  return useQuery<ProductAssessedEventCreateRequestDTO | undefined, Error>({
    queryKey: [],
    queryFn: () => {
      return CRUDApi<string, ProductAssessedEventCreateRequestDTO>(
        `${BASEAPIURL}${RMAManagerEnpoints.ProductAssessedEventsEndPoints}`
      ).getData(rmaNumber);
    },
    gcTime: 0, // Do not cache
    staleTime: 0, // Always stale, always refetch
    refetchOnMount: true,

    enabled: isValidRmaNumber(rmaNumber, enabledGetProduct),
  });
};
