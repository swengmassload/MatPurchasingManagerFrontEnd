import { useMutation } from "@tanstack/react-query";
import CRUDApi from "../Api/CRUDApi";
import { BASEAPIURL } from "../Constants/FixValues";

export const useBlackListToken = () => {
  return useMutation({
    mutationFn: () => CRUDApi<unknown, unknown>(BASEAPIURL + "/blacklist-token").addData(),
    onSuccess: (data) => {
      console.log("Token blacklisted", data);
    },
  });
};
