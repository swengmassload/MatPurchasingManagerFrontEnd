import { Box, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../Redux/store";
import ScanStageBarCode from "../../Components/ScanStageBarCode/ScanStageBarCode";
import { MenuName, SideBarMenuName } from "../../Constants/SideBarMenuNames";

const PlayGround = () => {
  const navigate = useNavigate();
  const appEmail = useSelector((state: RootState) => state.loginUser).email;
  const userName = useSelector((state: RootState) => state.loginUser).userName;
  const handleLogout = useCallback(() => {
    navigate(SideBarMenuName.LoggedOut.route);
  }, []);

  const [specialBarcodeMenu, setSpecialBarcodeMenu] = useState<MenuName | undefined>(undefined);

  useEffect(() => {
    if (appEmail === "" || appEmail === undefined || appEmail === null) {
      alert("No Email.. loging out ");
      handleLogout();
    }
  }, [appEmail, handleLogout]);
  const performRouteToStageHandler = (menu: MenuName) => {
    if (menu) {
      navigate(`/dashboard/${menu.route}`);
    } else {
      console.log("Invalid special barcode:");
    }
  };
  useEffect(() => {
    if (specialBarcodeMenu) {
      performRouteToStageHandler(specialBarcodeMenu);
    }
  }, [specialBarcodeMenu]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,

        width: "100%",
        alignItems: "center",
        textAlign: "left",
        alignContent: "center",

      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Typography
          style={{
            fontFamily: "Inter",
            fontSize: "26px",
            fontWeight: "600",
            lineHeight: "39px",
            letterSpacing: "-0.01em",
            textAlign: "center",
          }}
        >
          Welcome to
        </Typography>
        <Typography
          style={{
            //paddingLeft: "5px",
            fontFamily: "Inter",
            fontSize: "26px",
            fontWeight: "800",
            lineHeight: "39px",
            letterSpacing: "-0.01em",
            textAlign: "center",
          }}
        >
          &nbsp;RMA Manager,
        </Typography>
        <Typography
          style={{
            fontFamily: "Inter",
            fontSize: "26px",
            fontWeight: "600",
            lineHeight: "39px",
            letterSpacing: "-0.01em",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          &nbsp; {userName}
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            fontFamily: "Inter",
            fontSize: "22px",
            fontWeight: "400",
            lineHeight: "33px",
            letterSpacing: "-0.01em",
            textAlign: "center",
          }}
        >
          Please read the barcode at your stage or select an option from the left menu to proceed.
        </Typography>

        <Typography
          style={{
            fontFamily: "Inter",
            fontSize: "34px",
            fontWeight: "600",

            letterSpacing: "-0.01em",
            textAlign: "center",
            padding: "0px",
            margin: "0px",
          }}
        >
          ...
        </Typography>

        <ScanStageBarCode
          width={757}
          height={273}
          mt={6}
          pt={6}
          fontSize={28}
          textfieldMarginTop={5}
          textfieldWidth={614}
          setSpecialBarcodeMenu={setSpecialBarcodeMenu}
        />
      </Box>
    </Box>
  );
};

export default PlayGround;
