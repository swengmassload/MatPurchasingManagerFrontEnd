// TryJwtDecode.test.ts
import { describe, it, expect, vi } from "vitest";
import { TryJwtDecode } from "../TryJwtDecode";
import { JwtAccessToken } from "../../Models/JWTModels/JwtAccessTokenFormat";


describe("Jwt-ExpiredToken", () => {

  it("should return blank decoded value expire and false as result for  for an invalid token", () => {
    const mockToken = "InvalidToken";
    vi.mock("jwt-decode", async () => {
      const actual = await vi.importActual<typeof import("jwt-decode")>(
        "jwt-decode"
      );

      return {
        ...actual,
        jwtDecode: () => {
          throw new Error("Invalid token");
        },
      };
    });
    const result = TryJwtDecode<JwtAccessToken>(mockToken);
    expect(result).toEqual({
      decoded: "",
      result: false,
      expires: false,
    });
  });
});
