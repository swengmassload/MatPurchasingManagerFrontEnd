import React from "react";
import { Box } from "@mui/material";

const ProductSelectPlaceholder: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "20%",
      minWidth: 120,
      p: 3,
      mt: 8,
      background: "linear-gradient(135deg, #e3f2fd 0%, #fff 100%)",
      borderRadius: 3,
      boxShadow: 2,
      border: "1px dashed #90caf9",
    }}
  >
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" >
      <circle cx="12" cy="12" r="10" fill="#90caf9" />
      <path d="M12 8V16M8 12H16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <Box sx={{ mt: 2 }}>
      <span
        style={{
          fontSize: "1.15rem",
          fontWeight: 500,
          color: "#1976d2",
          letterSpacing: "0.02em",
        }}
      >
        Select RMA number to view details
      </span>
    </Box>
    <Box sx={{ mt: 1, color: "#666", fontSize: "0.95rem", textAlign: "center" }}>
      Click on a number from the list to see its information and event history.
    </Box>
  </Box>
);

export default ProductSelectPlaceholder;
