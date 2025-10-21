import { AUTHAPINAME, RegistrationAPINAME } from "./APINames";
import { configService, AppConfig } from "../Services/ConfigService";

// Initialize with hardcoded defaults - will be updated by initializeConfig
let currentConfig: AppConfig = {
  //ENVIRONMENT:import.meta.env.VITE_ENVIRONMENT,
  APPLICATIONSTAGE: "LOCAL",
  GATEWAYSERVERIP: "localhost",
  SERVERPROTOCOL: "https://",
  FRONTENDPROTOCOL: "http://",
  DASHBOARD_PORT: ":5170",
  REGISTRATIONFRONT_PORT: ":5171",
  MODELMANAGERFRONT_PORT: ":5172",
  PRODUCTMANAGERFRONT_PORT: ":5173",
  RMAMANAGERFRONT_PORT: ":5175",
  MATERIALPURCHASINGFRONT_PORT: ":5176",
  GATEWAY_PORT: ":7179",

};

// Exports for backward compatibility (will be updated by initializeConfig)
export let APPLICATIONSTAGE = currentConfig.APPLICATIONSTAGE;
export let BASEAPIURL = `${currentConfig.SERVERPROTOCOL}${currentConfig.GATEWAYSERVERIP}${currentConfig.GATEWAY_PORT}`;
export let DashBoardFrontUrl = `${currentConfig.FRONTENDPROTOCOL}${currentConfig.GATEWAYSERVERIP}${currentConfig.DASHBOARD_PORT}`;
export let RegistrationFrontURL = `${currentConfig.FRONTENDPROTOCOL}${currentConfig.GATEWAYSERVERIP}${currentConfig.REGISTRATIONFRONT_PORT}`;
export let ModelManagerFrontURL = `${currentConfig.FRONTENDPROTOCOL}${currentConfig.GATEWAYSERVERIP}${currentConfig.MODELMANAGERFRONT_PORT}`;
export let RMAManagerFrontURL = `${currentConfig.FRONTENDPROTOCOL}${currentConfig.GATEWAYSERVERIP}${currentConfig.RMAMANAGERFRONT_PORT}`;
export let ProductManagerFrontURL = `${currentConfig.FRONTENDPROTOCOL}${currentConfig.GATEWAYSERVERIP}${currentConfig.PRODUCTMANAGERFRONT_PORT}`;
export let MaterialPurchasingFrontEndurl = `${currentConfig.FRONTENDPROTOCOL}${currentConfig.GATEWAYSERVERIP}${currentConfig.MATERIALPURCHASINGFRONT_PORT}`;

export let FronUrls = {
  REGISTRATIONMANAGER_FRONTURL: RegistrationFrontURL,
  MASSLOADDASBOARD_FRONTURL: DashBoardFrontUrl,
  PRODUCT_MANAGER_FRONTURL: ProductManagerFrontURL,
  MODEL_MANAGER_FRONTURL: ModelManagerFrontURL,
  RMA_MANAGER_FRONTURL: RMAManagerFrontURL,
  MATERIAL_PURCHASING_MANAGER_FRONTURL: MaterialPurchasingFrontEndurl,
};

export let AuthUrls = {
  APPLICATIONTOKEN_BASEURL: `${BASEAPIURL}/${AUTHAPINAME}/access_token`,
  DASHBOARDTOKEN_BASEURL: `${BASEAPIURL}/${AUTHAPINAME}/dashboard_token`,
  RevalidateValidateUser_BASEURL: `${BASEAPIURL}/${AUTHAPINAME}/validLoginCredentials`,
  FLIGHTTOKEN_BASEURL: `${BASEAPIURL}/${AUTHAPINAME}/flight_token`,
  REFRESH_BASEURL: `${BASEAPIURL}/${AUTHAPINAME}/refresh_token`,
};

export let Fixedvalues = {
  DASHBOARD_NAME: `MASSFUSION   -${import.meta.env.VITE_ENVIRONMENT} `,
  HubServerConnectionUrl: `${BASEAPIURL}${RegistrationAPINAME}/theHub`,
  CopyRight: "© Massload Technologies Inc.",
};

/**
 * Initialize configuration from config.json
 * This should be called early in the application lifecycle
 */
export async function initializeConfig(): Promise<void> {
  try {
    const config = await configService.getFullConfig();
    updateConfigValues(config);
  } catch (error) {
    console.warn("Failed to load runtime configuration, using fallback values:", error);
  }
}

/**
 * Update all exported values with new configuration
 */
function updateConfigValues(config: AppConfig): void {
  currentConfig = config;

  // Update application stage
  APPLICATIONSTAGE = config.APPLICATIONSTAGE;

  // Update base URLs
  BASEAPIURL = `${config.SERVERPROTOCOL}${config.GATEWAYSERVERIP}${config.GATEWAY_PORT}`;
  DashBoardFrontUrl = `${config.FRONTENDPROTOCOL}${config.GATEWAYSERVERIP}${config.DASHBOARD_PORT}`;
  RegistrationFrontURL = `${config.FRONTENDPROTOCOL}${config.GATEWAYSERVERIP}${config.REGISTRATIONFRONT_PORT}`;
  ModelManagerFrontURL = `${config.FRONTENDPROTOCOL}${config.GATEWAYSERVERIP}${config.MODELMANAGERFRONT_PORT}`;
  RMAManagerFrontURL = `${config.FRONTENDPROTOCOL}${config.GATEWAYSERVERIP}${config.RMAMANAGERFRONT_PORT}`;
  ProductManagerFrontURL = `${config.FRONTENDPROTOCOL}${config.GATEWAYSERVERIP}${config.PRODUCTMANAGERFRONT_PORT}`;
  MaterialPurchasingFrontEndurl = `${config.FRONTENDPROTOCOL}${config.GATEWAYSERVERIP}${config.MATERIALPURCHASINGFRONT_PORT}`;

  // Update front URLs
  FronUrls = {
    REGISTRATIONMANAGER_FRONTURL: RegistrationFrontURL,
    MASSLOADDASBOARD_FRONTURL: DashBoardFrontUrl,
    MODEL_MANAGER_FRONTURL: ModelManagerFrontURL,
    RMA_MANAGER_FRONTURL: RMAManagerFrontURL,
    PRODUCT_MANAGER_FRONTURL: ProductManagerFrontURL,
    MATERIAL_PURCHASING_MANAGER_FRONTURL: MaterialPurchasingFrontEndurl,
  };

  // Update auth URLs
  AuthUrls = {
    APPLICATIONTOKEN_BASEURL: `${BASEAPIURL}/${AUTHAPINAME}/access_token`,
    DASHBOARDTOKEN_BASEURL: `${BASEAPIURL}/${AUTHAPINAME}/dashboard_token`,
    RevalidateValidateUser_BASEURL: `${BASEAPIURL}/${AUTHAPINAME}/validLoginCredentials`,
    FLIGHTTOKEN_BASEURL: `${BASEAPIURL}/${AUTHAPINAME}/flight_token`,
    REFRESH_BASEURL: `${BASEAPIURL}/${AUTHAPINAME}/refresh_token`,
  };

  // Update fixed values
  Fixedvalues = {
     DASHBOARD_NAME: `MASSFUSION   -${import.meta.env.VITE_ENVIRONMENT} `,

    HubServerConnectionUrl: `${BASEAPIURL}${RegistrationAPINAME}/theHub`,
    CopyRight: "© Massload Technologies Inc.",
  };
}

/**
 * Reactive configuration utilities for components
 */


export class ConfigurableUrls {
  static async getBaseApiUrl(): Promise<string> {
    return await configService.buildGatewayUrl();
  }

  static async getDashboardUrl(path?: string): Promise<string> {
    return await configService.buildFrontendUrl("DASHBOARD_PORT", path);
  }

  static async getRegistrationUrl(path?: string): Promise<string> {
    return await configService.buildFrontendUrl("REGISTRATIONFRONT_PORT", path);
  }

  static async getModelManagerUrl(path?: string): Promise<string> {
    return await configService.buildFrontendUrl("MODELMANAGERFRONT_PORT", path);
  }

  static async getAuthUrls() {
    const baseUrl = await this.getBaseApiUrl();
    return {
      APPLICATIONTOKEN_BASEURL: `${baseUrl}/${AUTHAPINAME}/access_token`,
      DASHBOARDTOKEN_BASEURL: `${baseUrl}/${AUTHAPINAME}/dashboard_token`,
      RevalidateValidateUser_BASEURL: `${baseUrl}/${AUTHAPINAME}/validLoginCredentials`,
      FLIGHTTOKEN_BASEURL: `${baseUrl}/${AUTHAPINAME}/flight_token`,
      REFRESH_BASEURL: `${baseUrl}/${AUTHAPINAME}/refresh_token`,
    };
  }

  static async getHubConnectionUrl(): Promise<string> {
    const baseUrl = await this.getBaseApiUrl();
    return `${baseUrl}${RegistrationAPINAME}/theHub`;
  }


}




