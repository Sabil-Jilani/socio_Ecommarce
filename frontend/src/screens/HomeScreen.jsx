import React from "react";
import { useGetProductsQuery } from "../api_slices/productApiSlice";
import Card from "../component/Card";
const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
      <section className="products__container">
        <p className="products__heading">Find latest productss</p>
        <div className="card__box">
          {isLoading ? (
            <h2>Loading</h2>
          ) : error ? (
            <h2>{error?.data?.message || error.message}</h2>
          ) : (
            products.map((x, index) => <Card card={x} key={index} />)
          )}
        </div>
      </section>
    </>
  );
};

export default HomeScreen;
