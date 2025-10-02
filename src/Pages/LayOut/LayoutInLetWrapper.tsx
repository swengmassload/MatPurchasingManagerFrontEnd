import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { LayOutHeader } from "../../Components/Common/Headers";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { IsAcccessClaimInToken, IsTokenValid } from "../../Utils/IsTokenValidAndFunctionClaimInToken";
import { useNavigate } from "react-router";
import { SideBarMenuName } from "../../Constants/SideBarMenuNames";
import toast from "react-hot-toast";
import CountdownTimer from "./SideBar/CountdownTimer";

interface LayoutInLetWrapperProps {
  children?: React.ReactNode;
  pageTitle?: string;
  marginleft?: string;
  layOutAccessClaim: string;
}

const LayoutInLetWrapper = ({
  children,
  pageTitle = "",
  marginleft = "50px",
  layOutAccessClaim,
}: LayoutInLetWrapperProps) => {
  const navigate = useNavigate();

  const appUser = useSelector((state: RootState) => state.loginUser);
  const [isAllowed, setIsAllowed] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [sessionExpire, setSessionExpire] = useState(false);

  useEffect(() => {
    if (sessionExpire) {
      toast.error("Your session has expired. Logging out...");
      navigate(SideBarMenuName.LoggedOut.route);
    }
  }, [sessionExpire]);

  useEffect(() => {

    const isTokenvalid =IsTokenValid(appUser?.token);

    if (isTokenvalid.isvalid) {
      const calcRemainingTime = isTokenvalid.exp ? isTokenvalid.exp * 1000 - new Date().getTime() : 0;
      setRemainingTime(calcRemainingTime);

      if (layOutAccessClaim === "") {
        setIsAllowed(true);
      } else {
        const hasAccess = IsAcccessClaimInToken(layOutAccessClaim,  appUser?.token);
        setIsAllowed(hasAccess);

        if (!hasAccess) {
          toast.error(`Access to ${pageTitle} denied for ${ appUser.userName}`);
          setTimeout(() => {
            navigate(SideBarMenuName.dashBoard.route);
          }, 3000);
        }
      }
    } else {
      setIsAllowed(false);
      toast.error(`Log out........${isTokenvalid.message}`);
      setTimeout(() => {
        navigate(SideBarMenuName.LoggedOut.route);
      }, 3000);
    }
  }, [layOutAccessClaim, pageTitle, navigate]);

  const handleSessionExpire = () => {
    setSessionExpire(true);
  };
  return (
    <>
      {isAllowed && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <LayOutHeader>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box> {pageTitle}</Box>

              {remainingTime > 0 && (
                <Box sx={{ ml: "auto", pr: 3 }}>
                  <CountdownTimer initialTimeMs={remainingTime} onExpire={handleSessionExpire} />
                </Box>
              )}
            </Box>
          </LayOutHeader>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // Fixed typo from "colunm" to "column"
              width: "100%",
            }}
          >
            <Box
              sx={{
                ml: marginleft,
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default LayoutInLetWrapper;
