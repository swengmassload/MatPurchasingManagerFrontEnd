import assets from "../../../assets";

import { SideBarMenuName } from "../../../Constants/SideBarMenuNames";

export interface SideBarItemProps {
  sideBarLink?: string;
  sidebarIconUrl: string;
  sideBarText: string;
  iconClosed?: any;
  iconOpened?: any;
  level: number;
  menuNumber: number;
  subitem?: SideBarItemProps[];
}
export const SideBarContent: SideBarItemProps[] = [


    {
    sideBarText: SideBarMenuName.ScanKanbanCard.description,
    sidebarIconUrl: assets.icons.defects,
    sideBarLink: SideBarMenuName.ScanKanbanCard.route,
    level: 0,
    menuNumber: 1,
  },
  {
    sideBarText: SideBarMenuName.ProductionManagerApproval.description,
    sidebarIconUrl: assets.icons.defects,
    sideBarLink: SideBarMenuName.ProductionManagerApproval.route,
    level: 0,
    menuNumber: 2,  
  }
,
{
    sideBarText: SideBarMenuName.AddPurchaseOrder.description,
    sidebarIconUrl: assets.icons.defects,
    sideBarLink: SideBarMenuName.AddPurchaseOrder.route,
    level: 0,
    menuNumber: 3,
  },

  {
    sideBarText: SideBarMenuName.RECEIVE_Material.description,
    sidebarIconUrl: assets.icons.defects,
    sideBarLink: SideBarMenuName.RECEIVE_Material.route,
    level: 0,
    menuNumber: 2,
  },
  {
    sideBarText: SideBarMenuName.Parts.description,
    sidebarIconUrl: assets.icons.defects,
    sideBarLink: SideBarMenuName.Parts.route,
    level: 0,
    menuNumber: 3,
  },  
]; //as SideBarItemProps[];
