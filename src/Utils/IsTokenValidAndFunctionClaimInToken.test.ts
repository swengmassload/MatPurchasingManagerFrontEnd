import { describe, expect, it } from "vitest";
import { IsTokenValidAndFunctionClaimInToken } from "./IsTokenValidAndFunctionClaimInToken";
import { JwtAccessToken } from "../Models/JWTModels/JwtAccessTokenFormat";

const mockValidDecodedResult = vi.hoisted(
  () =>
    ({
      aud: "MassFussion.ApiResource",
      UserName: "testUserName",
      Email: "testEmail",
      FUNCTION: ["APP02_01", "APP02_02", "APP02_03", "APP02_04", "APP02_05"],
      iat: 0,
      iss: "sampleIss",
      jti: "feccce9b-471f-405e-9a58-bc54fa0ffae8",
      nameid: "sampleNameid",
      nbf: 1723478077285, //new Date().getTime(),
      exp: Math.round(new Date().getTime() / 1000) + 1000, // expires in the future
    } as JwtAccessToken)
);
const mockValidDecodedResult2 = vi.hoisted(() => ({
  decoded: mockValidDecodedResult,
  result: true,
  expires: false,
}));
vi.mock("./TryJwtDecode", () => {
  return {
    TryJwtDecode: () => mockValidDecodedResult2,
  };
});

describe("IsTokenValidAndFunctionClaimInToken", () => {
  it("Should return true if Token is valid and claim is Present", () => {
    const claim = "APP02_01";
    const token = "ValidToken";
    const result = IsTokenValidAndFunctionClaimInToken(claim, token);
    expect(result).not.toBeNull();

    expect(result).toBeTruthy();
  });


  it("Should return false if Token is valid and claim is Not Present", () => {
    const claim = "APP01_01";
    const token = "ValidToken";
    const result = IsTokenValidAndFunctionClaimInToken(claim, token);
    expect(result).not.toBeNull();

    expect(result).toBeFalsy();
  });
});
