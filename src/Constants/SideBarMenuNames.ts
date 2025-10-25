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
  public static readonly Parts: MenuName = {
    stage: PurchasingStages.Parts.stage,
    route: PurchasingStages.Parts.code,
    barCode: PurchasingStages.Parts.code,
    description: PurchasingStages.Parts.CommonName,
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

