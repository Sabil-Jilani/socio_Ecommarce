import React from "react";

const review = ({ rating, numReviews }) => {
  const num = rating / numReviews;

  return (
    <div class="review__stars">
      {num > 0 ? (
        num >= 1 ? (
          <i class="fa-solid fa-star"></i>
        ) : (
          <i class="fa-regular fa-star-half-stroke"></i>
        )
      ) : (
        <i class="fa-regular fa-star"></i>
      )}{" "}
      {num > 1 ? (
        num >= 2 ? (
          <i class="fa-solid fa-star"></i>
        ) : (
          <i class="fa-regular fa-star-half-stroke"></i>
        )
      ) : (
        <i class="fa-regular fa-star"></i>
      )}{" "}
      {num > 2 ? (
        num >= 3 ? (
          <i class="fa-solid fa-star"></i>
        ) : (
          <i class="fa-regular fa-star-half-stroke"></i>
        )
      ) : (
        <i class="fa-regular fa-star"></i>
      )}{" "}
      {num > 3 ? (
        num >= 4 ? (
          <i class="fa-solid fa-star"></i>
        ) : (
          <i class="fa-regular fa-star-half-stroke"></i>
        )
      ) : (
        <i class="fa-regular fa-star"></i>
      )}{" "}
      {num > 4 ? (
        num >= 5 ? (
          <i class="fa-solid fa-star"></i>
        ) : (
          <i class="fa-regular fa-star-half-stroke"></i>
        )
      ) : (
        <i class="fa-regular fa-star"></i>
      )}
    </div>
  );
};

export default review;
