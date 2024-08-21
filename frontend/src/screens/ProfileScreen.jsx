import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addProfile } from "../api_slices/authSlices";
import {
  useAddLikeMutation,
  useDeletePostByIdMutation,
} from "../api_slices/postsApiSlice";
import { useGetProfileByIdQuery } from "../api_slices/profileApiSlice";
import { ToastError, ToastSuccess } from "../component/Toast";
import { BASE_URL } from "../constants";

const ProfileScreen = () => {
  const [like] = useAddLikeMutation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [Delete] = useDeletePostByIdMutation();
  const { data, isLoading, error, refetch } = useGetProfileByIdQuery(id);
  useEffect(() => {
    data && dispatch(addProfile(data.profile));
  }, [data, dispatch]);
  const user = useSelector((state) => state.userCredentials.user);
  const addLike = async (id) => {
    try {
      const response = await like(id).unwrap();
      refetch();
      ToastSuccess(response);
    } catch (error) {
      console.log(error);
      ToastError(error?.data?.message || error?.message);
    }
  };
  const deletePost = async () => {
    try {
      const response = await Delete(id).unwrap();
      refetch();
      ToastSuccess(response);
    } catch (error) {
      console.log(error?.data?.message || error?.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <h1>Loading.........</h1>
      ) : error ? (
        <h3>{error?.data?.message || error.message}</h3>
      ) : data.profile ? (
        <section className="visitProfile">
          <header className="visitProfile__header">
            <ul className="visitProfile__list">
              <li className="visitProfile__list__items visitProfile__profilePic">
                <img
                  src={`${BASE_URL}img/${data.profile.profilePic}`}
                  alt=""
                  className="user__photo__box "
                />
              </li>
              <li className="visitProfile__list__items">
                <h1 className="visitProfile__heading">
                  {data.profile.user.name}
                </h1>
              </li>
              <li className="visitProfile__list__items status">
                {data.profile.user.isvarified
                  ? data.profile.user.isAdmin
                    ? "admin seller"
                    : "Seller"
                  : "user"}
              </li>
              <li className="visitProfile__list__items locations">
                {data.profile.location}
              </li>
              <li className="visitProfile__list__items flex justify-center">
                {data.profile.social && data.profile.social.facebook && (
                  <a
                    href={`https://${data.profile.social.facebook}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                )}{" "}
                {data.profile.social && data.profile.social.linkedIn && (
                  <a
                    href={`https://${data.profile.social.linkedIn}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                )}
                {data.profile.social && data.profile.social.youtube && (
                  <a
                    href={`https:///${data.profile.social.youtube}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                )}
                {data.profile.social && data.profile.social.twitter && (
                  <a
                    href={`https:///${data.profile.social.twitter}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>
                )}
              </li>
            </ul>
          </header>

          <div className="visitProfile__bio">
            <span className="visitProfile__span block">Bio</span>
            {data.profile.bio}
          </div>
          <div className="visitProfile__products">
            <span className="visitProfile__span block">Products</span>
            <ul className="visitProfile__product__List">
              {data.profile.products.map((x, index) => (
                <li key={index} className="visitProfile__product__List__Items">
                  <i className="fa-solid fa-check" aria-hidden="true"></i>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="user__posts">
            <div className="user__heading color-white">User Posts</div>
            {data.posts &&
              data.posts.map((x) => (
                <div className="post__main bg-black" key={x._id}>
                  <div className="user flex-ycenter">
                    <div className="user__photo">
                      <img
                        src={`${BASE_URL}img/${x.profilePic}`}
                        alt=""
                        className="user__photo__box absolute-center"
                      />
                    </div>
                    <div className="user__name">{x.user.name}</div>
                  </div>
                  <div className="post__body">
                    <div className="post__cote">{x.text}</div>
                    <div className="post__date">{x.createdAt.slice(0, 10)}</div>
                    <div className="flex flex_space-evenly">
                      <div class="post__like" onClick={() => addLike(x._id)}>
                        <i
                          class={
                            user && x.likes.includes(user._id)
                              ? `fa-regular fa-heart addLike`
                              : `fa-regular fa-heart`
                          }
                        ></i>
                        {x.likes.length}
                      </div>

                      {user && user._id === x.user._id && (
                        <div
                          class="post__delete"
                          onClick={() => deletePost(x._id)}
                        >
                          <i class="fa-solid fa-trash"></i>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      ) : (
        <h3>NO PROFILE FOUND :[</h3>
      )}
    </>
  );
};

export default ProfileScreen;
