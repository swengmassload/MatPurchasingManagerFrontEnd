import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "../Constants/TanstankQueryKeys"
import { PartsTableResponseDTO } from "../Models/MatPurchasingModels/Dto"
import { MaterialPurchasingManagerEndpoints } from "../Constants/EndPoints"
import { BASEAPIURL } from "../Constants/FixValues"
import CRUDApi from "../Api/CRUDApi"

export const useGetParts = () => {
  return useQuery({
    queryKey: [QueryKeys.useGetPartsKey.mainKey],
    queryFn: () =>
      CRUDApi<PartsTableResponseDTO, PartsTableResponseDTO>(
        BASEAPIURL + MaterialPurchasingManagerEndpoints.PartsTableEndpoint,
      ).getAllData(),
    meta: {
      successMessage: 'Parts fetched successfully!',
      errorMessage: 'Failed to fetch parts. Please try again.',
    },
  })
}