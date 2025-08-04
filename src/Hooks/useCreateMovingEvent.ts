import {  useMutation } from "@tanstack/react-query";
import CRUDApi from "../Api/CRUDApi";
import { ProductManagerEnpoints } from "../Constants/EndPoints";
import { BASEAPIURL } from "../Constants/FixValues";
import { ProductMovingEventCreateRequestDTO } from "../Models/RMAManagerModels/Dto";

export const useCreateProductMovingEvent = () => {
 // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductMovingEventCreateRequestDTO) =>
      CRUDApi<ProductMovingEventCreateRequestDTO, ProductMovingEventCreateRequestDTO>(
        BASEAPIURL + ProductManagerEnpoints.ProductMovingEvents
      ).addData(data),
    onSuccess: () => {
        alert("Product moving event created successfully!");
   //   queryClient.invalidateQueries({   queryKey: [QueryKeys.useGetProductsByProductId.mainKey],  });
     //  queryClient.invalidateQueries({ queryKey: [QueryKeys.useGetDefectLogsKey.mainKey],  });
       
    
    },
  });
};
