import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface LoginUserStateSliceProps {
  token: string;
  userName: string;
  email: string;
  //result: ProblemDetails | null;
  lauchedApps: string[];
}
const initialState: LoginUserStateSliceProps = {
  token: "",
  userName: "",
  email : "",
  lauchedApps: [],
};
const LoginUserStateSlice = createSlice({
  name: "LoginUserState",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    // setBarcode: (state, action: PayloadAction<string>) => {
    //     state.barcode = action.payload;
    // },
    setLauchedApps: (state, action: PayloadAction<string>) => {
      state.lauchedApps = [...state.lauchedApps, action.payload];
    },
    setTokenNameBarcode: (
      state,
      action: PayloadAction<{
        token: string;
        userName: string;
        email: string;
      }>
    ) => {
      state.token = action.payload.token;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
   
    },
  },
});

export const { setToken, setUserName, setLauchedApps, setTokenNameBarcode } =
  LoginUserStateSlice.actions;
export default LoginUserStateSlice.reducer;
