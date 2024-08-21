import React from "react";
import { useParams } from "react-router-dom";
import { useVarifyUserQuery } from "../api_slices/authApiSlice";

const VarifyScreen = () => {
  const { userId, token } = useParams();
  const { data, isLoading, error } = useVarifyUserQuery({ userId, token });

  return (
    <section className="products__container">
      {isLoading ? (
        <h3>Loading.....</h3>
      ) : error ? (
        <h3 className="varify-text danger">{error?.data || error?.error}</h3>
      ) : (
        <div className="varify-text success">{data}</div>
      )}
    </section>
  );
};

export default VarifyScreen;
