import { useGetConfirmIfUserHasExistingValidTokenProps } from "../Hooks/useGetConfirmIfUserHasExistingValidToken";
import { useGetContactByContactIdProps } from "../Hooks/useGetContactByContactId";
import { RMAGetRequestByStage, RMAGetTrackingDetailRequestDTO } from "../Models/RMAManagerModels/Dto";



export const QueryKeys = {

  useGetContactByEmailKey: {
    mainKey: "Contacts",
  },
  useGetRMATrackingDetails: {
    mainKey: "useGetRMATrackingDetails",
    subKeys: (params: { req: RMAGetTrackingDetailRequestDTO }) => [params.req.stage,  params.req.rMANumber],
  },

  useGetRMAByStage: {
    mainKey: "useGetRMAByStage",
    subKeys: (params: { req: RMAGetRequestByStage }) => [params.req.stage],
  },

  


  useGetConfirmIfUserHasExistingValidTokenPropsKey: {
    mainKey: "UserId",
    subKeys: (params: { data: useGetConfirmIfUserHasExistingValidTokenProps }) => [params.data.UserId],
  },

  useGetRMANumberKey: {
    mainKey: "RMANextNumber",
  },

useGetContactByContactIdKey: {
    mainKey: "ContactsByContactId",
    subKeys: (params: { data: useGetContactByContactIdProps }) => [params.data.ContactId],
  },

  useCreateRMAKey: {
    mainKey: "CreateRMA",
  },


  
};
