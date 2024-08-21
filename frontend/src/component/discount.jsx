import React from "react";

const Discount = ({ offerPrice, price }) => {
  const discountPrice = Math.ceil((offerPrice / price) * 100);
  return <span class="card__discount__percentage">{discountPrice}%</span>;
};

export default Discount;
