import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMethod } from "../../api_slices/cartSlice";
import { ToastSuccess } from "../../component/Toast";

const PaymentScreen = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [check, setcheck] = useState("bank");
  const onNext = () => {
    dispatch(addMethod(check));
    ToastSuccess("successfilly added");
    navigate("/shipping");
  };
  return (
    <section className="payment">
      <h2 className="payment__heading">choose a Payment Method</h2>
      <div className="payment__list">
        <input
          onChange={() => setcheck("COD")}
          className="payment__input"
          type="radio"
          id="COD"
          name="method"
          value="COD"
        />
        <label className="payment__label" for="COD">
          cash on{" "}
        </label>
      </div>

      <div className="payment__list">
        <input
          className="payment__input"
          type="radio"
          id="bank"
          name="method"
          onChange={() => setcheck("bank")}
          checked
        />
        <label className="payment__label" for="bank">
          mobile bank or visa
        </label>
      </div>
      <button className="btn-1" onClick={onNext}>
        NEXT
      </button>
    </section>
  );
};

export default PaymentScreen;
