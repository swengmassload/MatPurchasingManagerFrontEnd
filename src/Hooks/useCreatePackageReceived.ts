import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CRUDApi from "../Api/CRUDApi";
import { RMAManagerEnpoints } from "../Constants/EndPoints";
import { BASEAPIURL } from "../Constants/FixValues";

import { PackageReceivedEventCreateRequestDTO } from "../Models/RMAManagerModels/Dto";

export const useCreatePackageReceived = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rmaData: PackageReceivedEventCreateRequestDTO) =>
      CRUDApi<PackageReceivedEventCreateRequestDTO, PackageReceivedEventCreateRequestDTO>(BASEAPIURL + RMAManagerEnpoints.RMACreateEnpoints).addData(
        rmaData
      ),
    onSuccess: (data) => {
         toast.success(`PackageReceived created successfully! RMA Number: ${data?.rMANumber}`);
      queryClient.invalidateQueries({ queryKey: [data?.rMANumber] });
    }
    ,
    onError: (error: any) => {
      console.error("Error creating PackageReceived:", error);
      toast.error("Failed to create PackageReceived. Please try again.");
    },
  });
};
