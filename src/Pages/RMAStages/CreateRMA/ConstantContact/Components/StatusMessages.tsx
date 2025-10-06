import React from "react";
import { Box, Typography } from "@mui/material";

interface StatusMessagesProps {
  successMessage?: string;
  isLoading?: boolean;
  ishasConstantContactToken?: boolean;
  error?: Error | null;
}

const StatusMessages: React.FC<StatusMessagesProps> = ({
  successMessage,
  isLoading,
  ishasConstantContactToken,
  error,
}) => {
  return (
    <>
      {/* Success Message */}
      {successMessage && (
        <Box
          sx={{
            mb: 3,
            p: 2,
            backgroundColor: "#e8f5e8",
            border: "1px solid #4caf50",
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" sx={{ color: "#2e7d32", fontWeight: 500 }}>
            {successMessage}
          </Typography>
        </Box>
      )}

      {/* Loading State */}
      {isLoading && (
        <Box
          sx={{
            mb: 3,
            p: 2,
            backgroundColor: "#e3f2fd",
            border: "1px solid #2196f3",
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" sx={{ color: "#1565c0" }}>
             searching...
          </Typography>
        </Box>
      )}

      {/* Token Checking State */}
      {ishasConstantContactToken && (
        <Box
          sx={{
            mb: 3,
            p: 2,
            backgroundColor: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" sx={{ color: "#856404" }}>
            Found existing valid token...
          </Typography>
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Box
          sx={{
            mb: 3,
            p: 2,
            backgroundColor: "#ffebee",
            border: "1px solid #f44336",
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" sx={{ color: "#c62828" }}>
            Error: {error?.message || "Failed to search contacts"}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default StatusMessages;
