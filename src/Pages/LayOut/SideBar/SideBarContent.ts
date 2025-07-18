import assets from "../../../assets";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
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
  // {
  //   sideBarText: SideBarMenuName.ProductionStages.stage,
  //   sidebarIconUrl: assets.icons.productionstages,
  //   iconClosed: KeyboardArrowDownIcon,
  //   iconOpened: KeyboardArrowUpIcon,
  //   menuNumber: 1,
  //   level: 9,
  //   subitem: [

    
  //   ],
  // },


    {
    sideBarText: SideBarMenuName.CreateRMA.description,
    sidebarIconUrl: assets.icons.defects,
    sideBarLink: SideBarMenuName.CreateRMA.route,
    level: 0,
    menuNumber: 1,
  },


  {
    sideBarText: SideBarMenuName.RECEIVEPACKAGE.description,
    sidebarIconUrl: assets.icons.defects,
    sideBarLink: SideBarMenuName.RECEIVEPACKAGE.route,
    level: 0,
    menuNumber: 2,
  },
  {
    sideBarText: SideBarMenuName.ACCESSEDPRODUCT.description,
    sidebarIconUrl: assets.icons.defects,
    sideBarLink: SideBarMenuName.ACCESSEDPRODUCT.route,
    level: 0,
    menuNumber: 3,
  },
  {
    sideBarText: SideBarMenuName.ADDSALESORDER.description,
    sidebarIconUrl: assets.icons.defects,
    sideBarLink: SideBarMenuName.ADDSALESORDER.route,
    level: 0,
    menuNumber: 4,
  },
  {
    sideBarText: SideBarMenuName.REPAIRPRODUCT.description,
    sidebarIconUrl: assets.icons.defects,
    sideBarLink: SideBarMenuName.REPAIRPRODUCT.route,
    level: 0,
    menuNumber: 5,
  },
  {
    sideBarText: SideBarMenuName.CLOSEDRMA.description,
    sidebarIconUrl: assets.icons.defects,
    sideBarLink: SideBarMenuName.CLOSEDRMA.route,
    level: 0,
    menuNumber: 6,
  },
]; //as SideBarItemProps[];
