import { Box, Button, Typography } from "@mui/material";

import { Link, useLocation } from "react-router";

const NotFound = () => {
  const location = useLocation();
  return (
    <Box>
      <Box>
        <Typography>What are you doing @ {location.pathname}</Typography>
      </Box>
      <Link to="/">Please Go back Home </Link>
      <Button
        onClick={() => {
          alert("Nothing was done");
        }}
      >
        {" "}
        Go back Home.......
      </Button>
    </Box>
  );
};

export default NotFound;
