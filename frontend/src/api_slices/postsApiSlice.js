import { BASE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: `${BASE_URL}posts`,
      }),
    }),
    upload: builder.mutation({
      query: (data) => {
        return {
          url: `${BASE_URL}posts`,
          body: data,
          method: "POST",
        };
      },
      keepUnusedDataFor: 5,
    }),
    addLike: builder.mutation({
      query: (id) => {
        return {
          url: `${BASE_URL}posts/like/${id}`,

          method: "GET",
        };
      },
      keepUnusedDataFor: 5,
    }),
    deletePostById: builder.mutation({
      query: (id) => {
        return {
          url: `${BASE_URL}posts/delete/${id}`,

          method: "GET",
        };
      },
      keepUnusedDataFor: 5,
    }),
    addComment: builder.mutation({
      query: ({ id, comment }) => {
        return {
          url: `${BASE_URL}posts/comment/${id}`,
          body: comment,
          method: "POST",
        };
      },
      keepUnusedDataFor: 5,
    }),
    deleteComment: builder.mutation({
      query: (data) => {
        return {
          url: `${BASE_URL}posts/delete/comment`,
          body: data,
          method: "POST",
        };
      },
      keepUnusedDataFor: 5,
    }),
  }),
});
export const {
  useGetPostsQuery,
  useUploadMutation,
  useAddLikeMutation,
  useDeletePostByIdMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
} = postApiSlice;
