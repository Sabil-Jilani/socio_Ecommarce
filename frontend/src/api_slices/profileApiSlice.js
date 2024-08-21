import { BASE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfiles: builder.query({
      query: () => ({
        url: `${BASE_URL}profile`,
      }),
    }),
    getProfileById: builder.query({
      query: (id) => ({
        url: `${BASE_URL}profile/${id}`,
      }),
    }),
    editOrCreate: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}profile/edit`,
        method: "POST",
        body: data,
      }),
    }),
    deleteProfileById: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}profile/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});
export const {
  useGetProfilesQuery,
  useGetProfileByIdQuery,
  useEditOrCreateMutation,
  useDeleteProfileByIdMutation,
} = productApiSlice;
