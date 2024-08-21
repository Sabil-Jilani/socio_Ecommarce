import { createSlice } from "@reduxjs/toolkit";
import { TAX, double, shippingPrice } from "../constants";
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      shippingAddress: {
        city: "",
        address: "",
        postalCode: "",
        country: "",
      },
      method: "bank",
      price: 0.0,
      shippingPrice: 0.0,
      taxPrice: 0.0,
      totalPrice: 0.0,
    };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart(state, action) {
      state.cartItems = state.cartItems.filter(
        (e) => e._id !== action.payload._id
      );

      state.cartItems = [...state.cartItems, action.payload];
      state.price = double(
        state.cartItems.reduce(
          (acc, current) => acc + current.price * current.quantity,
          0
        )
      );

      state.shippingPrice = state.price > 10 ? shippingPrice : 0;
      state.taxPrice = double(state.price * TAX);
      state.totalPrice = double(
        Number(state.price) +
          Number(state.taxPrice) +
          Number(state.shippingPrice)
      );
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart(state, action) {
      state.cartItems = [];
      state.method = "bank";
      state.price = 0.0;
      state.shippingPrice = 0.0;
      state.taxPrice = 0.0;
      state.totalPrice = 0.0;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    deleteproductById(state, action) {
      state.cartItems = state.cartItems.filter((e) => e._id !== action.payload);
      state.price = double(
        state.cartItems.reduce(
          (acc, current) => acc + current.price * current.quantity,
          0
        )
      );

      state.shippingPrice = state.price > 10 ? shippingPrice : 0;
      state.taxPrice = double(state.price * TAX);
      state.totalPrice = double(
        Number(state.price) +
          Number(state.taxPrice) +
          Number(state.shippingPrice)
      );
      localStorage.setItem("cart", JSON.stringify(state));
    },
    addMethod(state, action) {
      state.method = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    addShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});
export const {
  addTocart,
  clearCart,
  deleteproductById,
  addMethod,
  addShippingAddress,
} = cartSlice.actions;
export default cartSlice;
