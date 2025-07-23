// Please note :These names must be the same name in Production Database there Please make sure they are
//always in alignment or you automate the retrival of these and send back just the stage code
// the stage code can also be like names so that its easy to read
// meaning that that the future work should be that stages are retrieved from Product manage Stage API
// thefore ProductionStages.test.ts must always pass or you change the names here all the way from the API to here

export interface Status {
  name: string;
  code: string;
}

export interface RMAStage {
  stage: string;
  code: string;// code is used for routing
  priority?: number;
  CommonName: string;
  stageCardName?: string;
}

export class DefaultRMAStages {
  public static readonly LABELSENT: RMAStage = {
    stage: "LABEL_SENT",
    code: "LABELSENT",
    CommonName: "Create RMA",

    priority: 1,
  };

  public static readonly PACKAGERECEIVED: RMAStage = {
    stage: "PACKAGE_RECEIVED",
    code: "PACKAGERECEIVED",
    CommonName: "Receive Package",
    priority: 2,
  };

  public static readonly PRODUCTASSESSED: RMAStage = {
    stage: "PRODUCT_ASSESSED",
    code: "PRODUCTASSESSED",
    CommonName: "Assess Product",
    priority: 3,
  };

  public static readonly SALESORDERADDED: RMAStage = {
    stage: "SALES_ORDER_ADDED",
    code: "SALESORDERADDED",
    CommonName: "Add Sales Order",
    priority: 4,
  };
  public static readonly TRACKING: RMAStage = {
    stage: "TRACKING",
    code: "TRACKING",
    CommonName: "Tracking",
    priority: 4,
  };

  public static readonly REPAIRINPROGRESS: RMAStage = {
    stage: "REPAIR_IN_PROGRESS",
    CommonName: "Repair Prodcuct",
    code: "REPAIRINPROGRESS",
    priority: 5,
  };

  public static readonly RMA_CLOSED: RMAStage = {
    stage: "RMA_CLOSED",
    CommonName: "Closed RMA",
    code: "CLOSED",
    priority: 6,
  };

  public static readonly AllStages: RMAStage[] = [
    DefaultRMAStages.LABELSENT,
    DefaultRMAStages.PACKAGERECEIVED,
    DefaultRMAStages.PRODUCTASSESSED,
    DefaultRMAStages.SALESORDERADDED,
    DefaultRMAStages.REPAIRINPROGRESS,
    DefaultRMAStages.RMA_CLOSED,
  ];
}
