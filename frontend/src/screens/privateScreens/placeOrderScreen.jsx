import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addTocart,
  clearCart,
  deleteproductById,
} from "../../api_slices/cartSlice";
import { usePlaceOrderMutation } from "../../api_slices/orderApiSlice";
import { ToastError, ToastSuccess } from "../../component/Toast";
import { BASE_URL } from "../../constants";

const PlaceOrder = () => {
  const [placeOrderMutation] = usePlaceOrderMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    cartItems,
    shippingAddress: { address, city, postalCode, country },
    method,
    price,

    shippingPrice,
    taxPrice,
    totalPrice,
  } = useSelector((state) => state.cart);

  const updatecart = (e, product) => {
    dispatch(
      addTocart({
        _id: product._id,
        name: product.name,
        brand: product.brand,
        image: product.image,
        category: product.category,
        description: product.description,
        rating: product.rating,
        numReviews: product.numReviews,
        price: product.offerprice ? product.offerPrice : product.price,
        countOfStock: product.countOfStock,
        user: product.user,
        quantity: Number(e.target.value),
      })
    );
    ToastSuccess("successfully updated");
  };
  const DeleteCartProduct = (id) => {
    dispatch(deleteproductById(id));
    ToastSuccess("successfully deleted");
  };
  const placeOrder = async () => {
    try {
      const response = await placeOrderMutation({
        cartItems,
        shippingAddress: { address, city, country, postalCode },
        method,
        price,
        shippingPrice,
        taxPrice,
        totalPrice,
      }).unwrap();
      ToastSuccess("order placed successfully");
      dispatch(clearCart());
      navigate(`/orderDetail/${response._id}`);
    } catch (error) {
      ToastError(error?.data?.message || error?.message);
    }
  };
  return (
    <section class="placeOrder">
      <ul class="product__details placeOrder__order">
        <button class="btn-back" onClick={() => navigate(-1)}>
          Go Back
        </button>
        <li class="product__details__items product__details__name">
          <h2 class="placeOrder__heading">Shipping</h2>
          <div class="placeOrder__para">
            <h2>Address :</h2>
            <p>{`${address} , ${city} , ${country}`}</p>
          </div>
        </li>
        <li class="product__details__items product__details__name">
          <h2 class="placeOrder__heading">Payment Method</h2>
          <div class="placeOrder__para">
            <h2>Method :</h2>
            <p>{method}</p>
          </div>
        </li>
        <li class="product__details__items product__details__name">
          <h2 class="placeOrder__heading">Order Items</h2>
          {cartItems.map((product) => (
            <div key={product._id} class="cart__product">
              <img
                src={`${BASE_URL}img/${product.image}`}
                alt={product.name}
                class="cart__product__image"
              />
              <div class="cart__product__name">
                <Link to={`/product/${product._id}`}>{product.name}</Link>
              </div>
              <div class="cart__product__price">${product.price}</div>
              <select
                id="quantity"
                name="quantity"
                onChange={(e) => updatecart(e, product)}
                class="dropdown cart__product__dropdown"
              >
                {[...Array(product.countOfStock).keys()].map((x, index) => (
                  <option
                    value={x + 1}
                    key={index}
                    selected={Number(product.quantity) === x + 1}
                  >
                    {x + 1}
                  </option>
                ))}
              </select>
              <div
                onClick={() => DeleteCartProduct(product._id)}
                class="cart__product__delete"
              >
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
          ))}
        </li>
      </ul>

      <ul class="product__cart box-shadow placeOrder__summary">
        <li class="placeOrder__heading">Order Summary</li>
        <li class="product__cart__items">
          <span class="product__detail__items--key">Items</span>
          <span class="product__detail__items--value">${price}</span>
        </li>
        <li class="product__cart__items">
          <span class="product__detail__items--key">Shipping</span>
          <span class="product__detail__items--value">${shippingPrice}</span>
        </li>
        <li class="product__cart__items">
          <span class="product__detail__items--key">Tax</span>
          <span class="product__detail__items--value">${taxPrice}</span>
        </li>{" "}
        <li class="product__cart__items">
          <span class="product__detail__items--key">Total</span>
          <span class="product__detail__items--value">${totalPrice}</span>
        </li>{" "}
        <li class="product__cart__items">
          {/* {method === "bank" && (
            <>
              <buton class="btn-pay">
                <img
                  class="btn-pay__logo"
                  src="./img/bKash Logo Vector.svg"
                  alt=""
                />{" "}
              </buton>
              <buton class="btn-pay">
                <img
                  class="btn-pay__logo"
                  src="./img/nagad-seeklogo.svg"
                  alt=""
                />{" "}
              </buton>{" "}
              <buton class="btn-pay">
                <img class="btn-pay__logo" src="./img/184568.svg" alt="" />{" "}
              </buton>{" "}
              <buton class="btn-pay">
                <img
                  class="btn-pay__logo"
                  src="./img/kisspng-visa-logo-mastercard-credit-card-payment-5b15b13e5dff50.494880871528148286385.png"
                  alt=""
                />{" "}
              </buton>
            </>
          )}
          {method === "COD" && (
            <buton class="btn-pay">
              <i class="fa-solid fa-hand-holding-dollar"></i>
              COD
            </buton>
          )} */}
        </li>
        <li class="product__cart__items">
          <buton class="btn-1" onClick={placeOrder}>
            Place Order
          </buton>
        </li>
      </ul>
    </section>
  );
};

export default PlaceOrder;
