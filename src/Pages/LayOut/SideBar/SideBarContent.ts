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
  {
    sideBarText: SideBarMenuName.ProductionStages.stage,
    sidebarIconUrl: assets.icons.productionstages,
    iconClosed: KeyboardArrowDownIcon,
    iconOpened: KeyboardArrowUpIcon,
    menuNumber: 1,
    level: 9,
    subitem: [
      {
        sideBarText: SideBarMenuName.SurfacePreparation.stage,
        sidebarIconUrl: assets.icons.process,
        sideBarLink: SideBarMenuName.SurfacePreparation.route,
        level: 1,
        menuNumber: 2,
      },
      {
        sideBarText: SideBarMenuName.Gauging.stage,
        sidebarIconUrl: assets.icons.process,
        sideBarLink: SideBarMenuName.Gauging.route,
        level: 1,
        menuNumber: 3,
      },
      // {
      //   sideBarText: SideBarMenuName.GaugeInspection.stage,
      //   sidebarIconUrl: assets.icons.process,
      //   sideBarLink: SideBarMenuName.GaugeInspection.route,
      //   level: 1,
      //   menuNumber: 4,
      // },
      // {
      //   sideBarText: SideBarMenuName.Wiring.stage,
      //   sidebarIconUrl: assets.icons.process,
      //   sideBarLink: SideBarMenuName.Wiring.route,
      //   level: 1,
      //   menuNumber: 5,
      // },
      // {
      //   sideBarText: SideBarMenuName.Cabling.stage,
      //   sidebarIconUrl: assets.icons.process,
      //   sideBarLink: SideBarMenuName.Cabling.route,
      //   level: 1,
      //   menuNumber: 6,
      // },

      // {
      //   sideBarText: SideBarMenuName.ExerciseAndInitialVerificationManual.stage,
      //   sidebarIconUrl: assets.icons.process,
      //   sideBarLink: SideBarMenuName.ExerciseAndInitialVerificationManual.route,
      //   level: 1,
      //   menuNumber: 7,
      // },
      // {
      //   sideBarText: SideBarMenuName.AddResistor.stage,
      //   sidebarIconUrl: assets.icons.process,
      //   sideBarLink: SideBarMenuName.AddResistor.route,
      //   level: 1,
      //   menuNumber: 8,
      // },
      // {
      //   sideBarText: SideBarMenuName.Sealing.stage,
      //   sidebarIconUrl: assets.icons.process,
      //   sideBarLink: SideBarMenuName.Sealing.route,
      //   level: 1,
      //   menuNumber: 9,
      // },
      // {
      //   sideBarText: SideBarMenuName.FinalVerificationManual.stage,
      //   sidebarIconUrl: assets.icons.process,
      //   sideBarLink: SideBarMenuName.FinalVerificationManual.route,
      //   level: 1,
      //   menuNumber: 10,
      // },
      // {
      //   sideBarText: SideBarMenuName.Labelling.stage,
      //   sidebarIconUrl: assets.icons.process,
      //   sideBarLink: SideBarMenuName.Labelling.route,
      //   level: 1,
      //   menuNumber: 11,
      // },
      // {
      //   sideBarText: SideBarMenuName.Inventory.stage,
      //   sidebarIconUrl: assets.icons.process,
      //   sideBarLink: SideBarMenuName.Inventory.route,
      //   level: 1,
      //   menuNumber: 12,
      // },

      // {
      //   sideBarText: SideBarMenuName.Shipping.stage,
      //   sidebarIconUrl: assets.icons.process,
      //   sideBarLink: SideBarMenuName.Shipping.route,
      //   level: 1,
      //   menuNumber: 13,
      // },
      // {
      //   sideBarText: SideBarMenuName.RecordDefects.stage,
      //   sidebarIconUrl: assets.icons.process,
      //   sideBarLink: SideBarMenuName.RecordDefects.route,
      //   level: 1,
      //   menuNumber: 14,
      // },
    ],
  },
  // {
  //   sideBarText: SideBarMenuName.AssignSerialNo.stage,
  //   sidebarIconUrl: assets.icons.batchprocessing,
  //   sideBarLink: SideBarMenuName.AssignSerialNo.route,
  //   level: 0,
  //   menuNumber: 15,
  // },
  // {
  //   sideBarText: SideBarMenuName.Tracking.stage,
  //   sidebarIconUrl: assets.icons.track,
  //   sideBarLink: SideBarMenuName.Tracking.route,
  //   level: 0,
  //   menuNumber: 16,
  // },

  // {
  //   sideBarText: SideBarMenuName.AddPicture.stage,
  //   sidebarIconUrl: assets.icons.addpicture,
  //   //sideBarLink: SideBarMenuName.AddPicture.route,
  //    sideBarLink:"",
  //   level: 0,
  //   menuNumber: 17,
  // },

  {
    sideBarText: SideBarMenuName.Defects.stage,
    sidebarIconUrl: assets.icons.defects,
    sideBarLink: SideBarMenuName.Defects.route,
    level: 0,
    menuNumber: 18,
  },
    {
    sideBarText: SideBarMenuName.CreateRMA.stage,
    sidebarIconUrl: assets.icons.defects,
    sideBarLink: SideBarMenuName.CreateRMA.route,
    level: 0,
    menuNumber: 18,
  },
  // {
  //   sideBarText: SideBarMenuName.Advanced.stage,
  //   sidebarIconUrl: assets.icons.advance,
  //   //sideBarLink: SideBarMenuName.Advanced.route,
  //   iconClosed: KeyboardArrowDownIcon,
  //   iconOpened: KeyboardArrowUpIcon,
  //   level: 0,
  //   menuNumber: 19,
  //   subitem: [
  //     {
  //       sideBarText: SideBarMenuName.PrintStageCard.description,
  //       sidebarIconUrl: assets.icons.process,
  //       sideBarLink: SideBarMenuName.PrintStageCard.route,
  //       level: 1,
  //       menuNumber: 20,
  //     },
  //     {
  //       sideBarText: SideBarMenuName.ModelVersionReAssignment.description,
  //       sidebarIconUrl: assets.icons.process,
  //       sideBarLink: SideBarMenuName.ModelVersionReAssignment.route,
  //       level: 1,
  //       menuNumber: 21,
  //     },
  //     {
  //       sideBarText: SideBarMenuName.NCRList.stage,
  //       sidebarIconUrl: assets.icons.process,
  //       sideBarLink: SideBarMenuName.NCRList.route,
  //       level: 1,
  //       menuNumber: 22,
  //     },
  //     {
  //       sideBarText: SideBarMenuName.ChangeStage.description,
  //       sidebarIconUrl: assets.icons.process,
  //       sideBarLink: SideBarMenuName.ChangeStage.route,
  //       level: 1,
  //       menuNumber: 23,
  //     },
  //     {
  //       sideBarText: SideBarMenuName.ReferenceLoadCell.description,
  //       sidebarIconUrl: assets.icons.process,
  //       sideBarLink: SideBarMenuName.ReferenceLoadCell.route,
  //       level: 1,
  //       menuNumber: 24,
  //     },
  //   ],
  // },
]; //as SideBarItemProps[];
