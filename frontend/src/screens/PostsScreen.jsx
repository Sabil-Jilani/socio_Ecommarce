import React, { useState } from "react";
import {
  useGetPostsQuery,
  useUploadMutation,
} from "../api_slices/postsApiSlice";
import { ToastError, ToastSuccess } from "../component/Toast";
import Post from "../component/post";

const PostsScreen = () => {
  const { data, isLoading, error, refetch } = useGetPostsQuery();

  const [upload] = useUploadMutation();
  const [text, setText] = useState({ text: "" });
  const onchange = (e) => {
    setText({ [e.target.name]: e.target.value });
  };
  const onsubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await upload(text).unwrap();
      setText({ text: "" });
      ToastSuccess(response.message);
      refetch();
    } catch (error) {
      ToastError(error?.data?.message || error?.message);
      console.log(error);
    }
  };
  return (
    <section class="post__container">
      <h2 class="post__heading">Posts</h2>
      <p class="post__greating">welcom to the community</p>
      <div class="say__something">say something....</div>
      <form class="post__formm m-yb" onSubmit={onsubmit}>
        <textarea
          onChange={onchange}
          placeholder="write more than 5 letter to post"
          type="text"
          row="4"
          cols="15"
          name="text"
          value={text.text}
          class="form__textarea"
        ></textarea>
        <button
          disabled={!(text.text.length > 5)}
          type="submit"
          class="btn-1"
          onSubmit={onsubmit}
        >
          Post
        </button>
      </form>
      {isLoading ? (
        <h1>Loading.......</h1>
      ) : error ? (
        <h3>{error?.data?.message || error?.message}</h3>
      ) : (
        data.map((x) => <Post key={x._id} x={x} refetch={refetch} />)
      )}
    </section>
  );
};

export default PostsScreen;
