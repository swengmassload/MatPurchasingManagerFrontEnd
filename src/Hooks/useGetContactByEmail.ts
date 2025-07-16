import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import CRUDApi from "../Api/CRUDApi";
import { BASEAPIURL } from "../Constants/FixValues";
import { ConstantContactSearchResponse } from "../Models/ConstantContactModels/ConstantContactDTO";
import { QueryKeys } from "../Constants/TanstankQueryKeys";
import { RMAManagerEnpoints } from "../Constants/EndPoints";

export interface useGetContactByEmailProps {
  email: string;
}

export const useGetContactByEmail = (data: useGetContactByEmailProps | undefined, startSearching: boolean) => {
  const queryResult = useQuery<ConstantContactSearchResponse | undefined, Error>({
    queryKey: [QueryKeys.useGetContactByEmailKey.mainKey, data?.email],
    queryFn: () => {
      if (!data?.email) {
        throw new Error("Email is required");
      }
      return CRUDApi<useGetContactByEmailProps, ConstantContactSearchResponse>(
        BASEAPIURL + RMAManagerEnpoints.SearchEndPoint
      ).getDataSinglewtQryParams(data);
    },
    enabled: !!data?.email && startSearching, // Only run the query if email exists and search is enabled
  });

  // Log successful responses
  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data) {
       // alert("Contact search successful!");
      console.log("🎉 Contact search successful! Response data:", queryResult.data);
      console.log("📊 Number of contacts found:", queryResult.data?.contacts?.length || 0);
      if (queryResult.data?.contacts && queryResult.data.contacts.length > 0) {
        console.log("👤 First contact details:", queryResult.data.contacts[0]);
      }
    }
  }, [queryResult.isSuccess, queryResult.data]);

  return queryResult;
};
