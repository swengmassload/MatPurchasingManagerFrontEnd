export interface ITokenGenerationRequest {
  userName: string;
  password: string;
  barCode: string;
  isBarCode: boolean;
}

// export type TokenGenerationRequest = {
//   userName: string;
//   password: string;
//   barCode: string;
//   isBarCode: boolean;
// };


export interface ITokenGenerationResponse {
  success: boolean;
  token: string;
  errors: any;
}
export type ProblemDetails ={
  title: string;
  status: number;
  detail: string;
}
export type  ProblemRoot= {
  problemDetails: ProblemDetails;

}

export interface AccessTokenRequest
{
      applicationCode : string|null;

}

export type NewProblemDetails ={
  title: string;
  status: number;
  detail: string;
  type: string;
  instance: string;
  

}