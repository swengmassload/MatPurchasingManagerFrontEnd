import { useMutation } from "@tanstack/react-query";
import CRUDApi from "../Api/CRUDApi";
import { MaterialPurchasingManagerEndpoints } from "../Constants/EndPoints";
import { BASEAPIURL } from "../Constants/FixValues";
import { QueryKeys } from "../Constants/TanstankQueryKeys";
import { MaterialRequestDetailsUpdateRequestDTO } from "../Models/MatPurchasingModels/Dto";

export const useUpdateMaterialRequest = () => {
  return useMutation({
    mutationFn: (parts: MaterialRequestDetailsUpdateRequestDTO[]) =>
      CRUDApi<MaterialRequestDetailsUpdateRequestDTO[], MaterialRequestDetailsUpdateRequestDTO>(
        BASEAPIURL + MaterialPurchasingManagerEndpoints.UpdateMaterialRequestEndpoint
      ).updateData(parts),
    meta: {
      successMessage: "Material request updated successfully!",
      errorMessage: "Failed to update material request. Please try again.",
      invalidateQueries: [
        QueryKeys.useCreateMaterialRequestKey.mainKey,
        QueryKeys.useGetMaterialRequestByStage.mainKey,
        QueryKeys.useGetMaterialDetailsByGuidKey.mainKey,
      ],
    },
  });
};
