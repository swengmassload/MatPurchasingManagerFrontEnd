import React from "react";
import { Paper } from "@mui/material";

interface ViewPdfProps {
  fileUrl: string;
  handleCloseDialog: React.Dispatch<React.SetStateAction<boolean>>;
  paperHeight?: string;
}

const ViewPdf: React.FC<ViewPdfProps> = ({
  fileUrl,
  paperHeight = "800px",
}) => {
  return (

      <Paper
        sx={{
          height: paperHeight,
          background: "#dedede",
          borderRadius: "8px",
          overflow: "hidden", // Ensure no overflow
        }}
      >
        <iframe
          id="viewer"
          src={fileUrl}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          onError={(e) => console.error("Error loading PDF:", e)}
        />
      </Paper>
   
  );
};

export default ViewPdf;
