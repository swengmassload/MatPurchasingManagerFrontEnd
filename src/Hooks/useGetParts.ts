import { useQuery } from "@tanstack/react-query"

export const useGetParts=()=>{
    useQuery({
        queryKey: ['parts'],
        queryFn: () => fetch('/api/parts').then(res => res.json())
        })
}