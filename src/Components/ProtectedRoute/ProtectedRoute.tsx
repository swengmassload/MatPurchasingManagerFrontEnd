import { Navigate, Outlet, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { IsTokenValidAndFunctionClaimInToken } from "../../Utils/IsTokenValidAndFunctionClaimInToken";

interface userClaim {
  claim: string;
}

export const ProtectedRoute = ({ claim }: userClaim) => {
  const location = useLocation();
  const appUser = useSelector((state: RootState) => state.loginUser);

  console.log("ProtectedRoute: ", appUser);
  const allowed = IsTokenValidAndFunctionClaimInToken(claim, appUser?.token);
  const notAuth = !appUser.email || !appUser.token;

  let finalDestination = <></>;
  if (notAuth) {
    finalDestination = <Navigate to="/NoAuthPage" state={{ from: location }} replace />;  
  }
  else if (!allowed) {
    finalDestination = <Navigate to="/Dashboard" state={{ from: location }} replace />;
  } else {
    finalDestination = <Outlet />;
  }

  return (
    <>
      {finalDestination}
    </>
  );
};
