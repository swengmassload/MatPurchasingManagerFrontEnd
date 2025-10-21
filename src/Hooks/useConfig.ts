import { useState, useEffect } from "react";
import { AppConfig, configService } from "../Services/ConfigService";

/**
 * Hook to use configuration values in React components
 * @param key - Specific config key to retrieve, or omit to get full config
 * @returns Object with config value(s), loading state, and error state
 */
export function useConfig(): {
  config: AppConfig | null;
  loading: boolean;
  error: string | null;
  reloadConfig: () => Promise<void>;
};
export function useConfig<K extends keyof AppConfig>(
  key: K
): {
  config: AppConfig[K] | null;
  loading: boolean;
  error: string | null;
  reloadConfig: () => Promise<void>;
};
export function useConfig<K extends keyof AppConfig>(key?: K) {
  const [config, setConfig] = useState<AppConfig | AppConfig[K] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadConfiguration = async () => {
    try {
      setLoading(true);
      setError(null);

      if (key) {
        const value = await configService.getConfig(key);
        setConfig(value);
      } else {
        const fullConfig = await configService.getFullConfig();
        setConfig(fullConfig);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load configuration");
      console.error("Error loading configuration:", err);
    } finally {
      setLoading(false);
    }
  };

  const reloadConfig = async () => {
    try {
      setError(null);
      await configService.reloadConfig();
      await loadConfiguration();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reload configuration");
      console.error("Error reloading configuration:", err);
    }
  };

  useEffect(() => {
    loadConfiguration();
  }, [key]);

  return {
    config,
    loading,
    error,
    reloadConfig,
  };
}

/**
 * Hook for building URLs using configuration
 */
export function useConfigUrls() {
  const { config, loading, error } = useConfig();

  return {
    buildGatewayUrl: async (endpoint?: string) => {
      if (loading || error || !config) return null;
      return await configService.buildGatewayUrl(endpoint);
    },
    buildFrontendUrl: async (
      port: keyof Pick<
        AppConfig,
        "DASHBOARD_PORT" | "REGISTRATIONFRONT_PORT" | "MODELMANAGERFRONT_PORT" | "PRODUCTMANAGERFRONT_PORT"
        | "RMAMANAGERFRONT_PORT" | "MATERIALPURCHASINGFRONT_PORT"
      >,
      path?: string
    ) => {
      if (loading || error || !config) return null;
      return await configService.buildFrontendUrl(port, path);
    },
    loading,
    error,
  };
}
