// TryJwtDecode.test.ts
import { describe, it, expect, vi } from "vitest";
import { JwtAccessToken } from "../../Models/JWTModels/JwtAccessTokenFormat";
import { TryJwtDecode } from "../TryJwtDecode";

const mockValidDecodedResult = vi.hoisted(
  () =>
    ({
      aud: "MassFussion.ApiResource",
      Email: "admin@massload.com",
      UserName: "admin@massload.com",
      iat: 0,
      iss: "sampleIss",
      jti: "feccce9b-471f-405e-9a58-bc54fa0ffae8",
      nameid: "sampleNameid",
      nbf: Math.round(new Date().getTime() / 1000) - 1, // valid from the past 1 digit ago
      exp: Math.round(new Date().getTime() / 1000) + 5000, // expires in the future
    }) as JwtAccessToken
);

//vi.mock("jwt-decode")
describe("JwtTest-ValidToken", () => {
  it("should return decoded result for a valid token", () => {
    const mockToken = "validToken";
    vi.mock("jwt-decode", async () => {
      const actual = await vi.importActual<typeof import("jwt-decode")>("jwt-decode");

      return { ...actual, jwtDecode: () => mockValidDecodedResult };
    });
    const result = TryJwtDecode<JwtAccessToken>(mockToken);

    expect(result).toEqual(
      expect.objectContaining({
        decoded: mockValidDecodedResult,
        result: true,
        expires: false,
        expirationTime: mockValidDecodedResult.exp,
      })
    );
  });
});
