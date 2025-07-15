import { AUTHAPINAME, COMPRESSIONTESTERAPINAME, RegistrationAPINAME } from "./APINames";

const GateWayServerIp = import.meta.env.VITE_GATEWAYSERVERIP ;
const serverProtocol = import.meta.env.VITE_SERVERPROTOCOL;
const frontEndProtocol = import.meta.env.VITE_FRONTENDPROTOCOL;


const GateWay_Port = import.meta.env.VITE_GATEWAY_PORT;
const RegistrationFront_Port = import.meta.env.VITE_REGISTRATIONFRONT_PORT;
const ModelManagerFront_Port = import.meta.env.VITE_MODELMANAGERFRONT_PORT;
const ProductManagerFront_Port = import.meta.env.VITE_PRODUCTMANAGERFRONT_PORT;
const DashBoardFront_Port = import.meta.env.VITE_DASHBOARD_PORT


export const BASEAPIURL            = `${serverProtocol}${GateWayServerIp}${GateWay_Port}`;
export const DashBoardFrontUrl = `${frontEndProtocol}${GateWayServerIp}${DashBoardFront_Port}`;
export const RegistrationFrontURL = `${frontEndProtocol}${GateWayServerIp}${RegistrationFront_Port}`;
export const ModelManagerFrontURL = `${frontEndProtocol}${GateWayServerIp}${ModelManagerFront_Port}`;
export const ProductManagerFrontURL = `${frontEndProtocol}${GateWayServerIp}${ProductManagerFront_Port}`;



export const FronUrls = {
  REGISTRATIONMANAGER_FRONTURL: `${RegistrationFrontURL}`,
  MASSLOADDASBOARD_FRONTURL: `${DashBoardFrontUrl}`,
  MODEL_MANAGER_FRONTURL: `${ModelManagerFrontURL}`,
  PRODUCT_MANAGER_FRONTURL: `${ProductManagerFrontURL}`,
};




export const AuthUrls = {
  APPLICATIONTOKEN_BASEURL: `${BASEAPIURL}/${AUTHAPINAME}/access_token`,
  DASHBOARDTOKEN_BASEURL: `${BASEAPIURL}/${AUTHAPINAME}/dashboard_token`,
  RevalidateValidateUser_BASEURL: `${BASEAPIURL}/${AUTHAPINAME}/validLoginCredentials`,
  FLIGHTTOKEN_BASEURL: `${BASEAPIURL}/${AUTHAPINAME}/flight_token`,
  REFRESH_BASEURL: `${BASEAPIURL}/${AUTHAPINAME}/refresh_token`,
};

//export const defaultButtonRadius = 15;
export const Fixedvalues = {
  DASHBOARD_NAME: `MASSFUSION   -${import.meta.env.VITE_ENVIRONMENT} `,
  HubServerConnectionUrl: `${BASEAPIURL}${RegistrationAPINAME}/theHub`,
  //VerificationSignalConnectionUrl: `${BASEAPIURL}${PRODUCTAPINAME}/verificationSignalHub`,
   VerificationSignalConnectionUrl: `${BASEAPIURL}${COMPRESSIONTESTERAPINAME}/verificationSignalHub`,


  CopyRight: "© Massload Technologies Inc.",
};

export interface APP {
  theindex: number;
  appName: string;
  appCode: string;
  appDescription: string;
  appUrl: string;
  appVersion: string;
}

//REMEMBER TO SYCRONIZE THESE WITH RegistrationManager.Infrastructure.Persistence.EntitiesConfig

export const Applications: APP[] = [
  {
    theindex: 1,
    appName: `Manage Users`,
    appCode: `APP01`,
    appDescription: `This is the description for app 1.`,
    appUrl: FronUrls.REGISTRATIONMANAGER_FRONTURL,
    appVersion: "1.0",
  },
  {
    theindex: 2,
    appName: `Model Manager`,
    appCode: `APP02`,
    appDescription: `This is the description for app 2.`,
    appUrl: FronUrls.MODEL_MANAGER_FRONTURL,
    appVersion: "1.0",
  },
  {
    theindex: 3,
    appName: `Product Manager`,
    appCode: `APP03`,
    appDescription: `This is the description for app 3.`,
    appUrl: "",
    appVersion: "1.0",
  },
  {
    theindex: 4,
    appName: `Document Manager`,
    appCode: `APP04`,
    appDescription: `This is the description for app 4.`,
    appUrl: "",
    appVersion: "1.0",
  },
  {
    theindex: 5,
    appName: `Time Registry`,
    appCode: `APP05`,
    appDescription: `This is the description for app 5.`,
    appUrl: "",
    appVersion: "1.0",
  },
  {
    theindex: 6,
    appName: `Custom Quote`,
    appCode: `APP06`,
    appDescription: `Customer Quotes`,
    appUrl: "",
    appVersion: "1.0",
  },
  {
    theindex: 7,
    appName: `Sales Orders`,
    appCode: `APP07`,
    appDescription: `Materials Purchasing Manager.`,
    appUrl: "",
    appVersion: "1.0",
  },
  {
    theindex: 8,
    appName: `Purchase Orders`,
    appCode: `APP08`,
    appDescription: `MMF Production Scheduler.`,
    appUrl: "",
    appVersion: "1.0",
  },
  {
    theindex: 9,
    appName: `Purchasing`,
    appCode: `APP09`,
    appDescription: `Massload Purchasing`,
    appUrl: "",
    appVersion: "1.0",
  },
  {
    theindex: 10,
    appName: `RMA Manager`,
    appCode: `APP10`,
    appDescription: `Massload Production Scheduler`,
    appUrl: "",
    appVersion: "1.0",
  },
  {
    theindex: 11,
    appName: `Custom Designs`,
    appCode: `APP11`,
    appDescription: `Massload Production Scheduler`,
    appUrl: "",
    appVersion: "1.0",
  },
  {
    theindex: 12,
    appName: `.`,
    appCode: `00000`,
    appDescription: `Massload Production Scheduler`,
    appUrl: "",
    appVersion: "1.0",
  },
];
