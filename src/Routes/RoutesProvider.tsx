import NotFound from "../Pages/NotFound/NotFound";
import GeneralLanding from "../Pages/GeneralLanding/GeneralLanding";
import PlayGround from "../Pages/GeneralLanding/PlayGround";
import NoAuthPage from "../Pages/NoAuthPage/NoAuthPage";
import LoggedOut from "../Pages/LoggedOut/LoggedOut";
import ApplicationManagerLayOut from "../Pages/LayOut/ApplicationManagerLayOut";


import { SideBarMenuName } from "../Constants/SideBarMenuNames";
import CreateRMALayOut from "../Pages/RMAStages/CreateRMA/CreateRMALayOut";
import OAuthCallback from "../Pages/RMAStages/CreateRMA/ConstantContact/OAuthCallback";

export const RoutesProvider = [
  {
    path: SideBarMenuName.Base.route,
    element: <GeneralLanding />,
    errorElement: <NotFound />,
  },

  {
    path: "/oauth/callback" ,
    element: <OAuthCallback />,
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
    ],
  },
];
