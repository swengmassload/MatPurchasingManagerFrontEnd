import React from "react";
import { Box, Button } from "@mui/material";

interface FormActionsProps {
  isSubmitting: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ isSubmitting }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, alignItems: "center" }}>
      <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ minWidth: 120 }}>
        {isSubmitting ? "Creating..." : "Create RMA"}
      </Button>
    </Box>
  );
};

export default FormActions;
