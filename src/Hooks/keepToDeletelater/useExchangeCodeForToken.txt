import { useQueryClient, useMutation } from "@tanstack/react-query";
import CRUDApi from "../Api/CRUDApi";
import { BASEAPIURL } from "../Constants/FixValues";
import { exchageData } from "../Pages/RMAStages/CreateRMA/ConstantContact/OAuthCallback";
import { RMAManagerEnpoints } from "../Constants/EndPoints";

export const useExchangeCodeForToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: exchageData) =>
      CRUDApi<exchageData, unknown>(
        BASEAPIURL + RMAManagerEnpoints.ExchangeEndPoint
      ).addData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["data.code"],
      });
    },
  });
};
