import { useMutation } from "@tanstack/react-query";
import CRUDApi from "../Api/CRUDApi";
import { MaterialPurchasingManagerEndpoints } from "../Constants/EndPoints";
import { BASEAPIURL } from "../Constants/FixValues";
import { QueryKeys } from "../Constants/TanstankQueryKeys";
import { MaterialRequestDetailsCreateRequestDTO } from "../Models/MatPurchasingModels/Dto";


export const useCreateMaterialRequest = () => {
  return useMutation({
      mutationFn: (parts: MaterialRequestDetailsCreateRequestDTO[]) =>
      CRUDApi<MaterialRequestDetailsCreateRequestDTO[], MaterialRequestDetailsCreateRequestDTO >(BASEAPIURL 
        + MaterialPurchasingManagerEndpoints.CreateMaterialRequestEndpoint).addData(parts),
    meta:{
      successMessage: "Material request created successfully!",
      errorMessage: "Failed to material  eequest. Please try again.",
      invalidateQueries: [QueryKeys.useCreateMaterialRequestKey.mainKey]
    }

  });
}

