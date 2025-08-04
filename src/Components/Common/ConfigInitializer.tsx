import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, Alert } from "@mui/material";
import { initializeConfig } from "../../Constants/FixValues";

interface ConfigInitializerProps {
  children: React.ReactNode;
}

/**
 * Component that initializes the configuration before rendering child components
 */
export const ConfigInitializer: React.FC<ConfigInitializerProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initConfig = async () => {
      try {
        await initializeConfig();
        setIsLoading(false);
      } catch (err) {
        console.error("Configuration initialization failed:", err);
        setError(err instanceof Error ? err.message : "Failed to initialize configuration");
        // Even if config fails, we'll continue with fallback values
        setIsLoading(false);
      }
    };

    initConfig();
  }, []);

  if (isLoading) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" gap={2}>
        <CircularProgress size={60} />
        <Typography variant="h6" color="textSecondary">
          Loading Configuration...
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {error && (
        <Alert
          severity="warning"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        >
          Configuration warning: {error}. Using fallback values.
        </Alert>
      )}
      {children}
    </>
  );
};
