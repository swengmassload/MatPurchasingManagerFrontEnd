import { jwtDecode } from "jwt-decode";
import { JwtAccessToken } from "../Models/JWTModels/JwtAccessTokenFormat";

interface DecodedResult<T> {
  decoded: T | "";
  result: boolean;
  expires?: boolean;
  expirationTime?: number;
}

export const TryJwtDecode = <T extends JwtAccessToken>(token: string) : DecodedResult<T> => {
  if (!token) {
    return {
      decoded: "",
      result: false,
      expires: false,
    };
  }
  try {
   
    const decoded = jwtDecode<T>(token);

    const currentDtm = Math.round((new Date()).getTime() / 1000)
    const expires = decoded.exp < currentDtm;

    return {
      decoded: decoded,
      result: true && !expires,
      expires: expires,
      expirationTime: decoded.exp,
    };
  } catch (error) {
    return {
      decoded: "",
      result: false,
      expires: false,
    };
  }
};
