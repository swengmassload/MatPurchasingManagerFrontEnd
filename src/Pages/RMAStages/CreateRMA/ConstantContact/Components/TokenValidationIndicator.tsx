import React from "react";
import { Typography } from "@mui/material";
import { ValidToken } from "../../../../../Hooks/useGetConfirmIfUserHasExistingValidToken";

interface TokenValidationIndicatorProps {
  tokenValidationResult?: ValidToken;
}

const TokenValidationIndicator: React.FC<TokenValidationIndicatorProps> = ({ tokenValidationResult }) => {
  return (
    <>
      {tokenValidationResult?.isValid ? (
        <Typography variant="body2" sx={{ color: "success.main", ml: 2 }}>
          Valid Token
        </Typography>
      ) : (
        <Typography variant="body2" sx={{ color: "warning.main", ml: 2 }}>
          No Valid Token
        </Typography>
      )}
    </>
  );
};

export default TokenValidationIndicator;
