import { useQuery } from "@tanstack/react-query";
import {  PurchasingStages } from "../Constants/PurchasingStages";
import CRUDApi from "../Api/CRUDApi";
import { BASEAPIURL } from "../Constants/FixValues";
import { QueryKeys } from "../Constants/TanstankQueryKeys";
import { MaterialPurchasingManagerEnpoints } from "../Constants/EndPoints";
import { PurchasingGetRequestByStage, PurchasingResponseDTO } from "../Models/MatPurchasingModels/Dto";

const isValidStage = (rma: PurchasingGetRequestByStage | null | undefined): boolean => {
  return !!(
    rma?.Stage &&
    rma.Stage.trim() !== "" &&
    PurchasingStages.AllStages.some((stage) => stage.stage === rma.Stage)
  );
};

export const useGetPurchasingByStage = (param: PurchasingGetRequestByStage | undefined, enabledGetProduct: boolean) => {
  return useQuery<PurchasingResponseDTO[] | undefined, Error>({
    queryKey: [QueryKeys.useGetPurchasingByStage.mainKey, { stage: param?.Stage }],
    queryFn: () =>
      CRUDApi<PurchasingGetRequestByStage, PurchasingResponseDTO[]>(
        `${BASEAPIURL}${MaterialPurchasingManagerEnpoints.PurchasingByStage}`
      ).getDataSinglewtQryParams(param as PurchasingGetRequestByStage),
    enabled: isValidStage(param) && enabledGetProduct,
  });
};
