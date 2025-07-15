import { JwtAccessTokenFormat } from "../Models/JWTModels/JwtAccessTokenFormat";
import { TryJwtDecode } from "./TryJwtDecode";
// must remove this and subtitute with these two  IsTokenValid and IsAcccessClaimInToken
// separating valid token and access claim in token
export function IsTokenValidAndFunctionClaimInToken(claim: string, token: string | null) {
  if (!token) {
    return false;
  }
  const decodedresult = TryJwtDecode<JwtAccessTokenFormat>(token);
  if (!decodedresult.result || "" === decodedresult.decoded) {
    return false;
  }
  const decoded = decodedresult.decoded!;
  const apps: string[] = decoded["FUNCTION"];
  return apps.indexOf(claim) > -1;
  //return allowed;
}

interface InvalidTokenMessage{
  message:string;
  isvalid:boolean;
  remainingTime?:number;
  exp?:number;
}
export function IsTokenValid( token: string | null) :InvalidTokenMessage{

  if (!token) {
    return {message:"Token is invalid or Nor Present",isvalid:false};
  }
  const decodedresult = TryJwtDecode<JwtAccessTokenFormat>(token);
  console.log(decodedresult);
if (!decodedresult.result ) {
    if (decodedresult.expires) {
      return {message:"Token is expired",isvalid:false,exp:decodedresult.expirationTime,};
    }
    return {message:"Token is invalid ",isvalid:false,exp:decodedresult.expirationTime,};
  }

  return {message:"",isvalid:true,exp:decodedresult.expirationTime,};

}
export function IsAcccessClaimInToken(claim: string, token: string | null) {
  if (!token) {
    return false;
  }
  const decodedresult = TryJwtDecode<JwtAccessTokenFormat>(token);
console.log("decodedresult",decodedresult);
console.log("decodedresult.result",claim);

  if (!decodedresult.result || "" === decodedresult.decoded) {
    return false;
  }
  const decoded = decodedresult.decoded!;
  const apps: string[] = decoded["FUNCTION"];
  return apps.indexOf(claim) > -1;

}