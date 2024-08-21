import { createSlice } from "@reduxjs/toolkit";
const initialState = localStorage.getItem("userCredentials")
  ? JSON.parse(localStorage.getItem("userCredentials"))
  : {
      user: null,
      profile: null,
    };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, action) {
      state.user = action.payload;
      localStorage.setItem("userCredentials", JSON.stringify(state));
    },
    logout(state, action) {
      state.user = null;
      state.profile = null;
      // localStorage.removeItem("userCredentials");
    },
    addProfile(state, action) {
      state.profile = action.payload;
      localStorage.setItem("userCredentials", JSON.stringify(state));
    },
    removeProfile(state, action) {
      state.profile = null;
      localStorage.setItem("userCredentials", JSON.stringify(state));
    },
  },
});
export const { logIn, logout, addProfile, removeProfile } = authSlice.actions;
export default authSlice.reducer;
