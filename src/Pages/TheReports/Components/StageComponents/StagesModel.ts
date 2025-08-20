export class EntityNames {
  public static readonly Entity = {
    RMA: "RMA",
    LabelSentevents: "labelsentevents",
    PackageReceivedevents: "packagereceivedevents",
    ProductAssessedEvents: "productassessedevents",
    RepairInProgressEvents: "repairinprogressevents",
    RmaCloseEvents: "rmacloseevents",
    SalesOrderAddedEvents: "salesorderaddedevents",
    RMAProducts: "rmaproducts",
  };
}

export interface StageField {
  stageActualFieldName: string;
  stageDisplayFieldName: string;
}

export interface StageTitle {
  stageActualTitle: string;
  stageDisplayTitle: string;
}
export interface StageAndFields {
  stageTitle: StageTitle;
  stageFields: StageField[] | [];
}
export interface AllStageAndFields {
  AllStages: StageAndFields[];
}

export const AllStagesAndEvents: StageAndFields[] = [
  {
    stageTitle: { stageActualTitle: EntityNames.Entity.RMA, stageDisplayTitle: "RMA" },
    stageFields: [
      { stageActualFieldName: "rmaNumber", stageDisplayFieldName: "RMA Number" },
      { stageActualFieldName: "customerEmail", stageDisplayFieldName: "Customer Email" },
      { stageActualFieldName: "dateIssued", stageDisplayFieldName: "Date Issued" },
      { stageActualFieldName: "dateReceived", stageDisplayFieldName: "Date Received" },
      { stageActualFieldName: "rmaProblemDescription", stageDisplayFieldName: "Problem Description" },
      { stageActualFieldName: "stage", stageDisplayFieldName: "Current Stage" },
      { stageActualFieldName: "salesPerson", stageDisplayFieldName: "Sales Person" },
      { stageActualFieldName: "companyName", stageDisplayFieldName: "Company Name" },
      { stageActualFieldName: "contactName", stageDisplayFieldName: "Contact Name" },
      { stageActualFieldName: "street", stageDisplayFieldName: "Street" },
      { stageActualFieldName: "city", stageDisplayFieldName: "City" },
      { stageActualFieldName: "province", stageDisplayFieldName: "Province" },
      { stageActualFieldName: "zipCode", stageDisplayFieldName: "Zip Code" },
      { stageActualFieldName: "country", stageDisplayFieldName: "Country" },
      { stageActualFieldName: "phoneNumber", stageDisplayFieldName: "Phone Number" },
      { stageActualFieldName: "notes", stageDisplayFieldName: "Notes" },
      { stageActualFieldName: "draftAssessment", stageDisplayFieldName: "Draft Assessment" },
      { stageActualFieldName: "salesOrderId", stageDisplayFieldName: "Sales Order ID" },
      { stageActualFieldName: "guidId", stageDisplayFieldName: "GUID ID" },
    ],
  },
  {
    stageTitle: {
      stageActualTitle: EntityNames.Entity.LabelSentevents,
      stageDisplayTitle: "Label Sent",
    },
    stageFields: [
      { stageActualFieldName: "RMANumber", stageDisplayFieldName: "RMA Number" },
      { stageActualFieldName: "SenderEmail", stageDisplayFieldName: "Sender Email" },
      { stageActualFieldName: "ReceiverEmail", stageDisplayFieldName: "Receiver Email" },
      { stageActualFieldName: "Message", stageDisplayFieldName: "Message" },
      { stageActualFieldName: "ContactName", stageDisplayFieldName: "Contact Name" },
      { stageActualFieldName: "Subject", stageDisplayFieldName: "Subject" },
      { stageActualFieldName: "userName", stageDisplayFieldName: "User Name" },
      { stageActualFieldName: "timeStamp", stageDisplayFieldName: "Timestamp" },
      { stageActualFieldName: "guidId", stageDisplayFieldName: "GUID ID" },
    ],
  },
  {
    stageTitle: { stageActualTitle: EntityNames.Entity.PackageReceivedevents, stageDisplayTitle: "Package Received" },
    stageFields: [
      { stageActualFieldName: "RMANumber", stageDisplayFieldName: "RMA Number" },
      { stageActualFieldName: "userName", stageDisplayFieldName: "User Name" },
      { stageActualFieldName: "timeStamp", stageDisplayFieldName: "Timestamp" },
      { stageActualFieldName: "Notes", stageDisplayFieldName: "Notes" },
      { stageActualFieldName: "guidId", stageDisplayFieldName: "GUID ID" },
    ],
  },
  {
    stageTitle: {
      stageActualTitle: EntityNames.Entity.SalesOrderAddedEvents,
      stageDisplayTitle: "Sales Order Added",
    },
    stageFields: [
      { stageActualFieldName: "RMANumber", stageDisplayFieldName: "RMA Number" },
      { stageActualFieldName: "userName", stageDisplayFieldName: "User Name" },
      { stageActualFieldName: "timeStamp", stageDisplayFieldName: "Timestamp" },
      { stageActualFieldName: "Notes", stageDisplayFieldName: "Notes" },
      { stageActualFieldName: "guidId", stageDisplayFieldName: "GUID ID" },
    ],
  },
  {
    stageTitle: { stageActualTitle: EntityNames.Entity.ProductAssessedEvents, stageDisplayTitle: "Product Assessed" },
    stageFields: [
      { stageActualFieldName: "RMANumber", stageDisplayFieldName: "RMA Number" },
      { stageActualFieldName: "userName", stageDisplayFieldName: "User Name" },
      { stageActualFieldName: "timeStamp", stageDisplayFieldName: "Timestamp" },
      { stageActualFieldName: "Notes", stageDisplayFieldName: "Notes" },
      { stageActualFieldName: "guidId", stageDisplayFieldName: "GUID ID" },
    ],
  },
  {
    stageTitle: {
      stageActualTitle: EntityNames.Entity.RepairInProgressEvents,
      stageDisplayTitle: "Repair In Progress",
    },
    stageFields: [
      { stageActualFieldName: "RMANumber", stageDisplayFieldName: "RMA Number" },
      { stageActualFieldName: "userName", stageDisplayFieldName: "User Name" },
      { stageActualFieldName: "timeStamp", stageDisplayFieldName: "Timestamp" },
      { stageActualFieldName: "Notes", stageDisplayFieldName: "Notes" },
      { stageActualFieldName: "guidId", stageDisplayFieldName: "GUID ID" },
    ],
  },
  {
    stageTitle: {
      stageActualTitle: EntityNames.Entity.RmaCloseEvents,
      stageDisplayTitle: "RMA Close",
    },
    stageFields: [
      { stageActualFieldName: "RMANumber", stageDisplayFieldName: "RMA Number" },
      { stageActualFieldName: "userName", stageDisplayFieldName: "User Name" },
      { stageActualFieldName: "timeStamp", stageDisplayFieldName: "Timestamp" },
      { stageActualFieldName: "Notes", stageDisplayFieldName: "Notes" },
      { stageActualFieldName: "guidId", stageDisplayFieldName: "GUID ID" },
    ],
  },

  {
    stageTitle: { stageActualTitle: EntityNames.Entity.RMAProducts, stageDisplayTitle: "RMAProducts" },
    stageFields: [
      { stageActualFieldName: "RMANumber", stageDisplayFieldName: "RMA Number" },
      { stageActualFieldName: "productId", stageDisplayFieldName: "Product ID" },
      { stageActualFieldName: "ProductType", stageDisplayFieldName: "ProductType" },
      { stageActualFieldName: "ProductCapacity", stageDisplayFieldName: "ProductCapacity" },
      { stageActualFieldName: "ProductUnit", stageDisplayFieldName: "ProductUnit" },

      { stageActualFieldName: "ModelNo", stageDisplayFieldName: "ModelNo" },
      { stageActualFieldName: "CalibrationType", stageDisplayFieldName: "CalibrationType" },
      { stageActualFieldName: "ProblemType", stageDisplayFieldName: "ProblemType" },

      { stageActualFieldName: "SolutionType", stageDisplayFieldName: "SolutionType" },
      { stageActualFieldName: "ProblemDetails", stageDisplayFieldName: "ProblemDetails" },
      { stageActualFieldName: "SolutionDetails", stageDisplayFieldName: "SolutionDetails" },

      { stageActualFieldName: "WarrantyCheck", stageDisplayFieldName: "WarrantyCheck" },
      { stageActualFieldName: "ProductionStage", stageDisplayFieldName: "ProductionStage" },
      { stageActualFieldName: "PinDiameter", stageDisplayFieldName: "PinDiameter" },
      { stageActualFieldName: "guidId", stageDisplayFieldName: "GUID ID" },
    ],
  },

  // Posible Additions
  //Quarantine
  //Finished
  //Defects
  //Version Changed
  //Excercise Events
  //Defect Logs
];
