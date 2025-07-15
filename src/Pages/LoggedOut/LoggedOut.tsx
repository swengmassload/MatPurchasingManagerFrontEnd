import { Box } from "@mui/material";
import assets from "../../assets";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTokenNameBarcode } from "../../Redux/State/LoginUserSlice";
import { ConstantContactSearchEmailKey, RMAUserStorageKey } from "../../Constants/APINames";

const LoggedOut = () => {
  document.title = "Logged Out Page";
  const dispatch = useDispatch();
  useEffect(() => {

  localStorage.removeItem(ConstantContactSearchEmailKey);
  localStorage.removeItem(RMAUserStorageKey);




    dispatch(
      setTokenNameBarcode({
        token: "",
        userName:"",
        email: "",
       // barcode: "",
      })
    );
  }, []);
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
