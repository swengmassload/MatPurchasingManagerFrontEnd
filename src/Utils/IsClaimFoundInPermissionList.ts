//import { MRT_Row } from "material-react-table";
import { MassfussionFunctionResponseDTO } from "../Models/RegistrationModels/Dto";
import { ResponseClaim } from "../Models/RegistrationModels/UserClaimsDTO";


export function IsClaimFoundInPermissionList(original: MassfussionFunctionResponseDTO, claim: ResponseClaim[]) {
  return claim.some(c => c.applicationCode === original.applicationCode && c.claimType === original.type && c.claimValue === original.claimValue);
}
