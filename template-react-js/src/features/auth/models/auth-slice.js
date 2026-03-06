import { createSlice } from "@reduxjs/toolkit";
import AuthStorage from "./auth-storage";

const initialState = {
  user: AuthStorage.getUserStorage(),
  isAuth: !!AuthStorage.getAccessToken(),
  loading: false,
  error: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = undefined;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = undefined;
      state.isAuth = true;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuth = false;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = undefined;
    },
    registerSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = undefined;
      state.isAuth = false;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuth = false;
    },
    logoutSuccess: (state) => {
      AuthStorage.clear();
      state.user = undefined;
      state.loading = false;
      state.error = undefined;
      state.isAuth = false;
    },
  },
});
export const { loginSuccess, loginStart, loginFail , registerFail , registerStart ,registerSuccess , logoutSuccess } = authSlice.actions;
export default authSlice.reducer
