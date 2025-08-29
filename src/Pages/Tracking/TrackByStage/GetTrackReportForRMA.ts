import { DefaultRMAStages } from "../../../Constants/RMAStages";
import { TrackingGroupedProductDTO, TrackReport } from "../../../Models/RMAManagerModels/Dto";

function sumBy<T>(arr: T[], selector: (item: T) => number): number {
  return arr.reduce((acc, item) => acc + selector(item), 0);
}

function GetStageCount(
  trackedModelData: TrackingGroupedProductDTO[],
  code: string
): TrackingGroupedProductDTO[] | undefined {
  if (!Array.isArray(trackedModelData)) {
    return undefined;
  }
  const stageData = trackedModelData.filter((item) => item.stage === code);
  if (stageData.length > 0) {
    return stageData;
  }
  return undefined;
}

export const GetTrackReportForRMA = (trackedModelData: TrackingGroupedProductDTO[]): TrackReport => {
  const trackReport = new TrackReport();
  // trackReport.ModelName = modelName;
  let modelsum = 0;

  const ans = GetStageCount(trackedModelData, DefaultRMAStages.LABELSENT.stage);
  if (ans) {
    const sum = sumBy(ans, (item) => item.count);
    trackReport.LabelSentValue = sum;
    modelsum += sum;
  }

  const ans0 = GetStageCount(trackedModelData, DefaultRMAStages.PACKAGERECEIVED.stage);
  if (ans0) {
    const sum = sumBy(ans0, (item) => item.count);
    trackReport.PackageReceivedValue = sum;
    modelsum += sum;
  }

  const ans1 = GetStageCount(trackedModelData, DefaultRMAStages.PRODUCTASSESSED.stage);
  if (ans1) {
    const sum = sumBy(ans1, (item) => item.count);
    trackReport.ProductAssessedValue = sum;
    modelsum += sum;
  }

  const ans2 = GetStageCount(trackedModelData, DefaultRMAStages.SALESORDERADDED.stage);
  if (ans2) {
    const sum = sumBy(ans2, (item) => item.count);
    trackReport.SalesOrderAddedValue = sum;
    modelsum += sum;
  }

  const ans3 = GetStageCount(trackedModelData, DefaultRMAStages.REPAIRINPROGRESS.stage);
  if (ans3) {
    const sum = sumBy(ans3, (item) => item.count);
    trackReport.RepairInProgressValue = sum;
    modelsum += sum;
  }

  const ans4 = GetStageCount(trackedModelData, DefaultRMAStages.RMA_CLOSED.stage);
  if (ans4) {
    const sum = sumBy(ans4, (item) => item.count);
    trackReport.RMACLOSEDValue = sum;
    modelsum += sum;
  }
  trackReport.Total = modelsum;

  return trackReport;
};
