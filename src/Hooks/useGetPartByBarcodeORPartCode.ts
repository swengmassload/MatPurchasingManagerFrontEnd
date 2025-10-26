import { useQuery } from "@tanstack/react-query";
import { PartsSearchParams, PartsTableResponseDTO } from "../Models/MatPurchasingModels/Dto";
import { QueryKeys } from "../Constants/TanstankQueryKeys";
import CRUDApi from "../Api/CRUDApi";
import { MaterialPurchasingManagerEnpoints } from "../Constants/EndPoints";
import { BASEAPIURL } from "../Constants/FixValues";
import { isEmptyOrNil } from "../Utils/isEmptyOrNil";



export const useGetPartByBarcodeORPartCode = (param: PartsSearchParams | undefined,
    enabledGetTrackingDetails: boolean
  ) => {
    return useQuery<PartsTableResponseDTO[] | undefined, Error>({
      queryKey: [QueryKeys.useGetPartByBarcodeoRPartCodeKey.mainKey, { ...QueryKeys.useGetPartByBarcodeoRPartCodeKey.subKeys }],
      queryFn: () =>
        CRUDApi<PartsSearchParams, PartsTableResponseDTO[]>(
          BASEAPIURL + MaterialPurchasingManagerEnpoints.PartsBySpecificsEndpoint
        ).getDataSinglewtQryParams(param as PartsSearchParams),
      enabled: validateTrackingRequest(param) && enabledGetTrackingDetails,
    
    });
  };
  

  const validateBarCodeRequest = (prod: PartsSearchParams): boolean => {
    return !isEmptyOrNil(prod.BarCode?.toString());
  };
  
  const validatePartCodeRequest = (prod: PartsSearchParams): boolean => {
    return !isEmptyOrNil(prod.PartCode as string) ;
  };
  
  const validateDescriptionRequest = (prod: PartsSearchParams): boolean => {
    return  !isEmptyOrNil(prod.Description?.toString());
  };

  const validateSearchTypeRequest = (prod: PartsSearchParams): boolean => {
    return  !isEmptyOrNil(prod.SearchType);
  };


  const validateTrackingRequest = (prod?: PartsSearchParams): boolean => {
    if (!prod) return false;
    if (prod.SearchType === 'BarCode') return validateBarCodeRequest(prod);
    if (prod.SearchType === 'PartCode') return validatePartCodeRequest(prod);
    if (prod.SearchType === 'Description') return validateDescriptionRequest(prod);
    if (prod.SearchType === '') return validateSearchTypeRequest(prod);
   return false;    

}

  
