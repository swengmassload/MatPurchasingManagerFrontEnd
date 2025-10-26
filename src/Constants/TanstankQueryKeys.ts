import { PartsSearchParams, PurchasingGetRequestByStage } from "../Models/MatPurchasingModels/Dto";

export const QueryKeys = {

  useGetPartsKey: { mainKey: "useGetPartsKey",},
  useGetKanbanDetailsKey: {    mainKey: "useGetKanbanDetailsKey",},
  useCreateMaterialRequestKey: {    mainKey: "useCreateMaterialRequestKey",},


  useGetPartByBarcodeoRPartCodeKey: {
      mainKey: "useGetPartByBarcodeoRPartCodeKey",
      subKeys: (params: { req: PartsSearchParams }) => [params.req.BarCode, params.req.PartCode, params.req.SearchType, params.req.Description],
 
  },



  useGetPurchasingByStage: {
    mainKey: "useGetPurchasingByStage",
    subKeys: (params: { req: PurchasingGetRequestByStage }) => [params.req.Stage],
  },




//   useGetContactByEmailKey: {
//     mainKey: "Contacts",
//   },



//   useGetIndicatorsModelsKey: {
//     mainKey: "useGetIndicatorsModelsKey",
//   },
  
// useGetSearchRMA: {
//     mainKey: "useGetSearchRMA",
//     subKeys: (params: { req: RMASearchRequestDTO }) => [params],
//   },

//   useGetRMATrackingDetails: {
//     mainKey: "useGetRMATrackingDetails",
//     subKeys: (params: { req: RMAGetTrackingDetailRequestDTO }) => [params.req.stage, params.req.rMANumber],
//   },

//   useGetRMASolutionTypesKey: {
//     mainKey: "useGetRMASolutionTypes",
//   },

//   useGenerateReportsKey: {
//     mainKey: "useGenerateReports",
//   },


//   useGetRMAProblemTypesKey: {
//     mainKey: "useGetRMAProblemTypes",
//   },

//   useGetRMANumberKey: {
//     mainKey: "RMANextNumber",
//   },

//   useGetContactByContactIdKey: {
//     mainKey: "ContactsByContactId",
//     subKeys: (params: { data: useGetContactByContactIdProps }) => [params.data.ContactId],
//   },

//   useCreateRMAKey: {
//     mainKey: "CreateRMA",
//   },

//   useGetRMAByIdKey: {
//     mainKey: "useGetRMAById",
//   },
};
