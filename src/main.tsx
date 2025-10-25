import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {  ThemeProvider } from "@mui/material";
import theme from "./Components/Common/Theme.tsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./Api/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProvider } from '@toolpad/core/AppProvider';
import { SideBarContextProvider, SideBarContextData } from "./Pages/LayOut/SideBar/SideBarContext/SideBarContext.tsx";


// queryClient is imported from ./Api/queryClient
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>

    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
      
        <AppProvider theme={theme}>
          <SideBarContextProvider initialState={SideBarContextData}>

        <App />
      
        </SideBarContextProvider>
        </AppProvider>
      </ThemeProvider>
      
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Provider>
);
