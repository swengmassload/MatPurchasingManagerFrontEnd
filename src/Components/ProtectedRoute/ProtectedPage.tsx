import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { IsTokenValidAndFunctionClaimInToken } from "../../Utils/IsTokenValidAndFunctionClaimInToken";
import NotAuthorizedPage from "../Common/NotAuthorizedPage";
import { SideBarMenuName } from "../../Constants/SideBarMenuNames";

interface ProtectedPageProps {
  children: React.ReactNode | React.ReactNode[];
  claim: string;
}

export const ProtectedPage = ({ children, claim }: ProtectedPageProps) => {
  const email = useSelector((state: RootState) => state.loginUser.email);
  const token = useSelector((state: RootState) => state.loginUser.token);

  if (!email) {
  //  return <Navigate to="/NoAuthPage" />;
    return <Navigate to={ SideBarMenuName.NoAuthPage.route} />;

   ;
  }

  const allowed = IsTokenValidAndFunctionClaimInToken(claim, token);

  if (!allowed) {
  
    return <NotAuthorizedPage />;
  }

  return <>{children}</>;
};
