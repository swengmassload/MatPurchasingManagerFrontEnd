import { useQuery } from "@tanstack/react-query";
import CRUDApi from "../Api/CRUDApi";
import { BASEAPIURL } from "../Constants/FixValues";

import { UsersAndRoleDTO, UsersCreateRequestDTO } from "../Models/RegistrationModels/UsersCreateRequestDTO";
import { RegistrationEnpoints } from "../Constants/EndPoints";

export const useGetUser = (id: string) => {
  return useQuery<UsersAndRoleDTO | undefined, Error>({
    queryKey: [id],
    queryFn: () =>
      CRUDApi<UsersCreateRequestDTO, UsersAndRoleDTO>(
        BASEAPIURL + RegistrationEnpoints.UsersEndpoint
      ).getData(id),
  });
};



export const useGetUsers = () => {
  return useQuery<UsersAndRoleDTO[] | undefined, Error>({
    queryKey: ["UsersResponseDTOKey"],
    queryFn: () =>
      CRUDApi<UsersCreateRequestDTO, UsersAndRoleDTO>(
        BASEAPIURL+ RegistrationEnpoints.UsersEndpoint
      ).getAllData(),
  });
};
