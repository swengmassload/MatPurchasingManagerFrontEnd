import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import CRUDApi from "../../Api/CRUDApi";
import { BASEAPIURL } from "../../Constants/FixValues";
import {  SharpSpringResult } from "../../Models/ConstantContactModels/ConstantContactDTO";
import { QueryKeys } from "../../Constants/TanstankQueryKeys";
import { RMAManagerEnpoints } from "../../Constants/EndPoints";

export interface useGetContactByEmailProps {
  contactEmail: string;
}



export const useGetContactInSharpSpringByEmail = (data: useGetContactByEmailProps | undefined, startSearching: boolean) => {
  const queryResult = useQuery<SharpSpringResult | undefined, Error>({
    queryKey: [QueryKeys.useGetContactByEmailKey.mainKey, data?.contactEmail],
    queryFn: () => {
      if (!data?.contactEmail) {
        throw new Error("Email is required");
      }
      return CRUDApi<useGetContactByEmailProps, SharpSpringResult>(
        BASEAPIURL + RMAManagerEnpoints.getContactFromLeads
      ).getDataSinglewtQryParams(data);
    },
    enabled: !!data?.contactEmail && startSearching, // Only run the query if email exists and search is enabled
  });
  // Log successful responses
  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data) {
       // alert("Contact search successful!");
      console.log("🎉 Contact search successful! Response data:", queryResult.data);
      // console.log("📊 Number of contacts found:", queryResult.data?.contacts?.length || 0);
      // if (queryResult.data?.contacts && queryResult.data.contacts.length > 0) {
      //   console.log("👤 First contact details:", queryResult.data.contacts[0]);
      // }
    }
  }, [queryResult.isSuccess, queryResult.data]);

  return queryResult;
};
