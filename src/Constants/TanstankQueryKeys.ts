import { useGetContactByContactIdProps } from "../Hooks/useGetContactByContactId";



export const QueryKeys = {

  useGetContactByEmailKey: {
    mainKey: "Contacts",
   // subKeys: (params: { data: useGetContactByEmailProps }) => [params.data.email],
  },

useGetContactByContactIdKey: {
    mainKey: "ContactsByContactId",
    subKeys: (params: { data: useGetContactByContactIdProps }) => [params.data.ContactId],
  },

  useCreateRMAKey: {
    mainKey: "CreateRMA",
  },

//  // useGetModelVersion ModelVersionResponseDTOKey
//   useGetModelVersionKey: {
//     mainKey: "ModelVersionResponseDTOKey",  
  
//   },



//     useGetModelTypesKey: {
//     mainKey: "ModelResponseDTOKey",
//   },



//   useGetModelKey: {
//     mainKey: "ModelResponseDTOKey",
//   },




//   useSearchCertificatesKey: {
//     mainKey: "useSearchCertificatesKey",
//     subKeys: (params: { req: ProductCertificateGetRequestDTO }) => [params.req.productId, params.req.certificateType],
//   },

//   useGenerateReportsKey: {
//     mainKey: "useGenerateReportsKey",
//    // subKeys: (params: { stage: string, modelName: string }) => [params.stage, params.modelName],
//   },

//   useGetTrackingDetailsKey: {
//     mainKey: "useGetTrackingDetailsKey",
//     subKeys: (params: { req: ProductGetTrackingDetailRequestDTO }) => [params.req.stage, params.req.modelName, params.req.productId],
    
//   },

//   useGetTrackingDetailsBySpecificsKey: {
//     mainKey: "useGetTrackingDetailsBySpecificsKey",
//     subKeys: (params: { req: TrackingSearchParams }) => [params.req.FromProductId, params.req.BatchNo, params.req.SalesOrderId, params.req.InspectionResult],
    
//   },
//   useGetTransmitterModelsKey: {
//     mainKey: "useGetTransmitterModelsKey",
//   },
  
//   useGetIndicatorsModelsKey: {
//     mainKey: "useGetIndicatorsModelsKey",
//   },
//   useGetDefectTypesKey: {
//     mainKey: "useGetDefectTypesKey",
//   },
//   useGetTestersKey: {
//     mainKey: "useGetTestersKey",
//   },
//   useGetNCRLogsKey: {
//     mainKey: "NCRLogsKey",
//   },
//   useGetProductsByProductId: {
//     mainKey: "useGetProductsByProductIdKey",
//     subKeys: (params: { productId: number }) => [params.productId],
  
//   },
  

//   useGetBatchUsingSampleSerialNoKey: {
//     mainKey: "useGetBatchUsingSampleSerialNo",
//     subKeys: (params: { product: RequestBySerialNoOrBatchNo }) => [params.product.SerialNo],
//   },


//   useGetBatchNoKey: {
//     mainKey: "useGetBatchNoKey",
//   },


//   useGetProductUsingSerialNoBatchKey: {
//     mainKey: "useGetProductBySerialNoOrBatch",
//     subKeys: (params: { product: RequestBySerialNoOrBatchNo }) => [params.product.SerialNo],
//   },
//   useGetReferenceStandandCellsKey: {
//     mainKey: "useGetReferenceStandandCells",
//   },
//   useGetDefaultTestPointKey: {
//     mainKey: "useGetDefaultTestPointKey",
//   },

//   useGetShuntResistorsKey: {
//     mainKey: "useGetShuntResistorsKey",
//   },
//   useGetTrimResistorsKey: {
//     mainKey: "useGetTrimResistorsKey",
//   },
//   useGetZeroPointMeasurement_MeterModeVoltage: {
//     mainKey: "useGetZeroPointMeasurement_MeterModeVoltage",
//   },
//   useGetMeasurement_MeterModeResistance: {
//     mainKey: "useGetMeasurement_MeterModeResistance",
//   },
//   useGetDefectLogsKey: {
//     mainKey: "useGetDefectLogsKey",
//   },

  
};
