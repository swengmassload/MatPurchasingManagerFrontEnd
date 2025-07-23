
import { DefaultRMAStages } from "../../../Constants/RMAStages";
import { BaseEventResponseDTO, RMATrackingReportDetailResponseDTO } from "../../../Models/RMAManagerModels/Dto";

export const SortedAvailableEvents = (events: RMATrackingReportDetailResponseDTO | undefined): BaseEventResponseDTO[] => {
  if (!events) return [];

  const result: BaseEventResponseDTO[] = [];

  if (events.labelSentEvents) {
    events.labelSentEvents.map((event) => {
      result.push({
        EventName: DefaultRMAStages.LABELSENT.code,
        RMANumber: event.rmaNumber,
        userName: event.userName,
       // senderEmail: event.senderEmail,
       // receiverEmail: event.receiverEmail, 
        timeStamp: event.timeStamp,
        guidId: event.guidId,
        AllPropertiesAsJson: "",
      });
    });
  }

  if (events.packageReceivedEvents) {
    events.packageReceivedEvents.map((event) => {
      result.push({
        EventName: DefaultRMAStages.PACKAGERECEIVED.code,
        RMANumber: event.rmaNumber,
        userName: event.userName,
        timeStamp: event.timeStamp,
        guidId: event.guidId,
        AllPropertiesAsJson: JSON.stringify(event),
      });
    });
  }



  if (events.productAssessedEvents) {
    events.productAssessedEvents.map((event) => {
      result.push({
        EventName: DefaultRMAStages.PRODUCTASSESSED.code,
        RMANumber: event.rmaNumber,
        userName: event.userName,
        timeStamp: event.timeStamp,
        guidId: event.guidId,
        AllPropertiesAsJson: JSON.stringify(event),
      });
    });
  }


  if (events.salesOrderAddedEvents) {
    events.salesOrderAddedEvents.map((event) => {
      result.push({
        EventName: DefaultRMAStages.SALESORDERADDED.code,
        RMANumber: event.rmaNumber,
        userName: event.userName,
        timeStamp: event.timeStamp,
        guidId: event.guidId,
        AllPropertiesAsJson: JSON.stringify(event),
      });
    });
  }


  if (events.repairInProgressEvents) {
    events.repairInProgressEvents.map((event) => {
      result.push({
        EventName: DefaultRMAStages.REPAIRINPROGRESS.code,
        RMANumber: event.rmaNumber,
        userName: event.userName,
        timeStamp: event.timeStamp,
        guidId: event.guidId,
        AllPropertiesAsJson: JSON.stringify(event),
      });
    });
  }
  if (events.rmaClosedEvents) {
    events.rmaClosedEvents.map((event) => {
      result.push({
        EventName: DefaultRMAStages.RMA_CLOSED .code,
        RMANumber: event.rmaNumber,
        userName: event.userName,
        timeStamp: event.timeStamp,
        guidId: event.guidId,
        AllPropertiesAsJson: JSON.stringify(event),
      });
    });
  }
  return result.sort((a, b) => {
    return new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime();
  });
};
