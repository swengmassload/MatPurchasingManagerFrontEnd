import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../Constants/TanstankQueryKeys";
import { KanbanContainerResponseDTO } from "../Models/MatPurchasingModels/Dto";
import CRUDApi from "../Api/CRUDApi";
import { BASEAPIURL } from "../Constants/FixValues";
import { MaterialPurchasingManagerEndpoints } from "../Constants/EndPoints";


const useGetKanbanDetails1 = (select:any) => 
    useQuery<KanbanContainerResponseDTO[] | undefined, Error>
            (
                {
                queryKey: [QueryKeys.useGetKanbanDetailsKey.mainKey],
                queryFn:   () =>
                              CRUDApi<KanbanContainerResponseDTO, KanbanContainerResponseDTO>
                                    ( BASEAPIURL + MaterialPurchasingManagerEndpoints.GetKanbanDetailsEndPoint
                                    ).getAllData(),
                staleTime: Infinity, // This will make sure that the data is never considered stale
                refetchOnWindowFocus: false, // Do not refetch on window focus
                select: select // You can transform the data here if needed
            
            }
           );




export default useGetKanbanDetails1
