import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api_slices/apiSlice";
import authSlices from "./api_slices/authSlices";
import cartSlice from "./api_slices/cartSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    userCredentials: authSlices,
    cart: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
export default store;
