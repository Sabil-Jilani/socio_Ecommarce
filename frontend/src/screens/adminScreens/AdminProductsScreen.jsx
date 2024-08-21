import React from "react";
import { Link } from "react-router-dom";
import {
  useCreateProductMutation,
  useDeleteProductByIdMutation,
  useGetProductsQuery,
} from "../../api_slices/productApiSlice";
import { ToastError, ToastSuccess } from "../../component/Toast";

const AdminProductsScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductByIdMutation();
  const [createProduct] = useCreateProductMutation();
  const deleteProductById = async (id) => {
    try {
      const response = await deleteProduct(id).unwrap();
      refetch();
      ToastSuccess(response);
    } catch (error) {
      ToastError(error?.data?.message || error?.message);
      console.log(error);
    }
  };
  const create = async () => {
    try {
      const response = await createProduct().unwrap();
      refetch();
      ToastSuccess(response);
    } catch (error) {
      ToastError(error?.data?.message || error?.message);
      console.log(error);
    }
  };
  return (
    <>
      <section class="createProduct">
        <div class="header">
          <h2 class="heading createProduct__heading">Products</h2>
          <button class="btn-1" onClick={create}>
            <i class="fa-solid fa-circle-plus"></i> create
          </button>
        </div>
        <table class="table" cellspacing="4">
          <tr class="table__row">
            <th className="w-20">ID</th>
            <th className="w-20">NAME</th>
            <th class="">PRICE</th>
            <th class="">CATEGORY</th>
            <th class="">BRAND</th>
            <th class=""></th>
          </tr>
          {isLoading ? (
            <h3>Loading......</h3>
          ) : error ? (
            <h3>{error?.data?.message || error?.error}</h3>
          ) : (
            products.map((product) => (
              <tr class="table__row">
                <td className="w-20">{product._id}</td>
                <td className="w-20">
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                </td>
                <td>{product.price}$</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>
                  <Link
                    to={`/editProduct/${product._id}`}
                    class="fa-solid fa-pen-to-square m-xr-1 icon"
                  ></Link>
                  <i
                    class="fa-solid fa-trash icon"
                    onClick={() => deleteProductById(product._id)}
                  ></i>
                </td>
              </tr>
            ))
          )}
        </table>
      </section>
    </>
  );
};

export default AdminProductsScreen;
