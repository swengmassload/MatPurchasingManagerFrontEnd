import { RMAGetTrackingDetailRequestDTO } from "../Models/RMAManagerModels/Dto";


export const QueryKeys = {

useGetKanbanDetailsKey: {
    mainKey: "useGetKanbanDetailsKey",
  },
//make sure  you remove this later
  useGetRMATrackingDetails: {
    mainKey: "useGetRMATrackingDetails",
    subKeys: (params: { req: RMAGetTrackingDetailRequestDTO }) => [params.req.stage, params.req.rMANumber],
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
//   useGetRMAByStage: {
//     mainKey: "useGetRMAByStage",
//     subKeys: (params: { req: RMAGetRequestByStage }) => [params.req.Stage],
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
