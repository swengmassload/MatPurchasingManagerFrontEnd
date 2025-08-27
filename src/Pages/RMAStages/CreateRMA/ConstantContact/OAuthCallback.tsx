import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { SideBarMenuName } from "../../../../Constants/SideBarMenuNames";
import { useExchangeCodeForToken } from "../../../../Hooks/useExchangeCodeForToken";
import axios from "axios";
import { RMAUserStorageKey } from "../../../../Constants/APINames";

export interface exchageData {code: string;}
  
const OAuthCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const request = useExchangeCodeForToken();

  useEffect(() => {
    const code = params.get("code");
   
    if (!code) {

      console.error("No code received from Constant Contact.",params);
      alert("No Code back from Constant Contact.");
      return;
    }
     console.log("OAuth Callback Code:", code);
    const exchange = async () => {
      try {  
   /// the token must have been saved in localStorage or state
        const RmaUser = JSON.parse(localStorage.getItem(RMAUserStorageKey) || "{}") as { token?: string };
        if (!RmaUser.token) {
          console.error("No token found in localStorage or state.");
          alert("No token found. Please log in again.");
          return;
        }
        const apptoken = RmaUser.token ;

        axios.defaults.headers.common["Authorization" ] = `Bearer ${apptoken}`;
        await request.mutateAsync({ code });
      } catch (error) {

        console.error("Error exchanging code for token:", error);
        alert("Authorization failed. Please try again.");
      }
    };

    exchange();
  }, []);

  useEffect(() => {
    if (request.isError) {
      console.error("Error in useExchangeCodeForToken:", request.error);
      alert("An error occurred while exchanging the code for a token. Please try again.");
    }
    if (request.isSuccess) {
    
      console.log("Token exchange successful:", request.data);
      console.log("Navigating to:", `${SideBarMenuName.dashBoard.route}/${SideBarMenuName.CreateRMA.route}`);

      navigate(`${SideBarMenuName.dashBoard.route}/${SideBarMenuName.CreateRMA.route}`);
    }
    if (request.isPending) {
      console.log("Token exchange is pending...");
    }
    if (request.isIdle) {
      console.log("Token exchange is idle.");
    }
  }, [request.isError, request.isSuccess, request.isPending, request.data]);

  return <div>Connecting to Constant Contact...</div>;
};

export default OAuthCallback;
