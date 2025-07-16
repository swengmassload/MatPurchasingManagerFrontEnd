// import { RegistrationAPINAME, MODELAPINAME, PRODUCTAPINAME, COMPRESSIONTESTERAPINAME } from "./APINames";

import { RMAAPINAME } from "./APINames";

// export const RegistrationEnpoints = {
//   UsersEndpoint: `${RegistrationAPINAME}/v1/Users`,
//   ResourceResponsibilityEndPoint: `${RegistrationAPINAME}/v1/ResourceResponsibilitys`,
//   SignatureManagerEndpoint: `${RegistrationAPINAME}/v1/SignatureManagers`,
//   EMailSenderEndpoint: `${RegistrationAPINAME}/v1/EMailSenders`,

// };

// export const ModelManagerEnpoints = {
//   ProcessFlowGroupEndpoint: `${MODELAPINAME}/v1/ProcessFlowGroups`,
//   ModelTypeEndpoint: `${MODELAPINAME}/v1/ModelTypes`,
//   ModelEndpoint: `${MODELAPINAME}/v1/Models`,
//   TestPointEndpoint: `${MODELAPINAME}/v1/DefaultTestPoints`,
//   ModelVersionEndpoint: `${MODELAPINAME}/v1/ModelVersions`,
//   ModelVersionQueryStringEndpoint: `${MODELAPINAME}/v1/ModelVersions/QueryString`,
//   MaxModelVersionQueryStringEndpoint: `${MODELAPINAME}/v1/ModelVersions/MostRecentVersion`,
//   EditableModelVersionEndpoint: `${MODELAPINAME}/v1/ModelVersions/EditableVersion`,
//   ModelVersionDocumentEndpoint: `${MODELAPINAME}/v1/ModelVersionDocuments`,
//   ModelVersionDocumentQueryStringEndpoint: `${MODELAPINAME}/v1/ModelVersionDocuments/QueryString`,
//   DocumentEndpoint: `${MODELAPINAME}/v1/ModelVersionDocuments/Document`,
//   ViewSpecificModelVersionEndpoint: `${MODELAPINAME}/v1/ModelVersions/ViewSpecificVersion`,
// };

// export const ProductManagerEnpoints = {

//   GetProductByStage: `${PRODUCTAPINAME}/v1/Products/Stage`,
//   UpdateProductByStage: `${PRODUCTAPINAME}/v1/Products/Stage`,
//   ModelVersionReassignment: `${PRODUCTAPINAME}/v1/Products/ModelVersionReassignment`,
//   UpdateProductBySurfacePrepStage: `${PRODUCTAPINAME}/v1/Products/SurfacePrep`,
//   PrintStageCardEndpoint: `${PRODUCTAPINAME}/v1/Products/PrintStageCard`,
//   UpdateProductByExercise: `${PRODUCTAPINAME}/v1/Products/Exercise`,
//   ReprintSurfacePrepLabel: `${PRODUCTAPINAME}/v1/ProductSurfacePreparationEvents/RePrintLabel`,
//   PrintActualOutputLabel: `${PRODUCTAPINAME}/v1/ProductLabellingEvents/PrintActualOutPutLabel`,
//   BatchEndpoint: `${PRODUCTAPINAME}/v1/Batchs`,
//   BatchNoEndpoint: `${PRODUCTAPINAME}/v1/Batchs/GetNewBatchNo`,
//   BatchbySerialNoEndpoint: `${PRODUCTAPINAME}/v1/Batchs/SerialNo`,
//   DefectTypeEndpoint: `${PRODUCTAPINAME}/v1/DefectTypes`,
//   DefectLogEndpoint: `${PRODUCTAPINAME}/v1/DefectLogs`,
//   TesterEndpoint: `${PRODUCTAPINAME}/v1/Testers`,
//   ReferenceCellStandards: `${PRODUCTAPINAME}/v1/ReferenceCellStandards`,
//   ProductInitialAutoVerificationEventEndpoint: `${PRODUCTAPINAME}/v1/ProductInitialVerificationEvents/Auto`,
//   ProductInitialManualVerificationEventEndpoint: `${PRODUCTAPINAME}/v1/ProductInitialVerificationEvents/Manual`,
//   ProductFinalManualVerificationEventEndpoint: `${PRODUCTAPINAME}/v1/ProductFinalVerificationEvents/Manual`,
//   ProductFinalAutoVerificationEventEndpoint: `${PRODUCTAPINAME}/v1/ProductFinalVerificationEvents/Auto`,
//   //RMCEndPoint: `${PRODUCTAPINAME}/v1/Devices`,
//     RMCEndPoint: `${COMPRESSIONTESTERAPINAME}/v1/Devices`,
//   //VerificationEndPoint: `${PRODUCTAPINAME}/v1/AutoVerification`,
//   VerificationEndPoint: `${COMPRESSIONTESTERAPINAME}/v1/AutoVerification`,

//   TrimResistorEndpoint: `${PRODUCTAPINAME}/v1/TrimmingResistors`,
//   ShuntResistorEndpoint: `${PRODUCTAPINAME}/v1/ShuntResistors`,
//   GetProductById: `${PRODUCTAPINAME}/v1/Products/`,
//   GetProductBySerialNoOrBatchNo: `${PRODUCTAPINAME}/v1/Products/SerialNoOrBatcNo`,
//   NCRLogs: `${PRODUCTAPINAME}/v1/NCRLogs`,
//   ProductMovingEvents: `${PRODUCTAPINAME}/v1/ProductMovingEvents`,
//   ReferenceCellStandardEndPoint: `${PRODUCTAPINAME}/v1/ReferenceCellStandards`,
//   TrackingGroupedProduct: `${PRODUCTAPINAME}/v1/ProductsTracking`,
//   GetTrackingReportDetails: `${PRODUCTAPINAME}/v1/ProductsTracking/TrackingReportDetail`,
//   GetTrackingDetailsBySpecifics: `${PRODUCTAPINAME}/v1/ProductsTracking/TrackingDetailsBySpecifics`,
//   SearchCertificatesEndpoint: `${PRODUCTAPINAME}/v1/ProductCertificates/QueryString`,
//   GetCertificatesByGuidEndpoint: `${PRODUCTAPINAME}/v1/ProductCertificates/CertificateGuid`,
//   GetCertificatesByProductIdEndpoint: `${PRODUCTAPINAME}/v1/ProductCertificates/CertificateProductId`,
//   IndicatorsModelEndpoint: `${PRODUCTAPINAME}/v1/IndicatorModels`,
//   TransmitterModelEndpoint: `${PRODUCTAPINAME}/v1/TransmitterModels`,
//   GetReportsEndpoint: `${PRODUCTAPINAME}/v1/ProductsTracking`,

// };

export const RMAManagerEnpoints = {
  ExchangeEndPoint: `${RMAAPINAME}/v1/ConstantContact/exchangeCode`,
  SearchEndPoint: `${RMAAPINAME}/v1/ConstantContact/searchContact`,
  SearchContactEndPoint: `${RMAAPINAME}/v1/ConstantContact/searchContactByContactId`,
  RMACreateEnpoints: `${RMAAPINAME}/v1/RMAs`,
  RMANextNumberEndpoint: `${RMAAPINAME}/v1/RMANextNumbers`,
};
//https://localhost:7175/RMAManagerAPI/v1/RMANextNumbers'


