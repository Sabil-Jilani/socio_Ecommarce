import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addShippingAddress } from "../../api_slices/cartSlice";
import { ToastSuccess } from "../../component/Toast";
const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shipping = useSelector((state) => state.cart.shippingAddress);
  const [{ city, address, postalCode, country }, setShippingAddress] = useState(
    {
      city: "",
      address: "",
      postalCode: "",
      country: "",
    }
  );

  useEffect(() => {
    setShippingAddress(shipping);
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setShippingAddress((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addShippingAddress({
        city,
        address,
        postalCode,
        country,
      })
    );
    setShippingAddress({
      city: "",
      address: "",
      postalCode: "",
      country: "",
    });
    navigate("/placeOrder");
    ToastSuccess("address added");
  };
  return (
    <section class="shipping">
      <h2 class="shipping__heading">shipping</h2>
      <form class="form" onSubmit={onSubmitHandler}>
        <div class="form__group">
          <input
            onChange={onChangeHandler}
            name="address"
            value={address}
            type="text"
            class="form__input input-white"
            placeholder="Address"
            required
            id="address"
          />
          <label for="address" class="form__label">
            Address
          </label>
        </div>
        <div class="form__group">
          <input
            onChange={onChangeHandler}
            name="city"
            value={city}
            type="text"
            class="form__input input-white"
            placeholder="City"
            required
            id="city"
          />
          <label for="city" class="form__label">
            City
          </label>
        </div>
        <div class="form__group">
          <input
            onChange={onChangeHandler}
            name="postalCode"
            value={postalCode}
            type="text"
            class="form__input input-white"
            placeholder="Postal Code"
            required
            id="post"
          />
          <label for="post" class="form__label">
            Postal code
          </label>
        </div>
        <div class="form__group">
          <input
            onChange={onChangeHandler}
            name="country"
            value={country}
            type="text"
            class="form__input input-white"
            placeholder="Country"
            required
            id="contry"
          />
          <label for="contry" class="form__label">
            Country
          </label>
        </div>
        <button class="btn-1" onSubmit={onSubmitHandler}>
          continue
        </button>
      </form>
    </section>
  );
};

export default Shipping;
