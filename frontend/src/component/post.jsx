import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useAddCommentMutation,
  useAddLikeMutation,
  useDeleteCommentMutation,
  useDeletePostByIdMutation,
} from "../api_slices/postsApiSlice";
import { BASE_URL } from "../constants";
import { ToastError, ToastSuccess } from "./Toast";

const Post = ({ x, refetch }) => {
  const user = useSelector((state) => state.userCredentials.user);
  const [openwindow, setOpenwindow] = useState(false);
  const [comment, setComment] = useState({ text: "" });
  const [like] = useAddLikeMutation();
  const [Delete] = useDeletePostByIdMutation();
  const [deleteCommentAction] = useDeleteCommentMutation();
  const [addComment] = useAddCommentMutation();

  const addLike = async () => {
    try {
      const response = await like(x._id).unwrap();
      refetch();
      ToastSuccess(response);
    } catch (error) {
      console.log(error);
      ToastError(error?.data?.message || error?.message);
    }
  };
  const deletePost = async () => {
    try {
      const response = await Delete(x._id).unwrap();
      refetch();
      ToastSuccess(response);
    } catch (error) {
      console.log(error?.data?.message || error?.message);
    }
  };

  const postComment = async (e) => {
    try {
      e.preventDefault();
      const response = await addComment({
        id: x._id,
        comment: comment,
      }).unwrap();

      ToastSuccess(response);
      setComment({ text: "" });
      refetch();
    } catch (error) {
      console.log(error?.data?.meaage || error?.message);
      ToastError(error?.data?.meaage || error?.message);
    }
  };
  const deleteComment = async (e) => {
    try {
      const response = await deleteCommentAction(e).unwrap();
      ToastSuccess(response);
      refetch();
    } catch (error) {
      console.log(error?.data?.message || error?.message);
      ToastError(error?.data?.message || error?.message);
    }
  };
  return (
    <div key={x._id} class="post__main">
      <div class="user flex-ycenter">
        <div class="user__photo">
          <img
            src={`${BASE_URL}img/${x.profilePic}`}
            alt={x.user.name}
            class="user__photo__box absolute-center"
          />
        </div>
        <div class="user__name">{x.user.name}</div>
      </div>
      <div class="post__body">
        <div class="post__cote">{x.text}</div>
        <div class="post__date">{x.updatedAt.slice(0, 10)}</div>
        <div class="flex flex_space-evenly">
          <div class="post__like" onClick={addLike}>
            <i
              class={
                user && x.likes.includes(user._id)
                  ? `fa-regular fa-heart addLike`
                  : `fa-regular fa-heart`
              }
            ></i>
            {x.likes.length}
          </div>
          <div class="post__comments">
            <i
              class="fa-solid fa-comment-dots"
              onClick={() => setOpenwindow(!openwindow)}
            ></i>
            {x.comments.length}
          </div>
          {user && user._id === x.user._id && (
            <div class="post__delete" onClick={deletePost}>
              <i class="fa-solid fa-trash"></i>
            </div>
          )}
        </div>
        {openwindow && (
          <section class="comment">
            {user ? (
              <form class="form m-yb" onSubmit={postComment}>
                <textarea
                  onChange={(e) => setComment({ text: e.target.value })}
                  type="text"
                  row="4"
                  cols="15"
                  name="text"
                  value={comment.text}
                  placeholder="atleast 5 letters"
                  minLength="5"
                  class="form__textarea"
                ></textarea>
                <button
                  type="submit"
                  class="btn-1"
                  disabled={!comment.length > 5}
                >
                  Post
                </button>
              </form>
            ) : (
              <h3 class="danger pad">please Log In to comment</h3>
            )}
            {x.comments.length > 0 && (
              <div class="comment__main">
                {x.comments.map((y) => (
                  <div class="comment__box" key={y._id}>
                    {user && user._id === y.user._id && (
                      <i
                        class="fa-solid fa-circle-xmark"
                        onClick={() =>
                          deleteComment({
                            commentId: y._id,
                            postId: x._id,
                          })
                        }
                      ></i>
                    )}

                    <div class="comment__user">
                      <div class="comment__user__photo">
                        <img
                          src={`${BASE_URL}img/${y.profilePic}`}
                          alt=""
                          class="comment__user__photo--box"
                        />
                      </div>
                      <div class="comment__user__name">{y.user.name}</div>
                    </div>
                    <div class="comment__body">
                      <div class="comment__cote">{y.text}</div>
                      <div class="comment__date">
                        {moment(y.date).format("DD-MMM-YYYY")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default Post;
