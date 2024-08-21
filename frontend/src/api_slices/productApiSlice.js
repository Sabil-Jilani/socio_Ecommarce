import { BASE_URL } from "../constants";

import { apiSlice } from "./apiSlice";
export const productApiSlice = apiSlice.injectEndpoints({
  TagTypes: ["products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `${BASE_URL}products`,
        providesTags: ["products"],
      }),
      keepUnusedDataFor: 5,
    }),
    getProductById: builder.query({
      query: (id) => {
        return {
          url: `${BASE_URL}products/${id}`,
        };
      },
      keepUnusedDataFor: 5,
    }),
    addReview: builder.mutation({
      query: ({ id, formData }) => {
        return {
          url: `${BASE_URL}products/addReview/${id}`,
          body: formData,
          method: "POST",
        };
      },
      keepUnusedDataFor: 5,
    }),
    uploadImage: builder.mutation({
      query: (data) => {
        return {
          url: `${BASE_URL}products/upload`,
          body: data,
          method: "POST",
        };
      },
      keepUnusedDataFor: 5,
    }),
    deleteReview: builder.mutation({
      query: (id) => {
        return {
          url: `${BASE_URL}products/deleteReview/${id}`,

          method: "DELETE",
        };
      },
      keepUnusedDataFor: 5,
    }),
    deleteProductById: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}products/deleteProduct/${id}`,
        method: "DELETE",
      }),
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}products/createProduct`,
        method: "POST",
        body: data,
      }),
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `${BASE_URL}products/updateProduct/${product.id}`,
        method: "POST",
        body: product,
      }),
    }),
  }),
});
export const {
  useUploadImageMutation,
  useDeleteReviewMutation,
  useUpdateProductMutation,
  useDeleteProductByIdMutation,
  useCreateProductMutation,
  useGetProductsQuery,
  useAddReviewMutation,
  useGetProductByIdQuery,
} = productApiSlice;
