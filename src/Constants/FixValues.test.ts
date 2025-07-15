import { AuthUrls, Fixedvalues } from "./FixValues";

// Mock environment variables for import.meta.env
const OLD_ENV = { ...import.meta.env };
beforeAll(() => {
  // You may need to mock these if your test runner supports import.meta.env
  import.meta.env.VITE_ENVIRONMENT = "DEV";
});

afterAll(() => {
  Object.assign(import.meta.env, OLD_ENV);
});

describe("AuthUrls constants", () => {
  it("should have correct keys", () => {
    expect(AuthUrls).toHaveProperty("APPLICATIONTOKEN_BASEURL");
    expect(AuthUrls).toHaveProperty("DASHBOARDTOKEN_BASEURL");
    expect(AuthUrls).toHaveProperty("RevalidateValidateUser_BASEURL");
    expect(AuthUrls).toHaveProperty("FLIGHTTOKEN_BASEURL");
    expect(AuthUrls).toHaveProperty("REFRESH_BASEURL");
  });
});

describe("Fixedvalues constants", () => {
  it("should have correct DASHBOARD_NAME prefix", () => {
    expect(Fixedvalues.DASHBOARD_NAME.startsWith("MASSFUSION   -")).toBe(true);
  });

  it("should have correct CopyRight value", () => {
    expect(Fixedvalues.CopyRight).toBe("© Massload Technologies Inc.");
  });

  it("should have correct keys for connection URLs", () => {
    expect(Fixedvalues).toHaveProperty("HubServerConnectionUrl");
    expect(Fixedvalues).toHaveProperty("VerificationSignalConnectionUrl");
  });
});