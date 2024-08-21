import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useUpdateUserMutation } from "../../api_slices/authApiSlice";
import { addProfile, logIn } from "../../api_slices/authSlices";
import { useGetUserOrdersQuery } from "../../api_slices/orderApiSlice";
import {
  useAddLikeMutation,
  useDeletePostByIdMutation,
} from "../../api_slices/postsApiSlice";
import { useUploadImageMutation } from "../../api_slices/productApiSlice";
import {
  useEditOrCreateMutation,
  useGetProfileByIdQuery,
} from "../../api_slices/profileApiSlice";
import { ToastError, ToastSuccess } from "../../component/Toast";
import { BASE_URL } from "../../constants";
const ProfileScreen = () => {
  const {
    data: orders,
    isLoading: orderLoading,
    error,
  } = useGetUserOrdersQuery();
  const [sendImage] = useUploadImageMutation();
  const [update] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const [like] = useAddLikeMutation();
  const [Delete] = useDeletePostByIdMutation();
  const [createOrUpdate] = useEditOrCreateMutation();
  const { user, profile } = useSelector((state) => state.userCredentials);
  const { data, isLoading, refetch } = useGetProfileByIdQuery(user._id);

  useEffect(() => {
    data && dispatch(addProfile(data.profile));
  }, [dispatch, data]);
  useEffect(() => {
    refetch();
  }, []);
  const [userForm, setUserForm] = useState({
    name: "",
    username: "",
    newPassword: "",
    oldPassword: "",
    confirmPassword: "",
  });
  const [profileForm, setProfileForm] = useState({
    id: "",
    location: "",
    profilePic: "",
    products: "",
    website: "",
    bio: "",
    facebook: "",
    linkedIn: "",
    youtube: "",
    instagram: "",
  });
  useEffect(() => {
    if (user) setUserForm({ name: user.name, username: user.username });

    if (profile)
      setProfileForm({
        profilePic: profile.profilePic,
        user: profile.user._id,
        location: profile.location,
        products: profile.products,
        website: profile.website || "",
        bio: profile.bio,
        facebook:
          profile.social && profile.social.facebook
            ? profile.social.facebook
            : "",
        linkedIn:
          profile.social && profile.social.linkedIn
            ? profile.social.linkedIn
            : "",
        youtube:
          profile.social && profile.social.youtube
            ? profile.social.youtube
            : "",
        instagram:
          profile.social && profile.social.instagram
            ? profile.social.instagram
            : "",
      });
  }, [user, profile]);

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

  const deletePost = async (id) => {
    try {
      const response = await Delete(id).unwrap();
      refetch();
      ToastSuccess(response);
    } catch (error) {
      console.log(error?.data?.message || error?.message);
    }
  };

  const onProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((pre) => ({ ...pre, [name]: value }));
  };
  const profileSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await createOrUpdate(profileForm).unwrap();
      refetch();
      ToastSuccess(response);
    } catch (error) {
      console.log(error);
      ToastError(error?.datra?.message || error?.message);
    }
  };
  const onUserChange = (e) => {
    const { name, value } = e.target;
    setUserForm((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const userSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        userForm.newPassword !== userForm.confirmPassword &&
        userForm.oldPassword
      ) {
        throw new Error("confrimed password doesn't match");
      }
      const response = await update(userForm).unwrap();
      dispatch(logIn(response));
      ToastSuccess("successfully updated user");
    } catch (error) {
      console.log(error);
      ToastError("error updating");
    }
  };
  const uploadHandler = async (ev) => {
    try {
      const formData = new FormData();
      formData.append("image", ev.target.files[0]);
      const response = await sendImage(formData).unwrap();

      ToastSuccess(response.message);
      setProfileForm((pre) => ({
        ...pre,
        profilePic: `${response.image}`,
      }));
    } catch (error) {
      ToastError(error?.data?.message || error?.message);
    }
  };

  return (
    <section className="user__dashboard">
      <div className="user__profile">
        <h2 className="user__heading">User</h2>
        <form onSubmit={userSubmit} className="form">
          <div className="form__group w-100">
            <input
              type="text"
              name="name"
              onChange={onUserChange}
              value={userForm.name}
              id="name"
              className="form__input"
              placeholder="Name"
              required
            />
            <label for="name" className="form__label">
              Name
            </label>
          </div>
          <div className="form__group w-100">
            <input
              type="email"
              name="username"
              id="username"
              onChange={onUserChange}
              className="form__input"
              value={userForm.username}
              placeholder="Email"
              required
            />
            <label for="username" className="form__label">
              Email
            </label>
          </div>
          <div className="form__group w-100">
            <input
              type="password"
              name="oldPassword"
              onChange={onUserChange}
              value={userForm.oldPassword}
              id="oldPassword"
              className="form__input"
              placeholder="Old Password"
              // required
            />
            <label for="oldPassword" className="form__label">
              old Password
            </label>
          </div>
          <div className="form__group w-100">
            <input
              type="password"
              name="newPassword"
              onChange={onUserChange}
              value={userForm.newPassword}
              id="newPassword"
              className="form__input"
              placeholder="New Password"
              // required
            />
            <label for="newPassword" className="form__label">
              New Password
            </label>
          </div>
          <div className="form__group w-100">
            <input
              type="password"
              onChange={onUserChange}
              value={userForm.confirmPassword}
              name="confirmPassword"
              id="confirmPassword"
              className="form__input"
              placeholder="Confirm Password"
              // required
            />
            <label for="confirmPassword" className="form__label">
              Confirm Password
            </label>
          </div>
          <div className="form__group w-100">
            <button type="submit" className="btn-1" onSubmit={userSubmit}>
              Update
            </button>
          </div>
        </form>

        <h2 class="user__heading m-yt-l">Profile</h2>

        <form action="" class="form" onSubmit={profileSubmit}>
          <div class="form__group w-100">
            <input
              type="text"
              onChange={onProfileChange}
              value={profileForm.location}
              name="location"
              id="location"
              class="form__input"
              placeholder="location"
              required
            />
            <label for="location" class="form__label">
              Location
            </label>
          </div>
          <div class="form__group w-100">
            <input
              type="file"
              name="profilePic"
              id="profilePic"
              class="form__input"
              placeholder="Profile Photo"
              onChange={uploadHandler}
              accept="image/png, image/jpeg"
              label="choose only image"
            />
          </div>
          <div class="form__group w-100">
            <input
              type="text"
              name="products"
              onChange={onProfileChange}
              value={profileForm.products}
              id="products"
              class="form__input"
              placeholder="products"
            />
            <label for="products" class="form__label">
              products
            </label>
          </div>
          <div class="form__group w-100">
            <input
              onChange={onProfileChange}
              value={profileForm.website}
              type="text"
              name="website"
              id="website"
              class="form__input"
              placeholder="Website"
            />
            <label for="website" class="form__label">
              Website
            </label>
          </div>
          <div class="form__group w-100">
            <input
              type="text"
              name="bio"
              onChange={onProfileChange}
              value={profileForm.bio}
              id="bio"
              class="form__input"
              placeholder="Bio"
              required
            />
            <label for="Bio" class="form__label">
              Bio
            </label>
          </div>{" "}
          <h2 class="user__heading">Social</h2>
          <div class="form__group w-100">
            <input
              type="text"
              name="facebook"
              id="facebook"
              class="form__input"
              onChange={onProfileChange}
              value={profileForm.facebook}
              placeholder="FaceBook"
            />
            <label for="facebook" class="form__label">
              faceBook
            </label>
          </div>{" "}
          <div class="form__group w-100">
            <input
              type="text"
              name="linkedIn"
              onChange={onProfileChange}
              value={profileForm.linkedIn}
              id="linkedIn"
              class="form__input"
              placeholder="LinkedIn"
            />
            <label for="linkedIn" class="form__label">
              LinkedIn
            </label>
          </div>{" "}
          <div class="form__group w-100">
            <input
              type="text"
              name="youtube"
              onChange={onProfileChange}
              value={profileForm.youtube}
              id="youtube"
              class="form__input"
              placeholder="YouTube"
            />
            <label for="youtube" class="form__label">
              YouTube
            </label>
          </div>{" "}
          <div class="form__group w-100">
            <input
              type="text"
              name="instagram"
              onChange={onProfileChange}
              value={profileForm.instagram}
              id="instagram"
              class="form__input"
              placeholder="Instagram"
            />
            <label for="instagram" class="form__label">
              Instagram
            </label>
          </div>
          <div class="form__group w-100">
            <button type="submit" class="btn-1" onSubmit={profileSubmit}>
              Update
            </button>
          </div>
        </form>
      </div>
      <div className="user__orders">
        <h2 className="user__heading">My Orders</h2>
        <table className="table" cellspacing="4">
          <tr className="table__row">
            <th className="">ID</th>
            <th className="">DATE</th>
            <th className="">TOTAL</th>
            <th className="">PAID</th>
            <th className="">DELIVERED</th>
            <th className=""></th>
          </tr>
          {orderLoading ? (
            <h3>Loading.....</h3>
          ) : error ? (
            <h3>{error?.data?.message || error?.error}</h3>
          ) : (
            orders.map((order) => (
              <tr className="table__row">
                <td>{order._id}</td>
                <td>{order.createdAt.slice(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {" "}
                  {order.isPayed ? (
                    order.payedAt.slice(0, 10)
                  ) : (
                    <i class="fa-solid fa-xmark"></i>
                  )}
                </td>
                <td>
                  {" "}
                  {order.isDelivered ? (
                    order.deliveredAt.slice(0, 10)
                  ) : (
                    <i class="fa-solid fa-xmark"></i>
                  )}
                </td>
                <td>
                  <Link to={`/orderDetail/${order._id}`}>
                    <i class="fa-solid fa-ellipsis m-xr-1 icon"></i>
                    Detail
                  </Link>
                </td>
              </tr>
            ))
          )}
        </table>
        <div className="user__posts">
          <div className="user__heading">User Posts</div>
          {!isLoading &&
            data &&
            data.posts &&
            data.posts.map((post) => (
              <div className="post__main">
                <div className="user flex-ycenter">
                  <div className="user__photo">
                    <img
                      src={`${BASE_URL}img/${post.profilePic}`}
                      alt=""
                      className="user__photo__box absolute-center"
                    />
                  </div>
                  <div className="user__name">{post.user.name}</div>
                </div>
                <div className="post__body">
                  <div className="post__cote">{post.text}</div>
                  <div className="post__date">
                    {post.createdAt.slice(0, 10)}
                  </div>
                  <div className="flex flex_space-evenly">
                    <div
                      className="post__like"
                      onClick={() => addLike(post._id)}
                    >
                      <i className="fa-regular fa-heart"></i>
                      {post.likes.length}
                    </div>
                    <div className="post__comments">
                      <i className="fa-solid fa-comment-dots"></i>
                      {post.comments.length}
                    </div>
                    <div
                      className="post__delete"
                      onClick={() => deletePost(post._id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileScreen;
