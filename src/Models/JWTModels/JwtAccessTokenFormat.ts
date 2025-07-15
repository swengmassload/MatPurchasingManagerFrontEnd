export interface JwtAccessToken {
   aud: string;
   Email   : string;
   UserName: string;
   exp: number;
    iat: number;
    iss: string;
    jti     : string;
    nameid  : string;
    nbf: number;
   }

export interface JwtAccessTokenFormat extends JwtAccessToken {
    APPLICATION: string[];
    FUNCTION: string[];
     
  
       // sub: string;
       
    
      
    // whatever else is in the JWT.
  }