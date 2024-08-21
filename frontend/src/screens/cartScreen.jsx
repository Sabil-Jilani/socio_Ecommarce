import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { globalContext } from "../App";
import CartProduct from "../component/cartProduct";
import { OPEN_LOGIN_MODAL } from "../constants";
const CartScreen = () => {
  const { state, dispatch: Dispatch } = useContext(globalContext);
  const cart = useSelector((state) => state.cart);
  const userCredential = useSelector((state) => state.userCredentials);
  const navigate = useNavigate();
  return (
    <section className="cart">
      <div className="cart__left">
        <button onClick={() => navigate(-1)} className="btn-back margin-2">
          Go Back
        </button>
        <h2 className="cart__heading">Shopping Cart</h2>
        {cart.cartItems.length <= 0 ? (
          <h2 className="cart__cote">
            <Link to="/" className="link">
              No product in cart. Go Shopping......
            </Link>
          </h2>
        ) : (
          cart.cartItems.map((product) => CartProduct(product))
        )}
      </div>
      <div className="cart__right">
        <ul className="product__details w-100">
          <li className="product__details__items product__details__name">
            <h1 className="cart__right__heading">
              Subtotal ({cart.cartItems.length}) items
            </h1>
            <p className="cart__right__price">{cart.totalPrice}</p>
          </li>
          <li className="product__details__items product__details__name">
            <button
              onClick={() =>
                userCredential.user
                  ? navigate("/payment")
                  : Dispatch({ type: OPEN_LOGIN_MODAL })
              }
              className="btn-1"
              disabled={cart.cartItems.length <= 0}
            >
              Proceed to Checkout
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default CartScreen;
