import { useQuery } from '@tanstack/react-query'

import { RMASolutionTypeResponseDTO } from '../Models/RMAManagerModels/Dto'
import { BASEAPIURL } from '../Constants/FixValues'
import CRUDApi from '../Api/CRUDApi'
import { RMAManagerEnpoints } from '../Constants/EndPoints'
import { QueryKeys } from '../Constants/TanstankQueryKeys'

export const useGetRMASolutionTypes = () => {
  return  useQuery<RMASolutionTypeResponseDTO[] | undefined, Error>({
      queryKey: [QueryKeys.useGetRMASolutionTypesKey.mainKey],
      queryFn: () =>
        CRUDApi<RMASolutionTypeResponseDTO, RMASolutionTypeResponseDTO>(
          BASEAPIURL + RMAManagerEnpoints.GetRMASolutionTypesEndPoint
        ).getAllData(),
      staleTime: Infinity, // This will make sure that the data is never considered stale
      refetchOnWindowFocus: false, // Do not refetch on window focus
    })
}


