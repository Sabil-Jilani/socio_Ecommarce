import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { globalContext } from "../App";
import { useRegisterApiMutation } from "../api_slices/authApiSlice";
import { logIn } from "../api_slices/authSlices";
import { CLOSE_REGISTER_MODAL, OPEN_LOGIN_MODAL } from "../constants";
import { ToastError, ToastSuccess } from "./Toast";

const Register = () => {
  const Usedispatch = useDispatch();
  const [register] = useRegisterApiMutation();
  const { dispatch } = useContext(globalContext);
  const { user } = useSelector((state) => state.userCredentials);
  const { search } = useLocation();
  const navigate = useNavigate();
  const gp = new URLSearchParams(search);
  const redirect = gp.get("redirect") || null;
  useEffect(() => {
    if (user) dispatch({ type: CLOSE_REGISTER_MODAL });
  }, [user, dispatch]);

  const [formData, setformData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const { name, username, password } = formData;
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
      const response = await register(formData).unwrap();
      response.message && alert(response.message);
      Usedispatch(logIn(response.user));
      setformData({
        name: "",
        username: "",
        password: "",
      });
      ToastSuccess("registered successfully");
      dispatch({ type: CLOSE_REGISTER_MODAL });
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
    <>
      {" "}
      <div class="login">
        <div class="login__box absolute-center">
          <i
            class="cut-x fa-solid fa-circle-xmark"
            onClick={() => dispatch({ type: CLOSE_REGISTER_MODAL })}
          ></i>
          <h3 class="login__heading">Registration</h3>
          <form class="form" onSubmit={onSubmitHandler}>
            <div class="form__group">
              <input
                type="text"
                class="form__input"
                placeholder="Full Name"
                onChange={onchange}
                name="name"
                value={name}
                required
                id="name"
              />
              <label for="name" class="form__label">
                Full Name
              </label>
            </div>
            <div class="form__group">
              <input
                type="email"
                class="form__input"
                onChange={onchange}
                placeholder="Email"
                name="username"
                vaue={username}
                required
                id="email"
              />
              <label for="email" class="form__label">
                Email
              </label>
            </div>
            <div class="form__group">
              <input
                minlength="4"
                type="password"
                class="form__input"
                onChange={onchange}
                name="password"
                value={password}
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
                style={{ "text-decoration": "underline" }}
                onClick={() => {
                  dispatch({ type: OPEN_LOGIN_MODAL });
                  dispatch({ type: CLOSE_REGISTER_MODAL });
                }}
              >
                already have an account?
              </p>
              <div>.</div>
            </div>
            <button type="submit" class="btn-1">
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
    </>
  );
};

export default Register;
