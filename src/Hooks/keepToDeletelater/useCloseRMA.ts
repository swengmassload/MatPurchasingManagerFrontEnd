import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CRUDApi from "../../Api/CRUDApi";
import { RMAManagerEnpoints } from "../../Constants/EndPoints";
import { BASEAPIURL } from "../../Constants/FixValues";
import { CloseRMAEventCreateRequestDTO } from "../../Models/RMAManagerModels/Dto";
import { QueryKeys } from "../../Constants/TanstankQueryKeys";

//useCreatePackageReceived

export const useCloseRMA = () => {
  const queryClient = useQueryClient();
  //
  return useMutation({
    mutationFn: (rmaData: CloseRMAEventCreateRequestDTO) =>
      CRUDApi<CloseRMAEventCreateRequestDTO, CloseRMAEventCreateRequestDTO>(
        BASEAPIURL + RMAManagerEnpoints.CloseRMAEventsEndPoints
      ).addData(rmaData),
    onSuccess: (data) => {
      toast.success(`RMA closed successfully! RMA Number: ${data?.rMANumber}`);
      queryClient.invalidateQueries({ queryKey: [data?.rMANumber] });

      queryClient.invalidateQueries({ queryKey: [QueryKeys.useGetRMAByStage.mainKey] });
    },
    onError: (error: any) => {
      console.error("Error closing RMA:", error);
      toast.error("Failed to close RMA. Please try again.");
    },
  });
};
