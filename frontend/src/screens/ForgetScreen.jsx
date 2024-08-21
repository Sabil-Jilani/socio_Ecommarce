import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSendCodeMutation } from "../api_slices/authApiSlice";
import { ToastError, ToastSuccess } from "../component/Toast";

const ForgetScreen = () => {
  const [formData, setFormData] = useState("");
  const [sendCode] = useSendCodeMutation();
  const navigate = useNavigate();
  const onChangeHandler = (ev) => {
    setFormData(ev.target.value);
  };
  const onSubmitHandler = async (ev) => {
    try {
      ev.preventDefault();
      const response = await sendCode({ username: formData }).unwrap();
      ToastSuccess(response);
      alert(
        "A link has been sent to this Email,You can reset password from it"
      );
      navigate("/");
    } catch (error) {
      console.log(error);
      setFormData("");
      ToastError(error?.data?.message || error?.message);
    }
  };
  return (
    <div className="forget--box">
      <h3 class="login__heading">login page</h3>
      <form class="form" onSubmit={onSubmitHandler}>
        <div class="form__group">
          <input
            onChange={onChangeHandler}
            value={formData}
            type="email"
            name="username"
            class="form__input"
            placeholder="Email"
            required
            id="email"
          />
          <label for="email" class="form__label">
            Email
          </label>
        </div>

        <button type="submit" class="btn-1" onSubmit={onSubmitHandler}>
          Send code
        </button>
      </form>
    </div>
  );
};

export default ForgetScreen;
