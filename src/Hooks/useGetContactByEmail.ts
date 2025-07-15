import { useQuery } from "@tanstack/react-query";
import CRUDApi from "../Api/CRUDApi";
import { BASEAPIURL } from "../Constants/FixValues";
import { SearchEndPoint } from "../Constants/APINames";
import { ConstantContactSearchResponse } from "../Models/ConstantContactModels/ConstantContactDTO";

export interface useGetContactByEmailProps {
  email: string;
}

export const useGetContactByEmail = (data: useGetContactByEmailProps | undefined, startSearching: boolean) => {
  console.log("BASEAPIURL:", BASEAPIURL);
  console.log("SearchEndPoint:", SearchEndPoint);

  return useQuery<ConstantContactSearchResponse | undefined, Error>({
    queryKey: ["contact", "email", data?.email, startSearching],
    queryFn: () => {
      if (!data?.email) {
        throw new Error("Email is required");
      }
      return CRUDApi<useGetContactByEmailProps, ConstantContactSearchResponse>(
        BASEAPIURL + SearchEndPoint
      ).getDataSinglewtQryParams(data);
    },
    enabled: !!data?.email && startSearching, // Only run the query if email exists and search is enabled
  });
};
