import { useQuery } from "@tanstack/react-query";
import CRUDApi from "../Api/CRUDApi";
import { MaterialPurchasingManagerEndpoints } from "../Constants/EndPoints";
import { BASEAPIURL } from "../Constants/FixValues";
import { PurchasingStages } from "../Constants/PurchasingStages";
import { QueryKeys } from "../Constants/TanstankQueryKeys";
import { MaterialRequestResponseDTO } from "../Models/MatPurchasingModels/Dto";


interface MaterialGetRequestByStageDTO {
  Stage?: string;
}


const isValidStage = (materialRequest: MaterialGetRequestByStageDTO | null | undefined): boolean => {
  return !!(
    materialRequest?.Stage &&
    materialRequest?.Stage.trim() !== "" 
   // &&
  //  PurchasingStages.AllStages.some((stg) => stg.stage === materialRequest?.Stage)
  );
};

export const useGetMaterialRequestByStage = (param: MaterialGetRequestByStageDTO | undefined, enabledGetProduct: boolean) => {

  return useQuery<MaterialRequestResponseDTO[] | undefined, Error>({
    queryKey: [QueryKeys.useGetMaterialRequestByStage.mainKey, { stage: param?.Stage }],
    queryFn: () =>
      CRUDApi<MaterialGetRequestByStageDTO, MaterialRequestResponseDTO[]>(
        `${BASEAPIURL}${MaterialPurchasingManagerEndpoints.MaterialRequestByStage}`
      ).getDataSinglewtQryParams(param as MaterialGetRequestByStageDTO),
    enabled: isValidStage(param) && enabledGetProduct,
  });
};




