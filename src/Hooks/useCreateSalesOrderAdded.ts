import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CRUDApi from "../Api/CRUDApi";
import { RMAManagerEnpoints } from "../Constants/EndPoints";
import { BASEAPIURL } from "../Constants/FixValues";
import { SalesOrderAddedEventCreateRequestDTO } from "../Models/RMAManagerModels/Dto";
import { QueryKeys } from "../Constants/TanstankQueryKeys";

export const useCreateSalesOrderAdded = () => {
  const queryClient = useQueryClient();
  //
  return useMutation({
    mutationFn: (rmaData: SalesOrderAddedEventCreateRequestDTO) =>
      CRUDApi<SalesOrderAddedEventCreateRequestDTO, SalesOrderAddedEventCreateRequestDTO>(
        BASEAPIURL + RMAManagerEnpoints.SalesOrderAddedEventsEndPoints
      ).addData(rmaData),
    onSuccess: (data) => {
      toast.success(`SalesOrderAdded created successfully! RMA Number: ${data?.rMANumber}`);
      queryClient.invalidateQueries({ queryKey: [data?.rMANumber] });

      queryClient.invalidateQueries({ queryKey: [QueryKeys.useGetRMAByStage.mainKey] });
    },
    onError: (error: any) => {
      console.error("Error creating SalesOrderAdded:", error);
      toast.error("Failed to create SalesOrderAdded. Please try again.");
    },
  });
};
