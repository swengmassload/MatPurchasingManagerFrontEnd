import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CRUDApi from "../Api/CRUDApi";
import { RMAManagerEnpoints } from "../Constants/EndPoints";
import { BASEAPIURL } from "../Constants/FixValues";
import { QueryKeys } from "../Constants/TanstankQueryKeys";
import { ProductRepairQueryDTO } from "../Models/RMAManagerModels/Dto";
//ProductRepairQueryDTO[]
export const useCreateChangeProductStage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rmaData: ProductRepairQueryDTO[]) =>
      CRUDApi<ProductRepairQueryDTO[], unknown>(
        BASEAPIURL + RMAManagerEnpoints.CreateChangeProductStageEndPoints
      ).addData(rmaData),
    onSuccess: () => {
     // toast.success(`Repair in progress created successfully! RMA Number: ${data?.rMANumber ? data.rMANumber : "N/A"}`);
     // queryClient.invalidateQueries({ queryKey: [data?.rMANumber] });
     alert("Product  stages updated successfully, what should I invalidate");
      queryClient.invalidateQueries({ queryKey: [QueryKeys.useGetRMAByStage.mainKey] });
    },
    onError: (error: any) => {
      console.error("Error creating Repair in progress:", error);
      toast.error("Failed to create Repair in progress. Please try again.");
    },
  });
};
