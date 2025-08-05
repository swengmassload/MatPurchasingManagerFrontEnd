export interface AppConfig {
  //ENVIRONMENT: string;
  APPLICATIONSTAGE: string;
  GATEWAYSERVERIP: string;
  SERVERPROTOCOL: string;
  FRONTENDPROTOCOL: string;
  DASHBOARD_PORT: string;
  REGISTRATIONFRONT_PORT: string;
  MODELMANAGERFRONT_PORT: string;
  PRODUCTMANAGERFRONT_PORT: string;
  RMAMANAGERFRONT_PORT: string;
  GATEWAY_PORT: string;
  CLIENTID: string;
  REDIRECTROUTE: string;
  CONSTANTAUTHURL: string;

}

class ConfigService {
  private config: AppConfig | null = null;
  private configPromise: Promise<AppConfig> | null = null;

  /**
   * Loads the configuration from the public/config.json file
   * This method ensures the config is only loaded once and cached
   */
  async loadConfig(): Promise<AppConfig> {
    if (this.config) {
      return this.config;
    }

    if (this.configPromise) {
      return this.configPromise;
    }

    this.configPromise = this.fetchConfig();
    this.config = await this.configPromise;
    return this.config;
  }

  private async fetchConfig(): Promise<AppConfig> {
    try {
      const response = await fetch("/config.json");
      if (!response.ok) {
        throw new Error(`Failed to load config: ${response.status} ${response.statusText}`);
      }
      const config = await response.json();

      // Validate that all required fields are present
      this.validateConfig(config);

      return config as AppConfig;
    } catch (error) {
      console.error("Error loading configuration:", error);
      // Use hardcoded fallback values instead of environment variables
      return this.getFallbackConfig();
    }
  }

  private validateConfig(config: any): void {
    const requiredFields: (keyof AppConfig)[] = [
    //  "ENVIRONMENT",
      "APPLICATIONSTAGE",
      "GATEWAYSERVERIP",
      "SERVERPROTOCOL",
      "FRONTENDPROTOCOL",
      "DASHBOARD_PORT",
      "REGISTRATIONFRONT_PORT",
      "MODELMANAGERFRONT_PORT",
      "PRODUCTMANAGERFRONT_PORT",
      "RMAMANAGERFRONT_PORT",
      "GATEWAY_PORT",
      "CLIENTID",
      "REDIRECTROUTE",
      "CONSTANTAUTHURL",  
    ];

    for (const field of requiredFields) {
      if (!(field in config)) {
        throw new Error(`Missing required configuration field: ${field}`);
      }
    }
  }

  private getFallbackConfig(): AppConfig {
    // Hardcoded fallback values - no environment variable dependencies
    return {
     // ENVIRONMENT: "UNKNOWN ENVIRONMENT",
      APPLICATIONSTAGE: "UNKNOWN",
      GATEWAYSERVERIP: "UNKNOWN",

      SERVERPROTOCOL: "https://",
      FRONTENDPROTOCOL: "http://",
      DASHBOARD_PORT: ":5170",
      REGISTRATIONFRONT_PORT: ":5171",
      MODELMANAGERFRONT_PORT: ":5172",
      PRODUCTMANAGERFRONT_PORT: ":5173",
      RMAMANAGERFRONT_PORT: ":5175",
      GATEWAY_PORT: ":7179",
      CLIENTID: "UNKNOWN_CLIENT_ID",
      REDIRECTROUTE: "UNKNWOWN_REDIRECT_ROUTE",
      CONSTANTAUTHURL: "UNKNOWN_CONSTANT_AUTH_URL",
    };
  }

  /**
   * Gets a specific configuration value
   */
  async getConfig<K extends keyof AppConfig>(key: K): Promise<AppConfig[K]> {
    const config = await this.loadConfig();
    return config[key];
  }

  /**
   * Gets the full configuration object
   */
  async getFullConfig(): Promise<AppConfig> {
    return await this.loadConfig();
  }

  /**
   * Reloads the configuration from the server
   * Useful if you need to refresh config without page reload
   */
  async reloadConfig(): Promise<AppConfig> {
    this.config = null;
    this.configPromise = null;
    return await this.loadConfig();
  }

  /**
   * Builds complete URLs using the configuration
   */
  async buildGatewayUrl(endpoint: string = ""): Promise<string> {
    const config = await this.loadConfig();
    const baseUrl = `${config.SERVERPROTOCOL}${config.GATEWAYSERVERIP}${config.GATEWAY_PORT}`;
    return endpoint ? `${baseUrl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}` : baseUrl;
  }

  async buildFrontendUrl(
    port: keyof Pick<
      AppConfig,
      "DASHBOARD_PORT" | "REGISTRATIONFRONT_PORT" | "MODELMANAGERFRONT_PORT" | "PRODUCTMANAGERFRONT_PORT" | "RMAMANAGERFRONT_PORT"
    >,
    path: string = ""
  ): Promise<string> {
    const config = await this.loadConfig();
    const baseUrl = `${config.FRONTENDPROTOCOL}${config.GATEWAYSERVERIP}${config[port]}`;
    return path ? `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}` : baseUrl;
  }
}

// Export a singleton instance
export const configService = new ConfigService();

// Export convenience functions for common use cases
export const getConfig = (key: keyof AppConfig) => configService.getConfig(key);
export const getFullConfig = () => configService.getFullConfig();
export const buildGatewayUrl = (endpoint?: string) => configService.buildGatewayUrl(endpoint);
export const buildFrontendUrl = (
  port: keyof Pick<
    AppConfig,
    "DASHBOARD_PORT" | "REGISTRATIONFRONT_PORT" | "MODELMANAGERFRONT_PORT" | "PRODUCTMANAGERFRONT_PORT" | "RMAMANAGERFRONT_PORT"
  >,
  path?: string
) => configService.buildFrontendUrl(port, path);
