
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CRUDApi from "../Api/CRUDApi";
import { RMAManagerEnpoints } from "../Constants/EndPoints";
import { BASEAPIURL } from "../Constants/FixValues";
import { LabelSentEventCreateRequestDTO,  } from "../Models/RMAManagerModels/Dto";


export const useCreateSendLabel = () => {
  const queryClient = useQueryClient();
//
  return useMutation({
    mutationFn: (rmaData: LabelSentEventCreateRequestDTO) =>
      CRUDApi<LabelSentEventCreateRequestDTO, LabelSentEventCreateRequestDTO>(BASEAPIURL 
        + RMAManagerEnpoints.LabelSentEventsEndPoints).addData(
        rmaData
      ),
    onSuccess: (data) => {
      toast.success(`LabelSent created successfully! RMA Number: ${data?.rmaNumber}`);
      queryClient.invalidateQueries({ queryKey: [data?.rmaNumber] });
    },
    onError: (error: any) => {
      console.error("Error creating LabelSent:", error);
      toast.error("Failed to create LabelSent   . Please try again.");
    },
  });
};
