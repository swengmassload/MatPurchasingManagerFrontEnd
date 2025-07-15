import { useMutation, useQueryClient } from "@tanstack/react-query";
import CRUDApi from "../Api/CRUDApi";
import { BASEAPIURL } from "../Constants/FixValues";
import { RMACreateRequestDTO } from "../Models/RMAManagerModels/Dto";
import toast from "react-hot-toast";

// TODO: Update this endpoint when you have your RMA API ready
const RMA_CREATE_ENDPOINT = "/api/rma/create";

export const useCreateRMA = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (rmaData: RMACreateRequestDTO): Promise<any> => {
      console.log("Creating RMA with data:", rmaData);

      // TODO: Replace with actual API call when backend is ready
      // return CRUDApi<RMACreateRequestDTO, any>(BASEAPIURL + RMA_CREATE_ENDPOINT).postData(rmaData);

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate successful response
      return {
        success: true,
        rmaNumber: Math.floor(Math.random() * 10000) + 1000,
        message: "RMA created successfully",
      };
    },
    onSuccess: (data) => {
      toast.success(`RMA created successfully! RMA Number: ${data.rmaNumber}`);
      // Invalidate and refetch any RMA-related queries
      queryClient.invalidateQueries({ queryKey: ["rma"] });
    },
    onError: (error: any) => {
      console.error("Error creating RMA:", error);
      toast.error("Failed to create RMA. Please try again.");
    },
  });
};
