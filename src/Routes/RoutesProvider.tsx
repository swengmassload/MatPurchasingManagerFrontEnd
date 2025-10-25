import NotFound from "../Pages/NotFound/NotFound";
import GeneralLanding from "../Pages/GeneralLanding/GeneralLanding";
import PlayGround from "../Pages/GeneralLanding/PlayGround";
import NoAuthPage from "../Pages/NoAuthPage/NoAuthPage";
import LoggedOut from "../Pages/LoggedOut/LoggedOut";
import ApplicationManagerLayOut from "../Pages/LayOut/ApplicationManagerLayOut";
import { SideBarMenuName } from "../Constants/SideBarMenuNames";
import KanbanBoardLayout from "../Pages/PurchasingStages/KanbanBoard/KanbanBoardLayout";
import PartsLayOut from "../Pages/Parts/PartsLayOut";

//import TrackingLayOut from "../Pages/Tracking/TrackingLayOut";

export const RoutesProvider = [
  {
    path: SideBarMenuName.Base.route,
    element: <GeneralLanding />,
    errorElement: <NotFound />,
  },

  {
    path: SideBarMenuName.NoAuthPage.route,
    element: <NoAuthPage />,
  },
  {
    path: SideBarMenuName.LoggedOut.route,
    element: <LoggedOut />,
  },

  {
    path: SideBarMenuName.Base.route,
    element: <NotFound />,
  },
  {
    path: SideBarMenuName.NotFound.route,
    element: <NotFound />,
  },

  {
    path: SideBarMenuName.dashBoard.route,
    element: <ApplicationManagerLayOut />,

    children: [
      {
        index: true,
        element: <PlayGround />,
      },
      {
        path: SideBarMenuName.KanbanScanned.route,
        element: <KanbanBoardLayout />,
      },
      {
        path: SideBarMenuName.Parts.route,
        element: <PartsLayOut />,
      },

      // {
      //   path: SideBarMenuName.RECEIVEPACKAGE.route,
      //   element: <PackageReceivedLayOut />,
      // },

      // {
      //   path: SideBarMenuName.ACCESSEDPRODUCT.route,
      //   element: <AssessPackageLayOut />,
      // },
      // {
      //   path: SideBarMenuName.CLOSEDRMA.route,
      //   element: <CloseRMALayOut />,
      // },
      // {
      //   path: SideBarMenuName.REPAIRPRODUCT.route,
      //   element: <RepairProductLayOut />,
      // },
      // {
      //   path: SideBarMenuName.ADDSALESORDER.route,
      //   element: <AddSalesOrderLayOut />,
      // },
      {
        path: SideBarMenuName.TRACKING.route,
        element: <>"TRACKING"</>,
      },
    ],
  },
];
