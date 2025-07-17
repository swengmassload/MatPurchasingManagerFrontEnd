import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchHeader: React.FC = () => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Search sx={{ mr: 2, color: "primary.main", fontSize: 32 }} />
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            fontSize: "1.4rem",
          }}
        >
          Search Constant Contact
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />
    </>
  );
};

export default SearchHeader;
