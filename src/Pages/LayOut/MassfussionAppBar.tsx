import { AppBar, Toolbar, Box, IconButton, Typography, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import assets from "../../assets";
import { TwinklingBadge } from "./TwinklingBadge";
import { APPLICATIONSTAGE } from "../../Constants/FixValues";

interface DashboardAppBarProps {
  appUserEmail: string;
  handleLogout: () => void;
  barHeight?: number;
}

const MassfussionAppBar = ({ appUserEmail, handleLogout, barHeight }: DashboardAppBarProps) => {
  function removeMassloadFromEmail(appUserEmail: string): string {
    return appUserEmail.replace("@massload.com", "");
  }
  return (
    <AppBar position="static" sx={{ backgroundColor: "black", width: "100%", height: barHeight }}>
      <Toolbar disableGutters sx={{ paddingRight: "50px", height: barHeight }}>
        <Box
          component="img"
          src={assets.images.dashboardlogo}
          alt="Company Logo"
          sx={{
            // width: "296px",
            //height: "114px"
            width: "356px",
            height: "84px",
            mr: 2,
            ml: 6,
          }}
        ></Box>
        <IconButton edge="start" color="inherit" aria-label="close">
          <Typography
            data-testid="dashboard-name"
            color="white"
            sx={{
              fontFamily: "Inter",
              fontSize: "32px",
              fontWeight: 700,
              pl: 50,
              lineHeight: "38.73px",
              letterSpacing: "-0.015em",
              textAlign: "center",
            }}
          >
            {/* {Fixedvalues.DASHBOARD_NAME} */}
          </Typography>
        </IconButton>
          {APPLICATIONSTAGE == "PRODUCTION" ? <></> : <TwinklingBadge>STAGING DEPLOYMENT FOR TESTING PURPOSES ONLY</TwinklingBadge>}
  
        <Box flexGrow={1} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography
            variant="h6"
            color="inherit"
            sx={{
              fontFamily: "Inter",
              fontSize: "22px",
              fontWeight: 800,
              lineHeight: "26.63px",
              letterSpacing: "-0.015em",
              textAlign: "left",
            }}
          >
            {removeMassloadFromEmail(appUserEmail)}
          </Typography>
          <Typography
            variant="h6"
            color="inherit"
            sx={{
              fontFamily: "Inter",
              fontSize: "22px",
              fontWeight: 500,
              lineHeight: "26.63px",
              letterSpacing: "-0.015em",
              textAlign: "left",
              mr: 2,
            }}
          >
            {" "}
            {"@massload.com"}
          </Typography>
        </Box>
        <Button color="secondary" variant="contained" onClick={handleLogout} startIcon={<AccountCircleIcon />}>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: "18px",
              fontWeight: 800,
              lineHeight: "21.78px",
              letterSpacing: "-0.015em",
              textAlign: "center",
              width: "62px",
              height: "22px",
            }}
          >
            Logout
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MassfussionAppBar;
