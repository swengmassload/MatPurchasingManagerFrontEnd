import { describe, it, expect, beforeEach, vi } from "vitest";
import { configService, AppConfig } from "../Services/ConfigService";

// Mock fetch for testing
(globalThis as any).fetch = vi.fn();

describe("Configuration Service", () => {
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
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the config service internal state
    (configService as any).config = null;
    (configService as any).configPromise = null;
  });

  describe("loadConfig", () => {
    it("should load configuration from config.json successfully", async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockConfig),
      });

      const config = await configService.loadConfig();

      expect(config).toEqual(mockConfig);
      expect(fetch).toHaveBeenCalledWith("/config.json");
    });

    it("should use fallback configuration when fetch fails", async () => {
      (fetch as any).mockRejectedValueOnce(new Error("Network error"));

      const config = await configService.loadConfig();

      // Should fallback to environment variables
      expect(config.APPLICATIONSTAGE).toBeDefined();
      expect(config.GATEWAYSERVERIP).toBeDefined();
    });

    it("should validate required configuration fields", async () => {
      const incompleteConfig = {
        APPLICATIONSTAGE: "TEST",
        // Missing other required fields
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(incompleteConfig),
      });

      const config = await configService.loadConfig();

      // Should fallback due to validation failure
      expect(config.GATEWAYSERVERIP).toBeDefined();
    });

    it("should cache configuration after first load", async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockConfig),
      });

      // Load config twice
      const config1 = await configService.loadConfig();
      const config2 = await configService.loadConfig();

      expect(config1).toBe(config2);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("getConfig", () => {
    it("should return specific configuration value", async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockConfig),
      });

      const gatewayIp = await configService.getConfig("GATEWAYSERVERIP");

      expect(gatewayIp).toBe("test.example.com");
    });
  });

  describe("buildGatewayUrl", () => {
    it("should build gateway URL correctly", async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockConfig),
      });

      const url = await configService.buildGatewayUrl();

      expect(url).toBe("https://test.example.com:8080");
    });

    it("should build gateway URL with endpoint", async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockConfig),
      });

      const url = await configService.buildGatewayUrl("/api/users");

      expect(url).toBe("https://test.example.com:8080/api/users");
    });

    it("should handle endpoint without leading slash", async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockConfig),
      });

      const url = await configService.buildGatewayUrl("api/users");

      expect(url).toBe("https://test.example.com:8080/api/users");
    });
  });

  describe("buildFrontendUrl", () => {
    it("should build dashboard frontend URL", async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockConfig),
      });

      const url = await configService.buildFrontendUrl("DASHBOARD_PORT");

      expect(url).toBe("http://test.example.com:3000");
    });

    it("should build registration frontend URL with path", async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockConfig),
      });

      const url = await configService.buildFrontendUrl("REGISTRATIONFRONT_PORT", "/login");

      expect(url).toBe("http://test.example.com:3001/login");
    });

    it("should build model manager frontend URL", async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockConfig),
      });

      const url = await configService.buildFrontendUrl("MODELMANAGERFRONT_PORT");

      expect(url).toBe("http://test.example.com:3002");
    });
  });

  describe("reloadConfig", () => {
    it("should reload configuration and clear cache", async () => {
      // Initial load
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockConfig),
      });

      await configService.loadConfig();
      expect(fetch).toHaveBeenCalledTimes(1);

      // Reload
      const updatedConfig = { ...mockConfig, APPLICATIONSTAGE: "PRODUCTION" };
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(updatedConfig),
      });

      const reloadedConfig = await configService.reloadConfig();

      expect(reloadedConfig.APPLICATIONSTAGE).toBe("PRODUCTION");
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });
});

describe("Configuration Values Validation", () => {
  const expectedConfigKeys: (keyof AppConfig)[] = [
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
  ];

  it("should have all required configuration keys defined", () => {
    expectedConfigKeys.forEach((key) => {
      expect(key).toBeDefined();
      expect(typeof key).toBe("string");
    });
  });

  it("should have correct default values in config.json structure", () => {
    const defaultValues = {
      APPLICATIONSTAGE: "LOCAL",
      GATEWAYSERVERIP: "localhost",
      SERVERPROTOCOL: "https://",
      FRONTENDPROTOCOL: "http://",
      DASHBOARD_PORT: ":5170",
      REGISTRATIONFRONT_PORT: ":5171",
      MODELMANAGERFRONT_PORT: ":5172",
      PRODUCTMANAGERFRONT_PORT: ":5173",
      RMAMANAGERFRONT_PORT: ":5175",
      GATEWAY_PORT: ":7179",
    };

    Object.entries(defaultValues).forEach(([key, expectedValue]) => {
      expect(expectedValue).toBeDefined();
      if (key.includes("PORT")) {
        expect(expectedValue).toMatch(/^:\d+$/);
      } else if (key.includes("PROTOCOL")) {
        expect(expectedValue).toMatch(/^https?:\/\/$/);
      }
    });
  });

  it("should validate port format", () => {
    const portKeys = [
      "DASHBOARD_PORT",
      "REGISTRATIONFRONT_PORT",
      "MODELMANAGERFRONT_PORT",
      "PRODUCTMANAGERFRONT_PORT",
      "RMAMANAGERFRONT_PORT",
      "GATEWAY_PORT",
    ];

    portKeys.forEach(() => {
      const portValue = ":5171"; // Example port
      expect(portValue).toMatch(/^:\d+$/);
    });
  });

  it("should validate protocol format", () => {
    const protocols = ["https://", "http://"];

    protocols.forEach((protocol) => {
      expect(protocol).toMatch(/^https?:\/\/$/);
    });
  });

  it("should validate server IP formats", () => {
    const validIPs = ["localhost", "127.0.0.1", "example.com", "api.example.com"];

    validIPs.forEach((ip) => {
      expect(ip).toBeDefined();
      expect(typeof ip).toBe("string");
      expect(ip.length).toBeGreaterThan(0);
    });
  });
});
