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
// Remove  the next expirationDate  currentDateTime  formattedExpirationDatelines of code later 
// they are for debugging purposes only
    const expirationDate = new Date(decoded.exp * 1000); // Multiply by 1000 to convert to milliseconds
    const currentDateTime = new Date(currentDtm * 1000); // Multiply by 1000 to convert to milliseconds 
    const formattedExpirationDate = expirationDate.toLocaleString();

    console.log(`Token will expires at : ${formattedExpirationDate}`);
    console.log(`Token expires status : ${expires}`);
    console.log(`Current time is : ${currentDateTime.toLocaleString()}`);


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
