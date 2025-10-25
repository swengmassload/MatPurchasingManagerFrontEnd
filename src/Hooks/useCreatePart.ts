import { useMutation } from "@tanstack/react-query";
import { PartsTableCreateRequestDTO } from "../Models/MatPurchasingModels/Dto";
import CRUDApi from "../Api/CRUDApi";
import { BASEAPIURL } from "../Constants/FixValues";
import { MaterialPurchasingManagerEnpoints } from "../Constants/EndPoints";
import { QueryKeys } from "../Constants/TanstankQueryKeys";


export const useCreatePart = () => {
  return useMutation({
    mutationFn: (parts: PartsTableCreateRequestDTO) =>
      CRUDApi<PartsTableCreateRequestDTO, PartsTableCreateRequestDTO >(BASEAPIURL + MaterialPurchasingManagerEnpoints.PartsTableEndpoint).addData(parts),
    meta:{
      successMessage: "Part created successfully!",
      errorMessage: "Failed to create part. Please try again.",
      invalidateQueries: [QueryKeys.useGetPartsKey.mainKey]
    }

  });
};







