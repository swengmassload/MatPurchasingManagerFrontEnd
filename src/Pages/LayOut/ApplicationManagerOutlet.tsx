import { Box } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

const ApplicationManagerOutlet = () => {
  const location = useLocation();
  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function() {
      window.history.pushState(null, document.title, window.location.href);
    });
  }, [location]);
  return (
    <Box
   //   component="main"
      sx={{
     //   justifyContent: "center",
       // alignItems: "center",
        flexGrow: 1,
        //overflow: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
         // alignItems: "center",
         // justifyContent: "center",
          textAlign: "center",
         // justifyItems: "center",
        //  mt: 1,
         // mb: 1,
          width: "100%",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default ApplicationManagerOutlet;
