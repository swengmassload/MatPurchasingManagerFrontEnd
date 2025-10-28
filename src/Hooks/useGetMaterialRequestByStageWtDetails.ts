import { useQuery } from "@tanstack/react-query";
import CRUDApi from "../Api/CRUDApi";
import { MaterialPurchasingManagerEndpoints } from "../Constants/EndPoints";
import { BASEAPIURL } from "../Constants/FixValues";
import { PurchasingStages } from "../Constants/PurchasingStages";
import { QueryKeys } from "../Constants/TanstankQueryKeys";
import {  MaterialRequestWithDetailsResponseDTO } from "../Models/MatPurchasingModels/Dto";


interface MaterialGetRequestByStageDTO {
  Stage?: string;
}
const isValidStage = (materialRequest: MaterialGetRequestByStageDTO | null | undefined): boolean => {
  return !!(
    materialRequest?.Stage &&
    materialRequest?.Stage.trim() !== "" 
    &&
   PurchasingStages.AllStages.some((stg) => stg.code === materialRequest?.Stage)
  );
};

export const useGetMaterialRequestByStageWtDetails = (param: MaterialGetRequestByStageDTO | undefined, enabledGetProduct: boolean) => {

  return useQuery<MaterialRequestWithDetailsResponseDTO | undefined, Error>({
    queryKey: [QueryKeys.useGetMaterialRequestByStageWtDetails.mainKey, { stage: param?.Stage }],
    queryFn: () =>
      CRUDApi<MaterialGetRequestByStageDTO, MaterialRequestWithDetailsResponseDTO>(
        `${BASEAPIURL}${MaterialPurchasingManagerEndpoints.MaterialRequestByStagewtDetails}`
      ).getDataSinglewtQryParams(param as MaterialGetRequestByStageDTO),
      refetchOnWindowFocus: true,
      enabled: isValidStage(param) && enabledGetProduct,
      
     
  });
};



