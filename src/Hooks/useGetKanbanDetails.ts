import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../Constants/TanstankQueryKeys";
import { KanbanContainerResponseDTO } from "../Models/PurchasingModels/Dto";
import CRUDApi from "../Api/CRUDApi";
import { BASEAPIURL } from "../Constants/FixValues";
import { MaterialPurchasingManagerEnpoints } from "../Constants/EndPoints";

export const getUseGetKanbanDetailsQueryOptions = 
  queryOptions
            (
                {
                queryKey: [QueryKeys.useGetKanbanDetailsKey.mainKey],
                queryFn:   () =>
                              CRUDApi<KanbanContainerResponseDTO, KanbanContainerResponseDTO>
                                    ( BASEAPIURL + MaterialPurchasingManagerEnpoints.GetKanbanDetailsEndPoint
                                    ).getAllData(),
                staleTime: Infinity, // This will make sure that the data is never considered stale
                refetchOnWindowFocus: false, // Do not refetch on window focus
                          
            }
           );



const useGetKanbanDetails = () =>  useQuery ({...getUseGetKanbanDetailsQueryOptions,select: (data) => data?.length ? data.map(item => {return {id: item.barcodeCode, title: item.description+"Something"}}) : undefined });




export default useGetKanbanDetails
