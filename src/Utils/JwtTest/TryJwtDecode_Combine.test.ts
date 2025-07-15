import { describe, it, expect, vi } from "vitest";
import { JwtAccessToken } from "../../Models/JWTModels/JwtAccessTokenFormat";
import { TryJwtDecode } from "../TryJwtDecode";
import { jwtDecode } from "jwt-decode";

vi.mock("jwt-decode", async () => ({ jwtDecode: vi.fn() }));

const mockValidDecodedResult = {
  aud: "MassFussion.ApiResource",
  Email: "admin@massload.com",
  UserName: "admin@massload.com",
  iat: 0,
  iss: "sampleIss",
  jti: "feccce9b-471f-405e-9a58-bc54fa0ffae8",
  nameid: "sampleNameid",
  nbf: 1742390779, //new Date().getTime(),
  exp: Math.round(new Date().getTime() / 1000) + 1000, // expires in the future
} as JwtAccessToken;

const mockExpiredDecodedResult = {
  aud: "MassFussion.ApiResource",
  Email: "admin@massload.com",
  UserName: "admin@massload.com",
  iat: 0,
  iss: "sampleIss",
  jti: "feccce9b-471f-405e-9a58-bc54fa0ffae8",
  nameid: "sampleNameid",
  nbf: 1742390779,
  exp: 1642390724, // expires in the future
} as JwtAccessToken;

const mockInValidDecodedResult = {
  aud: "MassFussion.ApiResource",
  Email: "admin@massload.com",
  UserName: "admin@massload.com",

  iat: -1,
  iss: "sampleIss",
  jti: "feccce9b-471f-405e-9a58-bc54fa0ffae8",
  nameid: "sampleNameid",
  nbf: -1,
  exp: -1, // expires in the future
} as JwtAccessToken;

describe("JwtTest-Valid", () => {

  afterAll(() => {
    vi.resetAllMocks();
  });

  it("should return decoded result for a valid token", async () => {
    const mockToken = "validToken";
    vi.mocked(jwtDecode).mockReturnValue(mockValidDecodedResult);

    const result = TryJwtDecode<JwtAccessToken>(mockToken);
    expect(result).toEqual(expect.objectContaining({
      result: true,
      expires: false,
    }));
  });
  it("should return expires as true  result as false  for an expiredToken token", () => {
    const mockToken = "expiredToken";
    vi.mocked(jwtDecode).mockReturnValue(mockExpiredDecodedResult);
    const result = TryJwtDecode<JwtAccessToken>(mockToken);
    expect(result).toEqual({
      decoded: mockExpiredDecodedResult,
      result: false,
      expires: true,
      expirationTime: mockExpiredDecodedResult.exp,
    });
  });
  it("should return blank decoded value expire and false as result for  for an invalid token", () => {
    const mockToken = "";
    vi.mocked(jwtDecode).mockReturnValue(mockInValidDecodedResult);
    const result = TryJwtDecode<JwtAccessToken>(mockToken);
    expect(result).toEqual({
      decoded: "",
      result: false,
      expires: false,
    });
  });
});
