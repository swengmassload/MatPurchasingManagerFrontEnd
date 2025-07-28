import { useMutation, useQueryClient } from "@tanstack/react-query";
import CRUDApi from "../Api/CRUDApi";
import { BASEAPIURL } from "../Constants/FixValues";
import { RMACreateRequestDTO, RMAResponseDTO } from "../Models/RMAManagerModels/Dto";
import toast from "react-hot-toast";
import { QueryKeys } from "../Constants/TanstankQueryKeys";
import { RMAManagerEnpoints } from "../Constants/EndPoints";


export const useCreateRMA = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rmaData: RMACreateRequestDTO) =>
      CRUDApi<RMACreateRequestDTO, RMAResponseDTO>(BASEAPIURL + RMAManagerEnpoints.RMACreateEndpoints).addData(
        rmaData
      ),
    onSuccess: (data) => {
         toast.success(`RMA created successfully! RMA Number: ${data?.rMANumber}`);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.useCreateRMAKey.mainKey] });
    }
    ,
    onError: (error: any) => {
      console.error("Error creating RMA:", error);
      toast.error("Failed to create RMA. Please try again.");
    },
  });
};
