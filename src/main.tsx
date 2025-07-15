import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {  ThemeProvider } from "@mui/material";
import theme from "./Components/Common/Theme.tsx";
import { Provider } from "react-redux";
//import { GlobalStyle } from "./Components/Common/createGlobalStyle.ts";
import { store } from "./Redux/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProvider } from '@toolpad/core/AppProvider';

import { SideBarContextProvider, SideBarContextData } from "./Pages/LayOut/SideBar/SideBarContext/SideBarContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>

    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider theme={theme}>
      
        <AppProvider theme={theme}>
        <SideBarContextProvider initialState ={SideBarContextData}>

        <App />
      
        </SideBarContextProvider>
        </AppProvider>
      </ThemeProvider>
      
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Provider>
);
