import { DefaultRMAStages } from "./RMAStages";
export const sideBardrawerWidth: number = 256;
export interface MenuName {
  stage: string;
  route: string;
  description: string;
  barCode?: string;
}

export class SideBarMenuName {
  public static readonly CreateRMA: MenuName = {
    stage: DefaultRMAStages.LABELSENT.stage,
    route: DefaultRMAStages.LABELSENT.code,
    barCode: DefaultRMAStages.LABELSENT.code,
    description: DefaultRMAStages.LABELSENT.CommonName,
  };

  public static readonly RECEIVEPACKAGE: MenuName = {
    stage: DefaultRMAStages.PACKAGERECEIVED.stage,
    route: DefaultRMAStages.PACKAGERECEIVED.code,
    barCode: DefaultRMAStages.PACKAGERECEIVED.code,
    description: DefaultRMAStages.PACKAGERECEIVED.CommonName,
  };

  public static readonly ACCESSEDPRODUCT: MenuName = {
    stage: DefaultRMAStages.PRODUCTASSESSED.stage,
    route: DefaultRMAStages.PRODUCTASSESSED.code,
    barCode: DefaultRMAStages.PRODUCTASSESSED.code,
    description: DefaultRMAStages.PRODUCTASSESSED.CommonName,
  };

  public static readonly ADDSALESORDER: MenuName = {
    stage: DefaultRMAStages.SALESORDERADDED.stage,
    route: DefaultRMAStages.SALESORDERADDED.code,
    barCode: DefaultRMAStages.SALESORDERADDED.code,
    description: DefaultRMAStages.SALESORDERADDED.CommonName,
  };

  public static readonly REPAIRPRODUCT: MenuName = {
    stage: DefaultRMAStages.REPAIRINPROGRESS.stage,
    route: DefaultRMAStages.REPAIRINPROGRESS.code,
    barCode: DefaultRMAStages.REPAIRINPROGRESS.code,
    description: DefaultRMAStages.REPAIRINPROGRESS.CommonName,
  };
  public static readonly CLOSEDRMA: MenuName = {
    stage: DefaultRMAStages.RMA_CLOSED.stage,
    route: DefaultRMAStages.RMA_CLOSED.code,
    barCode: DefaultRMAStages.RMA_CLOSED.code,
    description: DefaultRMAStages.RMA_CLOSED.CommonName,
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

    SideBarMenuName.CreateRMA,
    SideBarMenuName.RECEIVEPACKAGE,
    SideBarMenuName.ACCESSEDPRODUCT,
    SideBarMenuName.ADDSALESORDER,
    SideBarMenuName.REPAIRPRODUCT,
    SideBarMenuName.CLOSEDRMA,
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
