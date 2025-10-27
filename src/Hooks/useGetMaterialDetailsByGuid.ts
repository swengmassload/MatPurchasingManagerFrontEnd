import { useQuery } from "@tanstack/react-query";
import CRUDApi from "../Api/CRUDApi";
import { MaterialPurchasingManagerEndpoints } from "../Constants/EndPoints";
import { BASEAPIURL } from "../Constants/FixValues";
import { QueryKeys } from "../Constants/TanstankQueryKeys";
import { MaterialRequestDetailsResponseDTO } from "../Models/MatPurchasingModels/Dto";

interface  MaterialRequestDetailsRequestDTO {
  MaterialRequest?: string;

}


const isValidSerialNo = (
  prod: MaterialRequestDetailsRequestDTO | null | undefined
): boolean => {
  return (
    prod !== undefined &&
    prod !== null &&
    prod?.MaterialRequest !== undefined 
   
  );
};

export const useGetMaterialDetailsByGuid = (
  param: MaterialRequestDetailsRequestDTO | undefined,
  enabledGetMaterial: boolean
) => {

  return useQuery<MaterialRequestDetailsResponseDTO[] | undefined, Error>({
    queryKey: [QueryKeys.useGetMaterialDetailsByGuidKey.mainKey, { materialGuidId: param?.MaterialRequest }],
    queryFn: () =>
      CRUDApi<MaterialRequestDetailsRequestDTO, MaterialRequestDetailsResponseDTO[]>(
               `${BASEAPIURL}${MaterialPurchasingManagerEndpoints.MaterialDetailsRequestByMateriaGuid}`
      ).getDataSinglewtQryParams(param as MaterialRequestDetailsRequestDTO),
    enabled: isValidSerialNo(param) && enabledGetMaterial,
  
  });
};
