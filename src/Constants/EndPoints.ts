import { PRODUCTAPINAME, RMAAPINAME } from "./APINames";

export const ProductManagerEnpoints = {
  ProductMovingEvents: `${PRODUCTAPINAME}/v1/ProductMovingEvents`,
};

export const RMAManagerEnpoints = {
  ExchangeEndPoint: `${RMAAPINAME}/v1/ConstantContact/exchangeCode`,
  SearchEndPoint: `${RMAAPINAME}/v1/ConstantContact/searchContact`,
  SearchContactEndPoint: `${RMAAPINAME}/v1/ConstantContact/searchContactByContactId`,
  ConfirmIfUserHasExistingValidToken: `${RMAAPINAME}/v1/ConstantContact/ConfirmIfUserHasExistingValidToken`,
  RMAEndpoints: `${RMAAPINAME}/v1/RMAs`,

  ProductAssessedEventsEndPoints: `${RMAAPINAME}/v1/ProductAssessedEvents`,
  SalesOrderAddedEventsEndPoints: `${RMAAPINAME}/v1/SalesOrderAddedEvents`,
  RepairInProgressEventsEndPoints: `${RMAAPINAME}/v1/RepairInProgressEvents`,
  CreateChangeProductStageEndPoints: `${RMAAPINAME}/v1/RepairTypes/CreateChangeStage`,
  CloseRMAEventsEndPoints: `${RMAAPINAME}/v1/CloseRMAEvents`,
  RMAProductByStage: `${RMAAPINAME}/v1/RMAs/Stage`,
  PackageReceivedEventsEndPoints: `${RMAAPINAME}/v1/PackageReceivedEvents`,
  LabelSentEventsEndPoints: `${RMAAPINAME}/v1/LabelSentEvents`,
  RMANextNumberEndpoint: `${RMAAPINAME}/v1/RMANextNumbers`,
  TrackingGroupedRMAProduct: `${RMAAPINAME}/v1/RMATracking`,
  GetRMATrackingDetails: `${RMAAPINAME}/v1/RMATracking/TrackingReportDetail`,
};
