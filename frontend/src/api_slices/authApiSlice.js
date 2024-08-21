import { BASE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    autoLogIn: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}auth/autoLogin`,
        method: "GET",
        credentials: "include",
      }),
    }),
    sendCode: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}auth/forgetPass`,
        method: "POST",
        body: data,
      }),
    }),
    chengePass: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}auth/changePass`,
        method: "POST",
        body: data,
      }),
    }),
    varifyUser: builder.query({
      query: (data) => ({
        url: `${BASE_URL}auth/varify`,
        method: "POST",
        body: data,
      }),
    }),
    checkUser: builder.query({
      query: (data) => ({
        url: `${BASE_URL}auth/checkUser`,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}auth/userEdit`,
        method: "POST",
        body: data,
      }),
    }),
    getAllUser: builder.query({
      query: () => `${BASE_URL}auth`,
      keepUnusedDataFor: 5,
    }),
    deleteUserById: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}auth/delete/${id}`,
        method: "DELETE",
      }),
    }),
    addAdminUser: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}auth/admin/${id}`,
        method: "POST",
      }),
    }),
    logInApi: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}auth/logIn`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    logoutApi: builder.mutation({
      query: () => ({
        url: `${BASE_URL}auth/logout`,
        method: "GET",
      }),
    }),
    registerApi: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}auth/register`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useChengePassMutation,
  useCheckUserQuery,
  useSendCodeMutation,
  useVarifyUserQuery,
  useUpdateUserMutation,
  useAddAdminUserMutation,
  useDeleteUserByIdMutation,
  useGetAllUserQuery,
  useAutoLogInMutation,
  useLogInApiMutation,
  useRegisterApiMutation,
  useLogoutApiMutation,
} = productApiSlice;
