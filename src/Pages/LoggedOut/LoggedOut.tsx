import { Box } from "@mui/material";
import assets from "../../assets";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTokenNameBarcode } from "../../Redux/State/LoginUserSlice";
import { ConstantContactSearchEmailKey, RMAUserStorageKey } from "../../Constants/APINames";
import { useBlackListToken } from "../../Hooks/useBlackListToken";

const LoggedOut = () => {
  document.title = "Logged Out Page";
  const dispatch = useDispatch();

  const blackListTokenMutation = useBlackListToken();

  useEffect(() => {
    // Move the API call to useEffect so it only runs once on mount
    
  localStorage.removeItem(ConstantContactSearchEmailKey);
  localStorage.removeItem(RMAUserStorageKey);
    blackListTokenMutation.mutateAsync().catch((error) => {
      console.error("Failed to blacklist token:", error);
    });

    // Clear user data from Redux store
    dispatch(
      setTokenNameBarcode({
        token: "",
        userName: "",
        email: "",
      })
    );
  }, [dispatch]); // Include dispatch in dependencies





  return (

      <Box
        component="img"
        src={assets.images.loggedOut}
        sx={{
          paddingRight: "0px",
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
      ></Box>

  );
};

export default LoggedOut;
