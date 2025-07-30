import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CRUDApi from "../Api/CRUDApi";
import { RMAManagerEnpoints } from "../Constants/EndPoints";
import { BASEAPIURL } from "../Constants/FixValues";
import { QueryKeys } from "../Constants/TanstankQueryKeys";
import { ProductAssessedEventCreateRequestDTO } from "../Models/RMAManagerModels/Dto";

export const useCreateAssessment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rmaData: ProductAssessedEventCreateRequestDTO) =>
      CRUDApi<ProductAssessedEventCreateRequestDTO, ProductAssessedEventCreateRequestDTO>(BASEAPIURL + RMAManagerEnpoints.ProductAssessedEventsEndPoints).addData(
        rmaData
      ),
    onSuccess: (data) => {
     toast.success(`Assessment created successfully! RMA Number: ${data?.rmaNumber ? data.rmaNumber : "N/A"}`);
       queryClient.invalidateQueries({ queryKey: [data?.rmaNumber] });

      queryClient.invalidateQueries({ queryKey: [QueryKeys.useGetRMAByStage.mainKey] });
    }
    ,
    onError: (error: any) => {
      console.error("Error creating Assessment:", error);
      toast.error("Failed to create Assessment. Please try again.");
    },
  });
};
