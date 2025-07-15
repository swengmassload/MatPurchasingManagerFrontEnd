
export const PRODUCTAPINAME = `/ProductManagerAPI`;
export const MODELAPINAME = `/ModelManagerAPI`;
export const RegistrationAPINAME = `/RegistrationManagerAPI`;
export const AUTHAPINAME = "AuthAPI";
export const COMPRESSIONTESTERAPINAME = `/CompressionTesterAPI`;
export const RMAAPINAME = `/RMAManagerAPI`;

//export const baseURL = "https://localhost:7272/api";// th
export const ExchangeEndPoint = `${RMAAPINAME}/v1/ConstantContact/exchangeCode`;
export const SearchEndPoint = `${RMAAPINAME}/v1/ConstantContact/searchContact`;


//https://developer.constantcontact.com/login/index.html
export  const clientId = "a861af35-d728-4e4b-8151-5b1f048db025";
export  const redirectUri = "http://localhost:5175/oauth/callback";
export  const userId ="123";  
export const state = Math.random().toString(36).substring(2);
export  const authUrl = `https://authz.constantcontact.com/oauth2/default/v1/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri)}&response_type=code&scope=contact_data%20offline_access&state=${state}&userId=${userId}`;

export const RMAUserStorageKey = "RMAUSER";     
export const ConstantContactSearchEmailKey = "ConstantContactSearchEmail"; 
