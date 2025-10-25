import { useQueryClient, useMutation } from "@tanstack/react-query";
import CRUDApi from "../../Api/CRUDApi";
import { BASEAPIURL } from "../../Constants/FixValues";
import {  RMAManagerEnpoints } from "../../Constants/EndPoints";

import { QueryKeys } from "../../Constants/TanstankQueryKeys";
import { RMAReportRequestDTO } from "../../Models/RMAManagerModels/Dto";

export const useGenerateReports = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RMAReportRequestDTO) =>
      CRUDApi<RMAReportRequestDTO, Blob | undefined>(
        BASEAPIURL + RMAManagerEnpoints.GetReportsEndpoint
      ).addDataReturnsBlob(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGenerateReportsKey.mainKey],
      });
    },
  });
};
