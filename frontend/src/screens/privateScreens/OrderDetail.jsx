import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useFindOrderByIdQuery,
  usePaymentMutation,
} from "../../api_slices/orderApiSlice";
import { ToastError, ToastSuccess } from "../../component/Toast";
import { BASE_URL, double } from "../../constants";

const OrderDetail = () => {
  const { id, status } = useParams();
  const { data: order, isLoading } = useFindOrderByIdQuery(id);
  const [payment] = usePaymentMutation();

  useEffect(() => {
    setTimeout(() => {
      switch (status) {
        case "success":
          ToastSuccess("payment successfull");
          break;
        case "fail":
          ToastError("pament declined");
          break;
        default:
          break;
      }
    }, 3000);
  }, [status]);
  const navigate = useNavigate();
  const paymentHandler = async (id) => {
    try {
      const response = await payment(id).unwrap();

      window.location.replace(response.url);
    } catch (error) {
      console.log(error);
      ToastError(error?.data?.message || error?.message);
    }
  };
  return (
    <>
      {" "}
      {isLoading ? (
        <h3>Loading..........</h3>
      ) : (
        <section class="orderBoard">
          <button className="btn-1" onClick={() => navigate(-1)}>
            Go Back
          </button>
          <div class="orderBoard__heading">order {order._id}</div>
          <div class="orderBoard--box">
            <ul class="product__details orderBoard__order">
              <li class="product__details__items product__details__name">
                <h2 class="placeOrder__heading">Shipping</h2>
                <div class="placeOrder__para orderBoard__para">
                  <h2>Email :</h2>
                  <p>
                    <a
                      style={{ textDecoration: "underline", color: "blue" }}
                      href={`mailto:${order.user.username}`}
                    >
                      {order.user.username}
                    </a>
                  </p>
                </div>

                <div class="placeOrder__para orderBoard__para">
                  <h2>Name :</h2>
                  <p>{order.user.name}</p>
                </div>

                <div class="placeOrder__para orderBoard__para">
                  <h2>Address :</h2>
                  <p>
                    {order.shippingAddress.address} ,
                    {order.shippingAddress.city} ,
                    {order.shippingAddress.country}
                  </p>
                </div>
                <div
                  class={`alert__message ${
                    order.isDelivered ? "success" : "danger"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : "not Delivered"}
                </div>
              </li>
              <li class="product__details__items  product__details__name">
                <h2 class="placeOrder__heading">Payment Method</h2>
                <div class="placeOrder__para orderBoard__para">
                  <h2>Method :</h2>
                  <p>{order.method}</p>
                </div>
                <div
                  class={`alert__message ${
                    order.isPayed ? "success" : "danger"
                  }`}
                >
                  {order.isPayed ? "payed" : "not payed"}
                </div>
              </li>
              <li class="product__details__items  product__details__name">
                <h2 class="placeOrder__heading">Order Items</h2>
                {order.orderItems.map((x) => (
                  <div key={x._id} class="cart__product">
                    <img
                      src={`${BASE_URL}img/${x.product.image}`}
                      alt=""
                      class="cart__product__image"
                    />
                    <Link to={`/product/${x.product._id}`}>
                      {" "}
                      <div class="cart__product__name">{x.name}</div>
                    </Link>
                    <div class="cart__product__price">
                      {x.quantity}X{x.price} ={double(x.price * x.quantity)}
                    </div>
                  </div>
                ))}
              </li>
            </ul>
            <ul class="product__cart box-shadow placeOrder__summary">
              <li class="placeOrder__heading">Order Summary</li>
              <li class="product__cart__items">
                <span class="product__detail__items--key">Items</span>
                <span class="product__detail__items--value">
                  ${order.price}
                </span>
              </li>
              <li class="product__cart__items">
                <span class="product__detail__items--key">Shipping</span>
                <span class="product__detail__items--value">
                  ${order.shippingPrice}
                </span>
              </li>
              <li class="product__cart__items">
                <span class="product__detail__items--key">Tax</span>
                <span class="product__detail__items--value">
                  ${order.taxPrice}
                </span>
              </li>
              <li class="product__cart__items">
                <span class="product__detail__items--key">Total</span>
                <span class="product__detail__items--value">
                  ${order.totalPrice}
                </span>
              </li>
              <li class="product__cart__items">
                {order.method === "bank" && !order.isPayed && (
                  <>
                    {" "}
                    <buton
                      class="btn-pay"
                      onClick={() => paymentHandler(order._id)}
                    >
                      <img
                        class="btn-pay__logo"
                        src={`${BASE_URL}img/bKash Logo Vector.svg`}
                        alt=""
                      />{" "}
                      <img
                        class="btn-pay__logo"
                        src={`${BASE_URL}img/nagad-seeklogo.svg`}
                        alt=""
                      />
                      <img
                        class="btn-pay__logo"
                        src={`${BASE_URL}img/184568.svg`}
                        alt=""
                      />
                      <img
                        class="btn-pay__logo"
                        src={`${BASE_URL}img/kisspng-visa-logo-mastercard-credit-card-payment-5b15b13e5dff50.494880871528148286385.png`}
                        alt=""
                      />
                    </buton>
                  </>
                )}
                {order.method === "COD" && order.isPayed && (
                  <buton class="btn-pay">
                    <i class="fa-solid fa-hand-holding-dollar"></i>
                    COD
                  </buton>
                )}
              </li>
            </ul>
          </div>
        </section>
      )}
    </>
  );
};

export default OrderDetail;
