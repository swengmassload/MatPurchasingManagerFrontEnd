import { useQueryClient, useMutation } from "@tanstack/react-query";
import CRUDApi from "../../Api/CRUDApi";
import {  AuthUrls } from "../../Constants/FixValues";
import { AccessTokenRequest, ITokenGenerationResponse } from "../../Models/JWTModels/TokenGenerationRequest";

export const useCreateApplicationToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AccessTokenRequest) =>
      CRUDApi<AccessTokenRequest, ITokenGenerationResponse>(
        AuthUrls.APPLICATIONTOKEN_BASEURL,
      ).addData(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [data],
      });
    },
  });
};
