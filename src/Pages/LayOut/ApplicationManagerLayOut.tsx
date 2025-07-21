import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { SideBarListItems } from "./SideBar/SideBarListItems";
import MassfussionAppBar from "./MassfussionAppBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import ApplicationManagerOutlet from "./ApplicationManagerOutlet";
import { useCallback, useEffect } from "react";
import { sideBardrawerWidth, SideBarMenuName } from "../../Constants/SideBarMenuNames";
import { useNavigate } from "react-router";
import Footer from "./Footer/Footer";
//import { TryJwtDecode } from "../../Utils/TryJwtDecode";
//import { JwtAccessTokenFormat } from "../../Models/JWTModels/JwtAccessTokenFormat";
import { LoginUserStateSliceProps, setTokenNameBarcode } from "../../Redux/State/LoginUserSlice";
import axios from "axios";
import { RMAUserStorageKey } from "../../Constants/APINames";

const AppbarHeight = 120; // Adjust this value based on your app bar height`

export function ApplicationManagerLayOut() {

  console.count("ApplicationManagerLayOut- If this is always count then  there is problem");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const appEmail = useSelector((state: RootState) => state.loginUser).email;

  const handleLogout = useCallback(() => {
    navigate(SideBarMenuName.LoggedOut.route);
  }, []);
  useEffect(() => {
debugger
  
      const RmaUser = JSON.parse(localStorage.getItem(RMAUserStorageKey) || "{}") as LoginUserStateSliceProps;
    if (RmaUser.token) {
      axios.defaults.headers.common["Authorization"] = RmaUser.token;
      //  const decodedresult= TryJwtDecode<JwtAccessTokenFormat>(currentToken);
      dispatch(
         setTokenNameBarcode({ token: RmaUser.token, email: RmaUser.email, userName:RmaUser.userName})
 
      );
    } else if (appEmail === "" || appEmail === undefined || appEmail === null) {
      alert("No Email.. loging out ");
      handleLogout();
    }
  }, [appEmail]);

  const NewDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      overflowX: "none",

      whiteSpace: "nowrap",
      width: sideBardrawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "none",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen((pre) => !pre);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f5f5f5",
        p: 0,
        m: 0,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <MassfussionAppBar appUserEmail={appEmail} handleLogout={handleLogout} barHeight={AppbarHeight} />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          flexDirection: "row",
          width: "100%",
          overflow: "hidden",
          position: "relative",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <NewDrawer variant="permanent" open={open}>
          <SideBarListItems toggleDrawer={toggleDrawer} IsOpen={open} />
        </NewDrawer>
        <ApplicationManagerOutlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default React.memo(ApplicationManagerLayOut);
