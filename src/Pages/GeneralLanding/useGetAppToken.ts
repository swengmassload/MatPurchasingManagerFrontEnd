import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { SideBarMenuName } from "../../Constants/SideBarMenuNames";
import { useCreateApplicationToken } from "../../Hooks/keepToDeletelater/useCreateApplicationToken";

import { AUTHAPINAME } from "../../Constants/APINames";
import { getConfig } from "../../Services/ConfigService";

export const useGetAppToken = () => {
  console.count("GeneralLanding Counting");
  const navigate = useNavigate();
  const location = useLocation();
  const queryString = new URLSearchParams(location.search);

  const flightToken = queryString.get("ctx");
  const appCode = queryString.get("key");
  const request = useCreateApplicationToken();

  useEffect(() => {
    const setupAuthAndRequest = async () => {
      console.log("GeneralLanding Count1-flightToken entry");

      if (!flightToken || !appCode) {
        navigate(SideBarMenuName.NoAuthPage.route);
        return;
      }

      try {
        const newAuthUrlBase = await getConfig("GATEWAYSERVERIP");
        const newAuthUrl = `${newAuthUrlBase}/${AUTHAPINAME}/access_token`;
     

        axios.interceptors.request.use((config) => {
          // config.baseURL =  AuthUrls.APPLICATIONTOKEN_BASEURL; // base url for your api.
          config.baseURL = newAuthUrl; // base url for your api.
          config.headers.Authorization = `Bearer ${flightToken}`;
          config.withCredentials = true;
          return config;
        });

        axios.interceptors.response.use(
          (response) => response,
          async (error) => {
            console.log(error);
            return Promise.reject(error);
          }
        );

        axios.defaults.headers.common["Authorization"] = `Bearer ${flightToken}`;

        request.mutate({ applicationCode: appCode });

        console.log("GeneralLanding Count2- flightToken added and app token requested");
        console.log(appCode);
      } catch (error) {
        console.error("Error requesting app token:", error);
        navigate(SideBarMenuName.NoAuthPage.route);
      }
    };

    setupAuthAndRequest();
  }, [flightToken, appCode, navigate]);

  return { request };
};
