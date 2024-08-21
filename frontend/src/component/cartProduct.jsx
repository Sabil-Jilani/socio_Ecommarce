import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addTocart, deleteproductById } from "../api_slices/cartSlice";
import { ToastSuccess } from "../component/Toast";
import { BASE_URL } from "../constants";
const CartProduct = (product) => {
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
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
  return (
    <div key={product._id} className="cart__product">
      <Link to={`/product/${product._id}`} className="flex-ycenter ">
        {" "}
        <img
          src={`${BASE_URL}img/${product.image}`}
          alt=""
          className="cart__product__image"
        />
        <div className="cart__product__name">{product.name}</div>
      </Link>
      <div className="cart__product__price">${product.price}</div>
      <select
        id="quantity"
        name="quantity"
        onChange={onChangeHandler}
        className="dropdown w-12"
        disabled={product.countOfStock <= 0}
      >
        {[...Array(product.countOfStock).keys()].map((x) => (
          <option
            value={x + 1}
            key={x}
            selected={Number(product.quantity) === x + 1}
          >
            {x + 1}
          </option>
        ))}

        {/* <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option> */}
      </select>
      <div
        className="cart__product__delete"
        onClick={() => DeleteCartProduct(product._id)}
      >
        <i className="fa-solid fa-trash"></i>
      </div>
    </div>
  );
};

export default CartProduct;
