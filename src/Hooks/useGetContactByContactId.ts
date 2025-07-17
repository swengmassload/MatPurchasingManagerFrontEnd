

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import CRUDApi from "../Api/CRUDApi";
import { BASEAPIURL } from "../Constants/FixValues";
import {  DetailContact } from "../Models/ConstantContactModels/ConstantContactDTO";
import { QueryKeys } from "../Constants/TanstankQueryKeys";
import { RMAManagerEnpoints } from "../Constants/EndPoints";

export interface useGetContactByContactIdProps {
  ContactId: string;
}

export const useGetContactByContactId = (data: useGetContactByContactIdProps | undefined, startSearching: boolean) => {
  const queryResult = useQuery<DetailContact | undefined, Error>({
    queryKey: [QueryKeys.useGetContactByEmailKey.mainKey, data?.ContactId],
    queryFn: () => {
      if (!data?.ContactId) {
        throw new Error("Contact Id is required");
      }
      return CRUDApi<useGetContactByContactIdProps, DetailContact>(
        BASEAPIURL + RMAManagerEnpoints.SearchContactEndPoint
      ).getDataSinglewtQryParams(data);
    },
    enabled: !!data?.ContactId && startSearching, // Only run the query if email exists and search is enabled
  });

  // Log successful responses
  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data) {
      //  alert("Contact search successful!");
      console.log("🎉 Contact search successful! Response data:", queryResult.data);
    }
  }, [queryResult.isSuccess, queryResult.data]);

  return queryResult;
};



