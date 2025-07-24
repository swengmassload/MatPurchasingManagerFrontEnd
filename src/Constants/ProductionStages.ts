  // Please note :These names must be the same name in Production Database there Please make sure they are
  //always in alignment or you automate the retrival of these and send back just the stage code
  // the stage code can also be like names so that its easy to read
  // meaning that that the future work should be that stages are retrieved from Product manage Stage API
  // thefore ProductionStages.test.ts must always pass or you change the names here all the way from the API to here



export interface Status {
  name: string;
  code: string;
}

export interface ProductionStage {
  stage: string;
  code: string;
  priority?: number;
  optionalCommonName?: string;
  stageCardName?: string;
  // barCode: string;
}

export class DefaultProductionStages {
  public static readonly Scrap: ProductionStage = {
    stage: "Scrap",
    code: "Scrap",
    priority: -2,
  };

  public static readonly Quarantine: ProductionStage = {
    stage: "Quarantine",
    code: "Quarantine",
    priority: -1,
  };

  public static readonly Finished: ProductionStage = {
    stage: "Finished",
    code: "Finished",
    priority: 0,
  };

  public static readonly AssignSerialNo: ProductionStage = {
    stage: "Batching / Serial Number",
    code: "Assign_SerialNo",
    priority: 1,
  };

  public static readonly SurfacePreparation: ProductionStage = {
    stage: "Surface Preparation",
   // code: "Surface_Preparation",
    code: "Surface_Prep",
    stageCardName: "Surface Prep",
    priority: 2,
  };

  public static readonly Gauging: ProductionStage = {
    stage: "Gauging",
    code: "Gauging",
    priority: 3,
  };

  public static readonly GaugeInspection: ProductionStage = {
    stage: "Gauge Inspection",
    code: "Gauge_Inspection",
    priority: 4,
  };

  public static readonly Wiring: ProductionStage = {
    stage: "Wiring",
    code: "Wiring",
    priority: 5,
  };

  public static readonly Cabling: ProductionStage = {
    stage: "Cabling",
    code: "Cabling",
    priority: 6,
  };

  public static readonly InitialVerificationManual: ProductionStage = {
    stage: "Initial Verification Manual",
    optionalCommonName: "Initial Verification",

    //code: "Exercise_Initial_Verification_Manual",
    code: "IVManual",
    stageCardName: "IV Manual",
    priority: 7,
  };

  public static readonly FinalVerificationManual: ProductionStage = {
    optionalCommonName: "Final Verification",
    stage: "Final Verification Manual",
    //code: "Final_Verification_Manual",
    code: "FVManual",
    stageCardName: "FV Manual",
    priority: 7,
  };

  public static readonly InitialVerificationAuto: ProductionStage = {
    optionalCommonName: "Initial Verification",
    stage: "Initial Verification Auto",
    //code: "Exercise_Initial_Verification_Auto",
    code: "IVAuto",
    stageCardName: "IV Auto",
    priority: 7,
  };

  public static readonly FinalVerificationAuto: ProductionStage = {
    optionalCommonName: "Final Verification",
    stage: "Final Verification Auto",
    //code: "Final_Verification_Auto",
    code: "FVAuto",
    stageCardName: "FV Auto",
    priority: 7,
  };

  public static readonly AddResistor: ProductionStage = {
    stage: "Add Resistor",
    code: "Add_Resistor",

    priority: 8,
  };

  public static readonly Sealing: ProductionStage = {
    stage: "Sealing",
    code: "Sealing",
    priority: 9,
  };

  public static readonly Labelling: ProductionStage = {
    stage: "Labelling",
    code: "Labelling",
    priority: 11,
  };

  public static readonly Inventory: ProductionStage = {
    stage: "Inventory",
    code: "Inventory",
    priority: 12,
  };

  public static readonly Shipping: ProductionStage = {
    stage: "Shipping",
    code: "Shipping",
    priority: 13,
  };

  public static readonly AllStages: ProductionStage[] = [
    DefaultProductionStages.AssignSerialNo,
    DefaultProductionStages.SurfacePreparation,
    DefaultProductionStages.Gauging,
    DefaultProductionStages.GaugeInspection,
    DefaultProductionStages.Wiring,
    DefaultProductionStages.Cabling,
    DefaultProductionStages.InitialVerificationManual,
    DefaultProductionStages.FinalVerificationManual,
    DefaultProductionStages.AddResistor,
    DefaultProductionStages.Sealing,
    DefaultProductionStages.InitialVerificationAuto,
    DefaultProductionStages.FinalVerificationAuto,
    DefaultProductionStages.Labelling,
    DefaultProductionStages.Inventory,
    DefaultProductionStages.Shipping,
    DefaultProductionStages.Scrap,
    DefaultProductionStages.Quarantine,
    DefaultProductionStages.Finished,
  ];
}
