import { describe, it, expect, vi } from "vitest";
import { TryJwtDecode } from "../TryJwtDecode";
import { JwtAccessToken } from "../../Models/JWTModels/JwtAccessTokenFormat";

const mockInValidDecodedResult = vi.hoisted(
  () =>
    ({
      aud: "MassFussion.ApiResource",
      Email: "admin@massload.com",
      UserName: "admin@massload.com",
      //exp: number;
      iat: 0,
      iss: "sampleIss",
      jti: "feccce9b-471f-405e-9a58-bc54fa0ffae8",
      nameid: "sampleNameid",
      nbf: 1723478077285,
      exp: Math.round(new Date().getTime() / 1000) - 1000, // expires in the future
    }) as JwtAccessToken
);

describe("JwtTest-ExpiredToken", () => {
  it("should return expires as true and result as false for an expiredToken token", () => {
    const mockToken = "expiredToken";
    vi.mock("jwt-decode", async () => {
      const actual = await vi.importActual<typeof import("jwt-decode")>("jwt-decode");

      return { ...actual, jwtDecode: () => mockInValidDecodedResult };
    });
    const result = TryJwtDecode<JwtAccessToken>(mockToken);
    expect(result).toEqual(expect.objectContaining({
      decoded: mockInValidDecodedResult,
      result: false,
      expires: true,
    }));
  });
});
