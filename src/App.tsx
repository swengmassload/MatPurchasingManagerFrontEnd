

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { RouterProvider } from 'react-router/dom';
import { router } from './Routes';

import '../src/assets/fonts/Inter-Black.woff2';
import '../src/assets/fonts/Inter-Bold.woff2';
import '../src/assets/fonts/Inter-ExtraBold.woff2';
import '../src/assets/fonts/Inter-Light.woff2';
import '../src/assets/fonts/Inter-Medium.woff2';
import '../src/assets/fonts/Inter-Regular.woff2';
import '../src/assets/fonts/Inter-SemiBold.woff2';
import '../src/assets/fonts/Inter-Thin.woff2';
import '../src/assets/fonts/Inter-ExtraLight.woff2';
import '../src/assets/fonts/Inter-BlackItalic.woff2';
import '../src/assets/fonts/Inter-BoldItalic.woff2';
import '../src/assets/fonts/Inter-ExtraBoldItalic.woff2';
import '../src/assets/fonts/Inter-LightItalic.woff2';
import '../src/assets/fonts/Inter-MediumItalic.woff2';
import '../src/assets/fonts/Inter-SemiBoldItalic.woff2';
import '../src/assets/fonts/Inter-ThinItalic.woff2';
import { Toaster } from 'react-hot-toast';
import { ConfigInitializer } from './Components/Common/ConfigInitializer';

const globalStyles={
  a:{
    color:"unset",
    textdiacoration:"none"
  }
,

}
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
