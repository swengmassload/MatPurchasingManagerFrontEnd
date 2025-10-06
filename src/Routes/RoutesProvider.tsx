import NotFound from "../Pages/NotFound/NotFound";
import GeneralLanding from "../Pages/GeneralLanding/GeneralLanding";
import PlayGround from "../Pages/GeneralLanding/PlayGround";
import NoAuthPage from "../Pages/NoAuthPage/NoAuthPage";
import LoggedOut from "../Pages/LoggedOut/LoggedOut";
import ApplicationManagerLayOut from "../Pages/LayOut/ApplicationManagerLayOut";

import { SideBarMenuName } from "../Constants/SideBarMenuNames";
import CreateRMALayOut from "../Pages/RMAStages/CreateRMA/CreateRMALayOut";
import PackageReceivedLayOut from "../Pages/RMAStages/PackageReceived/PackageReceivedLayOut";
import AssessPackageLayOut from "../Pages/RMAStages/AssessPackage/AssessPackageLayOut";
import CloseRMALayOut from "../Pages/RMAStages/CloseRMA/CloseRMALayOut";
import AddSalesOrderLayOut from "../Pages/RMAStages/AddSalesOrder/AddSalesOrderLayOut";
import RepairProductLayOut from "../Pages/RMAStages/RepairProduct/RepairProductLayOut";
import TrackingLayOut from "../Pages/Tracking/TrackingLayOut";

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
        path: SideBarMenuName.CreateRMA.route,
        element: <CreateRMALayOut />,
      },

      {
        path: SideBarMenuName.RECEIVEPACKAGE.route,
        element: <PackageReceivedLayOut />,
      },

      {
        path: SideBarMenuName.ACCESSEDPRODUCT.route,
        element: <AssessPackageLayOut />,
      },
      {
        path: SideBarMenuName.CLOSEDRMA.route,
        element: <CloseRMALayOut />,
      },
      {
        path: SideBarMenuName.REPAIRPRODUCT.route,
        element: <RepairProductLayOut />,
      },
      {
        path: SideBarMenuName.ADDSALESORDER.route,
        element: <AddSalesOrderLayOut />,
      },
      {
        path: SideBarMenuName.TRACKING.route,
        element: <TrackingLayOut />,
      },
    ],
  },
];
