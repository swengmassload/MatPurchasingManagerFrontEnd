import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useConfig, useConfigUrls } from "../Hooks/useConfig";
import { configService, AppConfig } from "../Services/ConfigService";

// Mock the config service
vi.mock("../Services/ConfigService", () => ({
  configService: {
    getConfig: vi.fn(),
    getFullConfig: vi.fn(),
    buildGatewayUrl: vi.fn(),
    buildFrontendUrl: vi.fn(),
    reloadConfig: vi.fn(),
  },
  AppConfig: {}, // Type-only export
}));

const mockConfigService = configService as any;

describe("useConfig Hook", () => {
  const mockConfig: AppConfig = {
  
    APPLICATIONSTAGE: "TEST",
    GATEWAYSERVERIP: "test.example.com",
    SERVERPROTOCOL: "https://",
    FRONTENDPROTOCOL: "http://",
    DASHBOARD_PORT: ":3000",
    REGISTRATIONFRONT_PORT: ":3001",
    MODELMANAGERFRONT_PORT: ":3002",
    PRODUCTMANAGERFRONT_PORT: ":3003",
    RMAMANAGERFRONT_PORT: ":3004",
    GATEWAY_PORT: ":8080",
    CLIENTID: "test-client-id",
    REDIRECTROUTE: "/oauth/callback",
    CONSTANTAUTHURL: "https://auth.example.com/oauth2/default/v1/authorize",

  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("useConfig without key", () => {
    it("should return full config when no key is provided", async () => {
      mockConfigService.getFullConfig.mockResolvedValue(mockConfig);

      const { result } = renderHook(() => useConfig());

      // Initially loading
      expect(result.current.loading).toBe(true);
      expect(result.current.config).toBe(null);
      expect(result.current.error).toBe(null);

      // Wait for config to load
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.config).toEqual(mockConfig);
      expect(result.current.error).toBe(null);
      expect(mockConfigService.getFullConfig).toHaveBeenCalledTimes(1);
    });

    it("should handle config loading error", async () => {
      const error = new Error("Failed to load config");
      mockConfigService.getFullConfig.mockRejectedValue(error);

      const { result } = renderHook(() => useConfig());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.config).toBe(null);
      expect(result.current.error).toBe("Failed to load config");
    });

    it("should reload config when reloadConfig is called", async () => {
      mockConfigService.getFullConfig.mockResolvedValue(mockConfig);
      mockConfigService.reloadConfig.mockResolvedValue(mockConfig);

      const { result } = renderHook(() => useConfig());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Call reload
      await result.current.reloadConfig();

      expect(mockConfigService.reloadConfig).toHaveBeenCalledTimes(1);
      expect(mockConfigService.getFullConfig).toHaveBeenCalledTimes(2); // Initial load + reload
    });
  });

  describe("useConfig with key", () => {
    it("should return specific config value when key is provided", async () => {
      mockConfigService.getConfig.mockResolvedValue("test.example.com");

      const { result } = renderHook(() => useConfig("GATEWAYSERVERIP"));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.config).toBe("test.example.com");
      expect(result.current.error).toBe(null);
      expect(mockConfigService.getConfig).toHaveBeenCalledWith("GATEWAYSERVERIP");
    });

    it("should handle specific config key error", async () => {
      const error = new Error("Invalid config key");
      mockConfigService.getConfig.mockRejectedValue(error);

      const { result } = renderHook(() => useConfig("GATEWAYSERVERIP"));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.config).toBe(null);
      expect(result.current.error).toBe("Invalid config key");
    });
  });
});

describe("useConfigUrls Hook", () => {
  const mockConfig: AppConfig = {
    
    APPLICATIONSTAGE: "TEST",
    GATEWAYSERVERIP: "test.example.com",
    SERVERPROTOCOL: "https://",
    FRONTENDPROTOCOL: "http://",
    DASHBOARD_PORT: ":3000",
    REGISTRATIONFRONT_PORT: ":3001",
    MODELMANAGERFRONT_PORT: ":3002",
    PRODUCTMANAGERFRONT_PORT: ":3003",
    RMAMANAGERFRONT_PORT: ":3004",
    GATEWAY_PORT: ":8080",
    CLIENTID: "test-client-id",
    REDIRECTROUTE: "/oauth/callback",
    CONSTANTAUTHURL: "https://auth.example.com/oauth2/default/v1/authorize",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockConfigService.getFullConfig.mockResolvedValue(mockConfig);
  });

  it("should provide URL building functions", async () => {
    mockConfigService.buildGatewayUrl.mockResolvedValue("https://test.example.com:8080");
    mockConfigService.buildFrontendUrl.mockResolvedValue("http://test.example.com:3000");

    const { result } = renderHook(() => useConfigUrls());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const gatewayUrl = await result.current.buildGatewayUrl("/api/test");
    const frontendUrl = await result.current.buildFrontendUrl("DASHBOARD_PORT", "/dashboard");

    expect(gatewayUrl).toBe("https://test.example.com:8080");
    expect(frontendUrl).toBe("http://test.example.com:3000");
    expect(mockConfigService.buildGatewayUrl).toHaveBeenCalledWith("/api/test");
    expect(mockConfigService.buildFrontendUrl).toHaveBeenCalledWith("DASHBOARD_PORT", "/dashboard");
  });

  it("should return null when config is loading", async () => {
    // Mock a slow loading config
    mockConfigService.getFullConfig.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(mockConfig), 100))
    );

    const { result } = renderHook(() => useConfigUrls());

    const gatewayUrl = await result.current.buildGatewayUrl("/api/test");
    expect(gatewayUrl).toBe(null);
  });

  it("should return null when there is an error", async () => {
    mockConfigService.getFullConfig.mockRejectedValue(new Error("Config error"));

    const { result } = renderHook(() => useConfigUrls());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const gatewayUrl = await result.current.buildGatewayUrl("/api/test");
    expect(gatewayUrl).toBe(null);
  });
});
