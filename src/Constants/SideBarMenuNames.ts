import { PurchasingStages } from "./PurchasingStages";
export const sideBardrawerWidth: number = 256;
export interface MenuName {
  stage: string;
  route: string;
  description: string;
  barCode?: string;
}

export class SideBarMenuName {
  public static readonly KanbanScanned: MenuName = {
    stage: PurchasingStages.KANBANSCANNED.stage,
    route: PurchasingStages.KANBANSCANNED.code,
    barCode: PurchasingStages.KANBANSCANNED.code,
    description: PurchasingStages.KANBANSCANNED.CommonName,
  };

  public static readonly RECEIVE_Material: MenuName = {
    stage: PurchasingStages.MATERIALRECEIVED.stage,
    route: PurchasingStages.MATERIALRECEIVED.code,
    barCode: PurchasingStages.MATERIALRECEIVED.code,
    description: PurchasingStages.MATERIALRECEIVED.CommonName,
  };

  public static readonly TRACKING: MenuName = {
    stage: PurchasingStages.TRACKING.stage,
    route: PurchasingStages.TRACKING.code,
    barCode: PurchasingStages.TRACKING.code,
    description: PurchasingStages.TRACKING.CommonName,
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
    //    SideBarMenuName.ProductionStages,

    SideBarMenuName.KanbanScanned,
    SideBarMenuName.RECEIVE_Material,
    SideBarMenuName.TRACKING,

    SideBarMenuName.dashBoard,
    SideBarMenuName.NotFound,
    SideBarMenuName.NoAuthPage,
    SideBarMenuName.LoggedOut,
    SideBarMenuName.All,
    SideBarMenuName.Base,
  ];
  public static isBarcodeInStageBarCodes(barcode: string): boolean {
    return SideBarMenuName.AllMenu.some((item) => item.barCode === barcode);
  }
  public static getStageByBarCode(barCode: string): MenuName | undefined {
    return SideBarMenuName.AllMenu.find((item) => item.barCode === barCode);
  }
}
// export class SideBarMenuName {
//   public static readonly CreateRMA: MenuName = {
//     stage: DefaultRMAStages.LABELSENT.stage,
//     route: DefaultRMAStages.LABELSENT.code,
//     barCode: DefaultRMAStages.LABELSENT.code,
//     description: DefaultRMAStages.LABELSENT.CommonName,
//   };

//   public static readonly RECEIVEPACKAGE: MenuName = {
//     stage: DefaultRMAStages.PACKAGERECEIVED.stage,
//     route: DefaultRMAStages.PACKAGERECEIVED.code,
//     barCode: DefaultRMAStages.PACKAGERECEIVED.code,
//     description: DefaultRMAStages.PACKAGERECEIVED.CommonName,
//   };

//   public static readonly ACCESSEDPRODUCT: MenuName = {
//     stage: DefaultRMAStages.PRODUCTASSESSED.stage,
//     route: DefaultRMAStages.PRODUCTASSESSED.code,
//     barCode: DefaultRMAStages.PRODUCTASSESSED.code,
//     description: DefaultRMAStages.PRODUCTASSESSED.CommonName,
//   };

//   public static readonly TRACKING: MenuName = {
//     stage: DefaultRMAStages.TRACKING.stage,
//     route: DefaultRMAStages.TRACKING.code,
//     barCode: DefaultRMAStages.TRACKING.code,
//     description: DefaultRMAStages.TRACKING.CommonName,
//   };

//   public static readonly ADDSALESORDER: MenuName = {
//     stage: DefaultRMAStages.SALESORDERADDED.stage,
//     route: DefaultRMAStages.SALESORDERADDED.code,
//     barCode: DefaultRMAStages.SALESORDERADDED.code,
//     description: DefaultRMAStages.SALESORDERADDED.CommonName,
//   };

//   public static readonly REPAIRPRODUCT: MenuName = {
//     stage: DefaultRMAStages.REPAIRINPROGRESS.stage,
//     route: DefaultRMAStages.REPAIRINPROGRESS.code,
//     barCode: DefaultRMAStages.REPAIRINPROGRESS.code,
//     description: DefaultRMAStages.REPAIRINPROGRESS.CommonName,
//   };
//   public static readonly CLOSEDRMA: MenuName = {
//     stage: DefaultRMAStages.RMA_CLOSED.stage,
//     route: DefaultRMAStages.RMA_CLOSED.code,
//     barCode: DefaultRMAStages.RMA_CLOSED.code,
//     description: DefaultRMAStages.RMA_CLOSED.CommonName,
//   };

//   public static readonly dashBoard: MenuName = { stage: "dashBoard", route: "/dashBoard", description: "dashBoard" };
//   public static readonly NotFound: MenuName = { stage: "NotFound", route: "/NotFound", description: "NotFound" };
//   public static readonly NoAuthPage: MenuName = {
//     stage: "NoAuthPage",
//     route: "/NoAuthPage",
//     description: "NoAuthPage",
//   };
//   public static readonly LoggedOut: MenuName = { stage: "LoggedOut", route: "/LoggedOut", description: "LoggedOut" };
//   public static readonly All: MenuName = { stage: "All", route: "*", description: "All" };
//   public static readonly Base: MenuName = { stage: "Base", route: "/", description: "Base" };

//   public static readonly AllMenu: MenuName[] = [
//     //    SideBarMenuName.ProductionStages,

//     SideBarMenuName.CreateRMA,
//     SideBarMenuName.RECEIVEPACKAGE,
//     SideBarMenuName.ACCESSEDPRODUCT,
//     SideBarMenuName.ADDSALESORDER,
//     SideBarMenuName.REPAIRPRODUCT,
//     SideBarMenuName.CLOSEDRMA,
//     SideBarMenuName.dashBoard,
//     SideBarMenuName.NotFound,
//     SideBarMenuName.NoAuthPage,
//     SideBarMenuName.LoggedOut,
//     SideBarMenuName.All,
//     SideBarMenuName.Base,
//   ];
//   public static isBarcodeInStageBarCodes(barcode: string): boolean {
//     return SideBarMenuName.AllMenu.some((item) => item.barCode === barcode);
//   }
//   public static getStageByBarCode(barCode: string): MenuName | undefined {
//     return SideBarMenuName.AllMenu.find((item) => item.barCode === barCode);
//   }
// }
