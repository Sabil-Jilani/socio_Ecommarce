import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useAllOrdersQuery,
  useDeleteOrderMutation,
  useOrderDeliveredMutation,
  useUpdatePaymentMutation,
} from "../../api_slices/orderApiSlice";
import { ToastError, ToastSuccess } from "../../component/Toast";
const AdminOrdersScreen = () => {
  const [payed] = useUpdatePaymentMutation();
  const [delivared] = useOrderDeliveredMutation();
  const navigate = useNavigate();
  const { data: orders, isLoading, error, refetch } = useAllOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();

  const updateLocaleDelivery = async (order) => {
    try {
      if (order.isPayed) {
        const response = await delivared(order._id).unwrap();
        refetch();
        ToastSuccess(response);
      } else {
        ToastError("not payed cann't update delivary!");
      }
    } catch (error) {
      console.log(error);
      ToastError(error?.data?.message || error?.message);
    }
  };
  const updatePayment = async (order) => {
    try {
      const response = await payed(order._id).unwrap();
      refetch();
      ToastSuccess(response);
    } catch (error) {
      console.log(error);
      ToastError(error?.data?.message || error?.message);
    }
  };
  const orderDelete = async (id) => {
    try {
      const response = await deleteOrder(id).unwrap();
      ToastSuccess(response);
      refetch();
    } catch (err) {
      console.log(err);
      ToastError(err?.data?.message || err?.message);
    }
  };
  return (
    <section class="createProduct">
      {" "}
      <div class="header">
        <button className="btn-1" onClick={() => navigate(-1)}>
          Go Back
        </button>
        <h2 class="heading createProduct__heading">orders</h2>
      </div>
      <table class="table" cellspacing="4">
        <tr class="table__row">
          <th class="">ID</th>
          <th class="">PRODUCTS</th>

          <th class="">TOTAL PRICE</th>
          <th class="">IS PAYED</th>
          <th class="">IS DELEVERED</th>
          <th class=""></th>
        </tr>
        {isLoading ? (
          <h1>Loading.......</h1>
        ) : error ? (
          <h3>{error?.data?.message || error?.message}</h3>
        ) : (
          orders.map((order) => (
            <tr class="table__row" key={order._id}>
              <td>{order._id}</td>
              <td>
                {order.orderItems.map((product, index) => (
                  <li style={{ listStyle: "none" }} key={index}>
                    {product.name}
                  </li>
                ))}
              </td>
              <td>{order.totalPrice}</td>
              <td>
                {order.isPayed ? (
                  order.payedAt.slice(0, 10)
                ) : (
                  <i
                    class="fa-solid fa-xmark"
                    onClick={() => updatePayment(order)}
                  ></i>
                )}
              </td>

              <td>
                {order.isDelivered ? (
                  order.deliveredAt.slice(0, 10)
                ) : (
                  <i
                    class="fa-solid fa-xmark"
                    onClick={() => updateLocaleDelivery(order)}
                  ></i>
                )}
              </td>
              <td>
                <Link to={`/orderDetail/${order._id}`}>
                  <i class="fa-solid fa-ellipsis m-xr-1 icon"></i>
                </Link>
                <i
                  class="fa-solid fa-trash icon"
                  onClick={() => orderDelete(order._id)}
                ></i>
              </td>
            </tr>
          ))
        )}
      </table>
    </section>
  );
};

export default AdminOrdersScreen;
