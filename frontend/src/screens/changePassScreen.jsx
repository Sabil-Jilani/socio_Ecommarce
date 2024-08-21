import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCheckUserQuery,
  useChengePassMutation,
} from "../api_slices/authApiSlice";
import { ToastError, ToastSuccess } from "../component/Toast";

const ChangePassScreen = () => {
  const navigate = useNavigate();
  const { userId, token } = useParams();
  const [ChangePass] = useChengePassMutation();
  const { data, isLoading, error } = useCheckUserQuery({ userId, token });
  useEffect(() => {
    data && ToastSuccess("system has varified it's you");
  }, [data]);
  const [credential, setCredential] = useState({
    password: "",
    confirmPassword: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCredential((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const onSubmithandler = async (ev) => {
    try {
      ev.preventDefault();
      if (credential.password === credential.confirmPassword) {
        const response = await ChangePass({ userId, credential }).unwrap();
        ToastSuccess(response);
        setCredential("");
        navigate("/profile");
      } else {
        ToastError("passwords don't match");
      }
    } catch (error) {
      console.log(error);
      setCredential("");
      ToastError(error?.data?.message || error?.error);
    }
  };

  return isLoading ? (
    <h3>Loading.....</h3>
  ) : error ? (
    <h3 className="varify-text danger">
      {error?.data?.message || error?.error}
    </h3>
  ) : (
    <div className="forget--box">
      <h3 class="login__heading">Change Password</h3>
      <form class="form" onSubmit={onSubmithandler}>
        <div class="form__group">
          <input
            onChange={onChangeHandler}
            value={credential.password}
            type="password"
            name="password"
            class="form__input"
            placeholder="password"
            required
            id="password"
          />
          <label for="password" class="form__label">
            Password
          </label>
        </div>
        <div class="form__group">
          <input
            onChange={onChangeHandler}
            value={credential.confirmPassword}
            type="password"
            name="confirmPassword"
            class="form__input"
            placeholder="confirmPassword"
            required
            id="confirmPassword"
          />
          <label for="confirmPassword" class="form__label">
            Confirm Password
          </label>
        </div>
        <button type="submit" class="btn-1" onSubmit={onSubmithandler}>
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassScreen;
