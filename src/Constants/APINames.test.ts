import { AUTHAPINAME, MODELAPINAME, PRODUCTAPINAME, RegistrationAPINAME } from "./APINames";

describe("APINames constants", () => {
  it("should have the correct PRODUCTAPINAME", () => {
    expect(PRODUCTAPINAME).toBe("/ProductManagerAPI");
  });

  it("should have the correct MODELAPINAME", () => {
    expect(MODELAPINAME).toBe("/ModelManagerAPI");
  });

  it("should have the correct RegistrationAPINAME", () => {
    expect(RegistrationAPINAME).toBe("/RegistrationManagerAPI");
  });

  it("should have the correct AUTHAPINAME", () => {
    expect(AUTHAPINAME).toBe("AuthAPI");
  });
});