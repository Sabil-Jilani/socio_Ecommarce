import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addTocart } from "../api_slices/cartSlice";
import {
  useAddReviewMutation,
  useDeleteReviewMutation,
  useGetProductByIdQuery,
} from "../api_slices/productApiSlice";
import Review from "../component/Review";
import { BASE_URL } from "../constants";
import { ToastError, ToastSuccess } from "./../component/Toast";
const Prodcut = () => {
  const dispatch = useDispatch();
  const [qntNum, setQntNum] = useState({
    quantity: 1,
  });
  const user = useSelector((state) => state.userCredentials.user);
  const [formData, setFormData] = useState({
    rating: 1,
    comment: "",
  });
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductByIdQuery(id);
  const [addReview] = useAddReviewMutation();
  const [deletereview] = useDeleteReviewMutation();
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const deleteReview = async (id) => {
    try {
      const response = await deletereview(id).unwrap();
      ToastSuccess(response);
      refetch();
    } catch (error) {
      console.log(error);
      ToastError(error?.data?.mesage || error?.message);
    }
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await addReview({ id, formData }).unwrap();
      ToastSuccess(response);
      refetch();
    } catch (error) {
      console.log(error);
      ToastError(error?.data?.message || error?.message);
    }
  };
  const quantityNum = (e) => {
    const { name, value } = e.target;
    setQntNum({
      [name]: value,
    });
  };
  const AddToCart = (product) => {
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
        quantity: qntNum.quantity,
      })
    );
    ToastSuccess("Added to cart");
  };
  return (
    <>
      {" "}
      {isLoading ? (
        <h2>Loading............</h2>
      ) : error ? (
        <h2>{error?.data?.message || error?.message}</h2>
      ) : (
        <section className="product">
          <div className="main">
            <div className="product__photo--box">
              <img
                src={`${BASE_URL}img/${product.image}`}
                alt={product.image}
                className="product__image"
              />
            </div>
            <section className="reviews">
              <h2 className="reviews__heading">Reviews !!</h2>
              {user ? (
                <form className="form" onSubmit={onSubmitHandler}>
                  <div className="product__cart__items w-55">
                    <label
                      For="quantity"
                      className="dropdown__label label-font"
                    >
                      Rating ::
                    </label>
                    <select
                      id="quantity"
                      onChange={onChangeHandler}
                      name="rating"
                      className="dropdown"
                    >
                      <option value="1">1</option> <option value="2">2</option>{" "}
                      <option value="3">3</option> <option value="4">4</option>{" "}
                      <option value="5">5</option>
                    </select>
                  </div>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={onChangeHandler}
                    type="text"
                    className="form__textarea"
                    cols="30"
                    rows="10"
                  ></textarea>

                  <button
                    type="submit"
                    className="btn-1 reviews__btn"
                    onSubmit={onSubmitHandler}
                  >
                    post
                  </button>
                </form>
              ) : (
                <h2 className="m-yt">Need To logIn to submit reviews</h2>
              )}
              <div className="reviews__box">
                {product.reviews.length > 0 &&
                  product.reviews.map((x) => {
                    return (
                      <>
                        <div className="reviews__card box-shadow">
                          {user && user._id === x.user && (
                            <i
                              className="fa-solid fa-circle-xmark review__cross"
                              onClick={() => deleteReview(product._id)}
                            ></i>
                          )}
                          <div className="reviews__card__name">{x.name}</div>
                          <div className="review inline-block">
                            <Review rating={x.rating} numReviews={1} />
                          </div>

                          <div className="reviews__card__date">
                            {x.createdAt.slice(0, 10)}
                          </div>
                          <div className="reviews__card__description">
                            {x.comment}
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </section>
          </div>
          <ul className="product__details box-shadow">
            <li className="product__details__items product__details__name">
              {product.name}
            </li>
            <li className="product__details__items review">
              <Review rating={product.rating} numReviews={product.numReviews} />
              <div className="review__num">({product.numReviews}) reviews</div>
            </li>
            <li className="product__details__items product__details__price">
              ${product.offerPrice ? product.offerPrice : product.price}
            </li>
            <li className="product__details__items product__details__description">
              {product.description}
            </li>
          </ul>
          <ul className="product__cart box-shadow">
            <li className="product__cart__items">
              <span className="product__detail__items--key">Price</span>
              <span className="product__detail__items--value">
                {" "}
                ${product.offerPrice ? product.offerPrice : product.price}
              </span>
            </li>
            <li className="product__cart__items">
              <span className="product__detail__items--key">status</span>
              {product.countOfStock > 0 ? (
                <span className="product__detail__items--value">In Stock</span>
              ) : (
                <span className="product__detail__items--value">
                  out of Stock
                </span>
              )}
            </li>
            <li className="product__cart__items">
              <label for="quantity" className="dropdown__label">
                Qnty :
              </label>
              <select
                id="quantity"
                name="quantity"
                onChange={quantityNum}
                className="dropdown"
                disabled={product.countOfStock <= 0}
              >
                {[...Array(product.countOfStock).keys()].map((x) => (
                  <option value={x + 1} key={x}>
                    {x + 1}
                  </option>
                ))}

                {/* <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option> */}
              </select>
            </li>
            <li className="product__cart__items">
              <button
                onClick={() => AddToCart(product)}
                className="btn-1 move-up"
                disabled={product.countOfStock <= 0}
              >
                Add To Cart
                <span className="btn-invisible btn-1">
                  Only {product.countOfStock} left
                </span>
              </button>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default Prodcut;
