import { UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import {  ConfigurableUrls } from "../../Constants/FixValues";
import { SideBarMenuName } from "../../Constants/SideBarMenuNames";
import { ITokenGenerationResponse, AccessTokenRequest } from "../../Models/JWTModels/TokenGenerationRequest";
import { setTokenNameBarcode } from "../../Redux/State/LoginUserSlice";
import { TryJwtDecode } from "../../Utils/TryJwtDecode";
import { JwtAccessTokenFormat } from "../../Models/JWTModels/JwtAccessTokenFormat";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

interface useAddAppTokenAndLoadAppProps {
    request: UseMutationResult<ITokenGenerationResponse | undefined, Error, AccessTokenRequest, unknown>
}

export const useAddAppTokenAndLoadApp = ({request}:useAddAppTokenAndLoadAppProps) => {
  
    const navigate = useNavigate();
     const dispatch = useDispatch();
    useEffect(() => {
  
      const setupAuthAndRequest = async () => {
                if (request.isSuccess) {
     
          const decodedresult= TryJwtDecode<JwtAccessTokenFormat>(request.data!.token);
            if (!decodedresult.result || "" === decodedresult.decoded) {
              console.count("GeneralLanding Count3- no apptoken found");
              console.log(decodedresult);
              navigate(SideBarMenuName.NoAuthPage.route);
            }
           const decoded = decodedresult.decoded! as JwtAccessTokenFormat;
           const apptoken = request.data!.token!;
             const AuthUrl = await ConfigurableUrls.getAuthUrls();
             alert(AuthUrl.APPLICATIONTOKEN_BASEURL);
             console.log("GeneralLanding Count3- apptoken found",AuthUrl);
           axios.interceptors.request.use(
            (config) => {
              config.baseURL =  AuthUrl.APPLICATIONTOKEN_BASEURL; // base url for your api.
              config.headers.Authorization = `Bearer ${apptoken}`;
              config.withCredentials = true;
              return config;
            },
          );
        
         
         
          axios.interceptors.response.use(
            (response) => response,
            async (error) => {
              return Promise.reject(error);
            },
          );
        
          axios.defaults.headers.common["Authorization" ] = `Bearer ${apptoken}`;
          console.log("GeneralLanding Count4= apptoken found added and kept in store",apptoken);
    
            dispatch(
              setTokenNameBarcode({ token: request.data!.token!,   email: decoded["Email"],  userName: decoded["UserName"]})
            );
            console.count("GeneralLanding Count4= apptoken found added and kept in store");
            navigate(SideBarMenuName.dashBoard.route);
        }
        if (request.isError) {
          console.error("Error in useAddAppTokenAndLoadApp:", request.error);
          console.log(request);
          console.count("GeneralLanding Count5 - error in fetching apptoken");
          navigate(SideBarMenuName.NoAuthPage.route);
        }
      }
          setupAuthAndRequest();
    }, [request.isSuccess, request.isError]);



    return {};
};