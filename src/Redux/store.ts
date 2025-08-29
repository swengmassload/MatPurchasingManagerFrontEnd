import { configureStore } from "@reduxjs/toolkit";
import LoginUserReducer from "./State/LoginUserSlice";

// Middleware to log all Redux actions and state changes
// const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
//   console.group(`🔄 Redux Action: ${action.type}`);
//   console.log("📤 Dispatching:", action);
//   console.log("📋 State before:", store.getState());

//   const result = next(action);

//   console.log("📋 State after:", store.getState());
//   console.groupEnd();

//   return result;
// };

export const store = configureStore({
  reducer: {
 
    loginUser: LoginUserReducer,

  },
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
