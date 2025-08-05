import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { RouterProvider } from "react-router/dom";
import { router } from "./Routes";

import "../src/assets/fonts/Inter-Bold.woff2";
import "../src/assets/fonts/Inter-ExtraBold.woff2";
import "../src/assets/fonts/Inter-Medium.woff2";
import "../src/assets/fonts/Inter-Regular.woff2";
import "../src/assets/fonts/Inter-SemiBold.woff2";
import { Toaster } from "react-hot-toast";
import { ConfigInitializer } from "./Components/Common/ConfigInitializer";

const globalStyles = {
  a: {
    color: "unset",
    textdiacoration: "none",
  },
};
function App() {
  return (
    <ConfigInitializer>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <Toaster />
      <RouterProvider router={router} />
    </ConfigInitializer>
  );
}

export default App;
