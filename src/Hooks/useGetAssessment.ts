
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import CRUDApi from "../Api/CRUDApi";
import { BASEAPIURL } from "../Constants/FixValues";
import { QueryKeys } from "../Constants/TanstankQueryKeys";
import { RMAManagerEnpoints } from "../Constants/EndPoints";
import { ProductAssessedEventCreateRequestDTO } from "../Models/RMAManagerModels/Dto";

export interface useGetAssessmentByRMANumberProps {
  RmaNumber: number;
}

export const useGetAssessmentByRMANumber = (data: useGetAssessmentByRMANumberProps | undefined, startSearching: boolean) => {
  const queryResult = useQuery<ProductAssessedEventCreateRequestDTO | undefined, Error>({
    queryKey: [QueryKeys.useGetContactByEmailKey.mainKey, data?.RmaNumber],
    queryFn: () => {
      if (!data?.RmaNumber) {
        throw new Error("RMA Number is required");
      }
      return CRUDApi<useGetAssessmentByRMANumberProps, ProductAssessedEventCreateRequestDTO>(
        BASEAPIURL + RMAManagerEnpoints.SearchContactEndPoint
      ).getDataSinglewtQryParams(data);
    },
    enabled: !!data?.RmaNumber && startSearching, // Only run the query if email exists and search is enabled
  });

  // Log successful responses
  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data) {
      console.log("🎉 RMA Assessment search successful! Response data:", queryResult.data);
    }
  }, [queryResult.isSuccess, queryResult.data]);

  return queryResult;
};



