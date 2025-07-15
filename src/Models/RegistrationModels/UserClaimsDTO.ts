export interface UserClaimsResponseDTO {
  email: string;
  claim: ResponseClaim[];
}

export interface UserClaimsResponseDTOOld {
  email: string;
  applicationCode: string;
  claimType: string;
  claimValue: string;
}
// export interface UserClaimsCreateDTO {
//   email: string;
//   applicationCode: string;
//   claimType: string;
//   claimValue: string;
// }
// generate a sample list of data
export interface ResponseClaim {
  applicationCode: string;
  claimType: string;
  claimValue: string;
}

export interface CreateClaim {
  applicationCode: string;
  claimType: string;
  claimValue: string;
}
export interface UserClaimsCreateDTO {
  email: string;
  claim: CreateClaim[];
}

export interface BlobResponseDTO {
  blob: Blob;//blobParts?: BlobPart[] | undefined, options?: BlobPropertyBag | undefined;
  
}


