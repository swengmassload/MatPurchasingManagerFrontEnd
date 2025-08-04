import React from "react";
import { Card, CardContent, Typography, Box, Chip, Button, Alert, CircularProgress } from "@mui/material";
import { useConfig, useConfigUrls } from "../../Hooks/useConfig";

/**
 * Configuration Display Component
 * Demonstrates how to use the new configuration system
 */
export const ConfigurationDisplay: React.FC = () => {
  const { config, loading, error, reloadConfig } = useConfig();
  const { buildGatewayUrl, buildFrontendUrl } = useConfigUrls();

  const [urls, setUrls] = React.useState<{
    gateway: string | null;
    dashboard: string | null;
    registration: string | null;
  }>({
    gateway: null,
    dashboard: null,
    registration: null,
  });

  React.useEffect(() => {
    const loadUrls = async () => {
      try {
        const [gateway, dashboard, registration] = await Promise.all([
          buildGatewayUrl("/api"),
          buildFrontendUrl("DASHBOARD_PORT"),
          buildFrontendUrl("REGISTRATIONFRONT_PORT"),
        ]);

        setUrls({
          gateway,
          dashboard,
          registration,
        });
      } catch (error) {
        console.error("Failed to build URLs:", error);
      }
    };

    if (!loading && !error) {
      loadUrls();
    }
  }, [loading, error, buildGatewayUrl, buildFrontendUrl]);

  if (loading) {
    return (
      <Box display="flex" alignItems="center" gap={2} p={2}>
        <CircularProgress size={24} />
        <Typography>Loading configuration...</Typography>
      </Box>
    );
  }

  return (
    <Card sx={{ maxWidth: 600, m: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Application Configuration
        </Typography>

        {error && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Configuration Error: {error}
          </Alert>
        )}

        {config && (
          <Box>
            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                Environment Settings
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                <Chip
                  label={`Stage: ${config.APPLICATIONSTAGE}`}
                  color={config.APPLICATIONSTAGE === "PRODUCTION" ? "error" : "primary"}
                />
                <Chip label={`Server: ${config.GATEWAYSERVERIP}`} variant="outlined" />
                <Chip label={`Protocol: ${config.SERVERPROTOCOL.replace("://", "")}`} variant="outlined" />
              </Box>
            </Box>

            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                Port Configuration
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="body2">Dashboard: {config.DASHBOARD_PORT}</Typography>
                <Typography variant="body2">Registration: {config.REGISTRATIONFRONT_PORT}</Typography>
                <Typography variant="body2">Model Manager: {config.MODELMANAGERFRONT_PORT}</Typography>
                <Typography variant="body2">Product Manager: {config.PRODUCTMANAGERFRONT_PORT}</Typography>
                <Typography variant="body2">Gateway: {config.GATEWAY_PORT}</Typography>
              </Box>
            </Box>

            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                Generated URLs
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="body2">Gateway API: {urls.gateway || "Loading..."}</Typography>
                <Typography variant="body2">Dashboard: {urls.dashboard || "Loading..."}</Typography>
                <Typography variant="body2">Registration: {urls.registration || "Loading..."}</Typography>
              </Box>
            </Box>

            <Box>
              <Button variant="outlined" onClick={reloadConfig} size="small">
                Reload Configuration
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

/**
 * Example Component showing specific config value usage
 */
export const ServerStatusIndicator: React.FC = () => {
  const { config: applicationStage, loading } = useConfig("APPLICATIONSTAGE");

  if (loading) {
    return <CircularProgress size={16} />;
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "PRODUCTION":
        return "error";
      case "STAGING":
        return "warning";
      case "DEVELOPMENT":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Chip
      label={`Environment: ${applicationStage || "Unknown"}`}
      color={getStageColor(applicationStage || "")}
      size="small"
    />
  );
};
