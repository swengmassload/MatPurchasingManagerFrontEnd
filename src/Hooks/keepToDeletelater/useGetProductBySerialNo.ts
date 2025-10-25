import { useQuery } from "@tanstack/react-query";
import CRUDApi from "../../Api/CRUDApi";
import { ProductManagerEnpoints } from "../../Constants/EndPoints";
import { BASEAPIURL } from "../../Constants/FixValues";

import { ProductResponseDTO } from "../../Models/ProductmanagerModels/Dto";
//import { QueryKeys } from "../Constants/TanstankQueryKeys";

const isValidSerialNo = (serialNo: string | null | undefined, enabledGetProduct: boolean): boolean => {
  const result = serialNo !== null && serialNo !== undefined && serialNo !== "";
  const finalResult = result && enabledGetProduct;

  return finalResult;
};

export const useGetProductsByProductId = (productId: string | undefined, enabledGetProduct: boolean) => {
  return useQuery<ProductResponseDTO | undefined, Error>({
    queryKey: ["useGetProductsByProductId", productId],
    queryFn: () => {
      return CRUDApi<string, ProductResponseDTO>(`${BASEAPIURL}${ProductManagerEnpoints.GetProductById}`).getData(
        productId
      );
    },
    gcTime: 0, // Do not cache
    staleTime: 0, // Always stale, always refetch
    refetchOnMount: true,

    enabled: isValidSerialNo(productId, enabledGetProduct),
  });
};
