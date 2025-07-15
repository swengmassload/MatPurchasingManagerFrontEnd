// src/pages/OAuthCallback.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
//import api from "../../../../Hooks/api";
import { userId } from "../../../../Constants/APINames";
import { SideBarMenuName } from "../../../../Constants/SideBarMenuNames";

import { useExchangeCodeForToken } from "../../../../Hooks/useExchangeCodeForToken";
//import { useNavigate, useLocation,  } from "react-router";

export interface exchageData {
  code: string;
  userId: string;
}
const OAuthCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const request = useExchangeCodeForToken();

  useEffect(() => {
    const code = params.get("code");

    console.log("OAuth Callback Code:", code);

    if (!code) {
      //navigate("/login");
      alert("Authorization failed. Please try again.");
      return;
    }

    const exchange = async () => {
      try {
   

        await request.mutateAsync({ code, userId });

        // navigate(`${SideBarMenuName.dashBoard.route}/${SideBarMenuName.CreateRMA.route}`);
        // alert("Authorization successful! You can now access your contacts.");
      } catch (error) {
        //navigate("/login");
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
      debugger;
      console.log("Token exchange successful:", request.data);

      // Debug: Log navigation details
      console.log("Navigating to:", `${SideBarMenuName.dashBoard.route}/${SideBarMenuName.CreateRMA.route}`);
      console.log("Dashboard route:", SideBarMenuName.dashBoard.route);
      console.log("CreateRMA route:", SideBarMenuName.CreateRMA.route);

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
