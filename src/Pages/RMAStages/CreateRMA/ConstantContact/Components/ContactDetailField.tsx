import React from "react";
import { Box, Typography } from "@mui/material";

interface ContactDetailFieldProps {
  label: string;
  value?: string | number | null | undefined;
  isFlexStart?: boolean;
  children?: React.ReactNode;
}

const ContactDetailField: React.FC<ContactDetailFieldProps> = ({ label, value, isFlexStart = false, children }) => {
  if (!value && !children) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: isFlexStart ? "flex-start" : "center" }}>
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {label}:
      </Typography>
      {children ? (
        children
      ) : (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {value}
        </Typography>
      )}
    </Box>
  );
};

export default ContactDetailField;
