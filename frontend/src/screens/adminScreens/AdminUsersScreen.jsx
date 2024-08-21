import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useAddAdminUserMutation,
  useDeleteUserByIdMutation,
  useGetAllUserQuery,
} from "../../api_slices/authApiSlice";
import { useDeleteProfileByIdMutation } from "../../api_slices/profileApiSlice";
import { ToastError, ToastSuccess } from "../../component/Toast";

const AdminUsersScreen = () => {
  const [deleteProfile] = useDeleteProfileByIdMutation();
  const { data: users, isLoading, error, refetch } = useGetAllUserQuery();
  const [addAdmin] = useAddAdminUserMutation();

  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserByIdMutation();
  const addAdminHandler = async (id) => {
    try {
      const response = await addAdmin(id).unwrap();

      ToastSuccess(response);
      refetch();
    } catch (error) {
      console.log(error);
      ToastError(error?.data?.message || error?.error);
    }
  };
  const deleteUserById = async (id) => {
    try {
      if (
        window.confirm("do you want to delte user as well as his?her profile")
      ) {
        const response = await deleteUser(id).unwrap();
        await deleteProfile(id).unwrap();
        ToastSuccess(response);
        refetch();
      }
    } catch (error) {
      console.log(error);
      ToastError(error);
    }
  };
  return (
    <>
      <section class="createProduct">
        <div class="header">
          <button className="btn-1" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
        <table class="table" cellspacing="4">
          <tr class="table__row">
            <th class="">ID</th>
            <th class="">NAME</th>
            <th class="">MAIL</th>
            <th class="">VARIFIED</th>
            <th class="">ADMIN</th>
            <th class=""></th>
          </tr>
          {isLoading ? (
            <h3>loading.......</h3>
          ) : error ? (
            <h3>{error?.data?.message || error?.message}</h3>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td class="">P{user._id}</td>
                <Link to={`/profile/${user._id}`}>
                  {" "}
                  <td class="">{user.name}</td>
                </Link>
                <td class="">
                  <a href={`mailto:${user.username}`}>{user.username}</a>{" "}
                </td>
                <td class="">
                  {user.isvarified ? "VARIFIED" : "not varivied"}
                </td>
                <td class="" onClick={() => addAdminHandler(user._id)}>
                  {user.isAdmin ? (
                    <i class="fa-solid fa-check"></i>
                  ) : (
                    <i class="fa-solid fa-xmark"></i>
                  )}
                </td>
                <td>
                  {/* <Link
                    to={`/editProduct/`}
                    class="fa-solid fa-pen-to-square m-xr-1 icon"
                  ></Link> */}
                  <i
                    class="fa-solid fa-trash icon"
                    onClick={() => deleteUserById(user._id)}
                  ></i>
                </td>
              </tr>
            ))
          )}
        </table>
      </section>
    </>
  );
};

export default AdminUsersScreen;
