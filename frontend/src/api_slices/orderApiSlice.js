import { BASE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allOrders: builder.query({
      query: () => `${BASE_URL}order`,
    }),
    placeOrder: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}order`,
        method: "POST",
        body: data,
      }),
    }),
    payment: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}order/pay/${id}`,
        method: "GET",
      }),
    }),
    findOrderById: builder.query({
      query: (data) => ({
        url: `${BASE_URL}order/${data}`,
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}order/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    updatePayment: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}extraOrder/payed/${id}`,
        method: "POST",
      }),
    }),
    orderDelivered: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}extraOrder/delivered/${id}`,
        method: "POST",
        credentials: `include`,
      }),
    }),
    getUserOrders: builder.query({
      query: () => ({
        url: `${BASE_URL}extraOrder`,

        credentials: `include`,
      }),
    }),
  }),
});

export const {
  useGetUserOrdersQuery,
  useUpdatePaymentMutation,
  useOrderDeliveredMutation,
  useDeleteOrderMutation,
  useAllOrdersQuery,
  usePlaceOrderMutation,
  useFindOrderByIdQuery,
  usePaymentMutation,
} = productApiSlice;
