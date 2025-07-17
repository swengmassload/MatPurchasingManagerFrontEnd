import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import CRUDApi from "../Api/CRUDApi";
import { BASEAPIURL } from "../Constants/FixValues";
import { QueryKeys } from "../Constants/TanstankQueryKeys";
import { RMAManagerEnpoints } from "../Constants/EndPoints";

export interface useGetConfirmIfUserHasExistingValidTokenProps {
  UserId: string;
}

export const useGetConfirmIfUserHasExistingValidToken = (
  data: useGetConfirmIfUserHasExistingValidTokenProps | undefined,
  startSearching: boolean
) => {
  debugger

  const queryResult = useQuery<ValidToken | undefined, Error>({
    queryKey: [QueryKeys.useGetConfirmIfUserHasExistingValidTokenPropsKey.mainKey, data?.UserId],
    queryFn: () => {
      if (!data?.UserId) {
        throw new Error("User Id is required");
      }
      return CRUDApi<useGetConfirmIfUserHasExistingValidTokenProps, ValidToken>(
        BASEAPIURL + RMAManagerEnpoints.ConfirmIfUserHasExistingValidToken
      ).getDataSinglewtQryParams(data);
    },
    enabled: !!data?.UserId && startSearching, // Only run the query if email exists and search is enabled
  });

  // Log successful responses
  useEffect(() => {
    if (queryResult.isSuccess) {
   
      console.log("🎉 Token validation successful! User has valid token",queryResult.data);
    } else if (queryResult.isError) {
      console.error("Error in useGetConfirmIfUserHasExistingValidToken:", queryResult.error
      );
      alert("An error occurred while validating the token. Please try again.");
    }
  }, [queryResult.isSuccess,queryResult.isError, queryResult.data]);

  return queryResult;
};

export interface ValidToken {
  isValid: boolean;
  message?: string;
}
