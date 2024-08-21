import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../constants";
import Review from "./Review";
import Discount from "./discount";

const Card = ({ card }) => {
  const {
    _id,

    image,
    name,
    numReviews,
    price,
    offerPrice,
    rating,
  } = card;
  return (
    <div class="card">
      {offerPrice && <Discount price={price} offerPrice={offerPrice} />}
      <Link to={`product/${_id}`}>
        <div class="card__photo">
          <img
            src={`${BASE_URL}img/${image}`}
            alt={`${name}`}
            class="card__photo--box"
          />
        </div>
        <h4 class="card__name">{name}</h4>
        <div className="review">
          <Review rating={rating} numReviews={numReviews} />

          <div class="review__num">({numReviews}) Reviews</div>
        </div>
        <div class="card__price">
          <div
            class="card__price__span"
            style={offerPrice && { textDecoration: "line-through" }}
          >
            $ {price}
          </div>
          {offerPrice && <div class="card__offer__price">${offerPrice}</div>}
        </div>
      </Link>
    </div>
  );
};

export default Card;
