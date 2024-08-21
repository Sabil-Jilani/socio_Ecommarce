import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { globalContext } from "../App";
import { useLogInApiMutation } from "../api_slices/authApiSlice";
import { logIn } from "../api_slices/authSlices";
import { CLOSE_LOGIN_MODAL, OPEN_REGISTER_MODAL } from "../constants";
import { ToastError, ToastSuccess } from "./Toast";

const LogIn = () => {
  const { user } = useSelector((state) => state.userCredentials);
  const navigate = useNavigate();
  const { dispatch } = useContext(globalContext);

  useEffect(() => {
    if (user) {
      dispatch({ type: CLOSE_LOGIN_MODAL });
    }
  }, [user, dispatch]);

  const Usedispatch = useDispatch();
  const [LogIn] = useLogInApiMutation();
  const { search } = useLocation();
  const gp = new URLSearchParams(search);
  const redirect = gp.get("redirect") || null;
  const closeModal = () => {
    return dispatch({ type: CLOSE_LOGIN_MODAL });
  };
  const [formData, setformData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;
  const onchange = (e) => {
    const { name, value } = e.target;
    setformData((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await LogIn(formData).unwrap();
      response.message && alert(response.message);
      Usedispatch(logIn(response.user));
      setformData({
        username: "",
        password: "",
      });
      dispatch({ type: CLOSE_LOGIN_MODAL });
      ToastSuccess("seccessfully loggedIn");
      redirect && navigate(redirect);
    } catch (error) {
      console.log(error);
      setformData({
        name: "",
        username: "",
        password: "",
      });
      ToastError(error?.data?.message || error?.message);
    }

    // dispatch({ type: CLOSE_REGISTER_MODAL });
  };
  return (
    <div class="login">
      <div class="login__box absolute-center">
        <i class="cut-x fa-solid fa-circle-xmark" onClick={closeModal}></i>
        <h3 class="login__heading">login page</h3>
        <form class="form" onSubmit={onSubmitHandler}>
          <div class="form__group">
            <input
              type="email"
              name="username"
              value={username}
              onChange={onchange}
              class="form__input"
              placeholder="Email"
              required
              id="email"
            />
            <label for="email" class="form__label">
              Email
            </label>
          </div>

          <div class="form__group">
            <input
              name="password"
              value={password}
              onChange={onchange}
              minlength="4"
              type="password"
              class="form__input"
              placeholder="passward"
              required
              id="password"
            />
            <label for="passward" class="form__label">
              {" "}
              passward{" "}
            </label>
          </div>
          <div class="from__group w-100 flex-ycenter flex_space-between">
            <p
              style={{ "text-decoration": "underline", cursor: "pointer" }}
              onClick={() => {
                dispatch({ type: CLOSE_LOGIN_MODAL });
                dispatch({ type: OPEN_REGISTER_MODAL });
              }}
            >
              don't have an account?
            </p>
            <div>
              <Link
                to="/forget"
                style={{ "text-decoration": "underline", cursor: "pointer" }}
                onClick={() => {
                  dispatch({ type: CLOSE_LOGIN_MODAL });
                }}
              >
                Forgot password
              </Link>
            </div>
          </div>
          <button type="submit" class="btn-1" onSubmit={onSubmitHandler}>
            submit
          </button>
        </form>
        <div class="oauth">
          <button class="">
            <i class="fa-brands fa-google google"></i>Google
          </button>
          <button class="">
            <i class="fa-brands fa-square-github github"></i>Github
          </button>
          <button class="">
            <i class="fa-brands fa-facebook-f facebook"></i>Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
