import { DefaultProductionStages } from "./ProductionStages";
export const sideBardrawerWidth: number = 256;
export interface MenuName {
  stage: string;
  route: string;
  description: string;
  barCode?: string;
}

export class SideBarMenuName {
  public static readonly ProductionStages: MenuName = {
    stage: "Production Stages",
    route: "ProductionStages",
    description: "ProductionStages",
  };

  public static readonly SurfacePreparation: MenuName = {
    stage: DefaultProductionStages.SurfacePreparation.stage,
    route: DefaultProductionStages.SurfacePreparation.code,
    barCode: DefaultProductionStages.SurfacePreparation.code,
    description: "Surface Preparation stage description",
  };

  public static readonly Gauging: MenuName = {
    stage: DefaultProductionStages.Gauging.stage,
    route: DefaultProductionStages.Gauging.code,
    barCode: DefaultProductionStages.Gauging.code,
    description: "Gauging stage description",
  };

  public static readonly GaugeInspection: MenuName = {
    stage: DefaultProductionStages.GaugeInspection.stage,
    route: DefaultProductionStages.GaugeInspection.code,
    barCode: DefaultProductionStages.GaugeInspection.code,
    description: "Gauge Inspection stage description",
  };

  public static readonly Wiring: MenuName = {
    stage: DefaultProductionStages.Wiring.stage,
    route: DefaultProductionStages.Wiring.code,
    barCode: DefaultProductionStages.Wiring.code,
    description: "Wiring stage description",
  };

  public static readonly Cabling: MenuName = {
    stage: DefaultProductionStages.Cabling.stage,
    route: DefaultProductionStages.Cabling.code,
    barCode: DefaultProductionStages.Cabling.code,
    description: "Cabling/Trimming (Zero balance) stage description",
  };

  public static readonly ExerciseAndInitialVerificationManual: MenuName = {
    stage:
      DefaultProductionStages.InitialVerificationManual.optionalCommonName ??
      DefaultProductionStages.InitialVerificationManual.stage,
    route: DefaultProductionStages.InitialVerificationManual.code + "Manual",
    barCode: DefaultProductionStages.InitialVerificationManual.code,
    description: "Exercise/InitialVerification Manual",
  };

  public static readonly ExerciseAndInitialVerificationAuto: MenuName = {
    stage:
      DefaultProductionStages.InitialVerificationAuto.optionalCommonName ??
      DefaultProductionStages.InitialVerificationAuto.stage,
    route: DefaultProductionStages.InitialVerificationAuto.code + "Auto",
    barCode: DefaultProductionStages.InitialVerificationAuto.code,
    description: "Exercise/InitialVerification Auto",
  };

  public static readonly AddResistor: MenuName = {
    stage: DefaultProductionStages.AddResistor.stage,
    route: DefaultProductionStages.AddResistor.code,
    barCode: DefaultProductionStages.AddResistor.code,
    description: "Add Resistor stage description",
  };

  public static readonly Sealing: MenuName = {
    stage: DefaultProductionStages.Sealing.stage,
    route: DefaultProductionStages.Sealing.code,
    barCode: DefaultProductionStages.Sealing.code,
    description: "Sealing stage description",
  };

  public static readonly FinalVerificationManual: MenuName = {
    stage:
      DefaultProductionStages.FinalVerificationManual.optionalCommonName ??
      DefaultProductionStages.FinalVerificationManual.stage,

    route: DefaultProductionStages.FinalVerificationManual.code + "Manual",
    barCode: DefaultProductionStages.FinalVerificationManual.code,
    description: "FinalVerification Manual",
  };

  public static readonly FinalVerificationAuto: MenuName = {
    stage:
      DefaultProductionStages.FinalVerificationAuto.optionalCommonName ??
      DefaultProductionStages.FinalVerificationAuto.stage,

    route: DefaultProductionStages.FinalVerificationAuto.code + "Auto",
    barCode: DefaultProductionStages.FinalVerificationAuto.code,
    description: "FinalVerification Auto",
  };

  public static readonly Labelling: MenuName = {
    stage: DefaultProductionStages.Labelling.stage,
    route: DefaultProductionStages.Labelling.code,
    barCode: DefaultProductionStages.Labelling.code,
    description: "Labelling stage description",
  };

  public static readonly Inventory: MenuName = {
    stage: DefaultProductionStages.Inventory.stage,
    route: DefaultProductionStages.Inventory.code,
    barCode: DefaultProductionStages.Inventory.code,
    description: "Inventory stage description",
  };

  public static readonly Shipping: MenuName = {
    stage: DefaultProductionStages.Shipping.stage,
    route: DefaultProductionStages.Shipping.code,
    barCode: DefaultProductionStages.Shipping.code,
    description: "Shipping stage description",
  };

  public static readonly CreateRMA: MenuName = {
    stage: "Create RMA",
    route: "CreateRMA",
    barCode: `CreateRMA`,
    description: "Create RMA",
  };

  public static readonly RecordDefects: MenuName = {
    stage: "Record Defect",
    route: "RecordDefects",
    barCode: `RecordDefects`,
    description: "Record Defect",
  };

  public static readonly AssignSerialNo: MenuName = {
    stage: DefaultProductionStages.AssignSerialNo.stage,
    route: DefaultProductionStages.AssignSerialNo.code,
    barCode: DefaultProductionStages.AssignSerialNo.code,
    description: "Assign SerialNo stage description/Batch",
  };

  public static readonly Tracking: MenuName = {
    stage: "Track / Report",
    route: "Tracking",
    barCode: `Tracking`,
    description: "Tracking",
  };

  public static readonly AddPicture: MenuName = {
    stage: "Add Picture",
    route: "AddPicture",
    barCode: `AddPicture`,
    description: "Add Picture",
  };

  public static readonly Defects: MenuName = {
    stage: "Defects",
    route: "Defects",
    barCode: `Defects`,
    description: "Defects Type Creation",
  };

  public static readonly Advanced: MenuName = {
    stage: "Advanced",
    route: "Advanced",
    barCode: `Advanced`,
    description: "Advanced /Settings",
  };

  public static readonly PrintStageCard: MenuName = {
    stage: "PrintStageCard",
    route: "PrintStageCard",
    description: "Print Stage Card",
  };
  public static readonly ModelVersionReAssignment: MenuName = {
    stage: "ModelVersionReAssignment",
    route: "ModelVersionReAssignment",
    description: "Model Version Reassignment",
  };
  public static readonly NCRList: MenuName = { stage: "NCRList", route: "NCRList", description: "NCR List" };
  public static readonly ChangeStage: MenuName = {
    stage: "ChangeStage",
    route: "ChangeStage",
    description: "Change Stage",
  };
  public static readonly ReferenceLoadCell: MenuName = {
    stage: "ReferenceLoadCell",
    route: "ReferenceLoadCell",
    description: "Reference Load Cell",
  };

  public static readonly dashBoard: MenuName = { stage: "dashBoard", route: "/dashBoard", description: "dashBoard" };
  public static readonly NotFound: MenuName = { stage: "NotFound", route: "/NotFound", description: "NotFound" };
  public static readonly NoAuthPage: MenuName = {
    stage: "NoAuthPage",
    route: "/NoAuthPage",
    description: "NoAuthPage",
  };
  public static readonly LoggedOut: MenuName = { stage: "LoggedOut", route: "/LoggedOut", description: "LoggedOut" };
  public static readonly All: MenuName = { stage: "All", route: "*", description: "All" };
  public static readonly Base: MenuName = { stage: "Base", route: "/", description: "Base" };

  public static readonly AllMenu: MenuName[] = [
    SideBarMenuName.ProductionStages,
    SideBarMenuName.SurfacePreparation,
    SideBarMenuName.Gauging,
    SideBarMenuName.GaugeInspection,
    SideBarMenuName.Wiring,
    SideBarMenuName.Cabling,
    SideBarMenuName.ExerciseAndInitialVerificationManual,
    SideBarMenuName.ExerciseAndInitialVerificationAuto,
    SideBarMenuName.AddResistor,
    SideBarMenuName.Sealing,
    SideBarMenuName.FinalVerificationManual,
    SideBarMenuName.FinalVerificationAuto,
    SideBarMenuName.Labelling,
    SideBarMenuName.Inventory,
    SideBarMenuName.Shipping,
    SideBarMenuName.RecordDefects,
    SideBarMenuName.AssignSerialNo,
    SideBarMenuName.Tracking,
    SideBarMenuName.AddPicture,
    SideBarMenuName.Defects,
    SideBarMenuName.Advanced,
    SideBarMenuName.dashBoard,
    SideBarMenuName.NotFound,
    SideBarMenuName.NoAuthPage,
    SideBarMenuName.LoggedOut,
    SideBarMenuName.All,
    SideBarMenuName.Base,
    SideBarMenuName.PrintStageCard,
    SideBarMenuName.ModelVersionReAssignment,
    SideBarMenuName.NCRList,
    SideBarMenuName.ChangeStage,
    SideBarMenuName.ReferenceLoadCell,
  ];
  public static isBarcodeInStageBarCodes(barcode: string): boolean {
    return SideBarMenuName.AllMenu.some((item) => item.barCode === barcode);
  }
  public static getStageByBarCode(barCode: string): MenuName | undefined {
    return SideBarMenuName.AllMenu.find((item) => item.barCode === barCode);
  }
}
