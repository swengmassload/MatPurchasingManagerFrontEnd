import { useQuery } from "@tanstack/react-query";
import CRUDApi from "../../Api/CRUDApi";

import { BASEAPIURL } from "../../Constants/FixValues";
import { ProductManagerEnpoints } from "../../Constants/EndPoints";
import { IndicatorsModel } from "../../Models/ProductmanagerModels/Dto";
import { QueryKeys } from "../../Constants/TanstankQueryKeys";

export const useGetIndicatorsModels = () => {
  return useQuery<IndicatorsModel[] | undefined, Error>({
    queryKey: [QueryKeys.useGetIndicatorsModelsKey.mainKey],
    queryFn: () =>
      CRUDApi<IndicatorsModel, IndicatorsModel>(
        BASEAPIURL + ProductManagerEnpoints.IndicatorsModelEndpoint
      ).getAllData(),
  });
};


