import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useLocation,  } from "react-router";
import { AuthUrls } from "../../Constants/FixValues";
import { SideBarMenuName } from "../../Constants/SideBarMenuNames";
import { useCreateApplicationToken } from "../../Hooks/useCreateApplicationToken";

export const useGetAppToken = () => {
 
    console.count("GeneralLanding Counting");
    const navigate = useNavigate();
    const location = useLocation();
    const queryString = new URLSearchParams(location.search);
    console.log(queryString.toString());
    const flightToken = queryString.get('ctx');
    const appCode = queryString.get("key");
    const request = useCreateApplicationToken();
    useEffect(() => {
        console.log("GeneralLanding Count1-flightToken entry");

        if (!flightToken || !appCode) {
         navigate(SideBarMenuName.NoAuthPage.route);
       }
         axios.interceptors.request.use(
           (config) => {
             config.baseURL =  AuthUrls.APPLICATIONTOKEN_BASEURL; // base url for your api.
             config.headers.Authorization = `Bearer ${flightToken}`;
             config.withCredentials = true;
             return config;
           },
         );
       
         axios.interceptors.response.use(
           (response) => response,
           async (error) => {
            
             console.log(error);
             return Promise.reject(error);
           },
         );
     
        
         axios.defaults.headers.common["Authorization" ] = `Bearer ${flightToken}`;


       try {

         request.mutate({applicationCode: appCode});}
        catch (error) {
          console.error("Error requesting app token:", error);
          navigate(SideBarMenuName.NoAuthPage.route);
        }

        
         console.log("GeneralLanding Count2- flightToken added and app token requested");
         console.log(appCode);
  
       }, []);
     
    
    return { request };
    }