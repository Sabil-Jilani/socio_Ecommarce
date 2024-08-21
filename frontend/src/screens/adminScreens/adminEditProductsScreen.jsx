import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadImageMutation,
} from "../../api_slices/productApiSlice";
import { ToastError, ToastSuccess } from "../../component/Toast";
const AdminEditProductsScreen = () => {
  const navigate = useNavigate();
  const [updateProduct] = useUpdateProductMutation();
  const [sendImage] = useUploadImageMutation();
  const { id } = useParams();
  const { data, refetch } = useGetProductByIdQuery(id);
  const [Product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    brand: "",
    countOfStock: "",
    category: "",
    description: "",
    offerPrice: "",
    image: "",
  });
  useEffect(() => {
    data &&
      setProduct({
        id: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        brand: data.brand,
        countOfStock: data.countOfStock,
        category: data.category,
        description: data.description,
        offerPrice: data.offerPrice || "",
      });
  }, [data]);
  const uploadHandler = async (ev) => {
    try {
      const formData = new FormData();
      formData.append("image", ev.target.files[0]);
      const response = await sendImage(formData).unwrap();
      console.log(response);
      ToastSuccess(response.message);
      setProduct((pre) => ({
        ...pre,
        image: `${response.image}`,
      }));
    } catch (error) {
      ToastError(error?.data?.message || error?.message);
    }
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setProduct((pre) => ({ ...pre, [name]: value }));
  };
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await updateProduct(Product).unwrap();
      ToastSuccess(response);
      refetch();
    } catch (error) {
      console.log(error);
      ToastError("error updating");
    }
  };
  return (
    <section class="editProduct">
      <div class="editProduct__header">
        <button class="btn-back" onClick={() => navigate(-1)}>
          Go Back
        </button>
        <h2 class="heading">Edit Product</h2>
      </div>
      <form class="form" onSubmit={onSubmit}>
        <div class="form__group">
          <input
            type="text"
            name="name"
            onChange={onChange}
            value={Product.name}
            id="name"
            class="form__input"
            placeholder="Names"
            required
          />
          <label for="name" class="form__label">
            Name
          </label>
        </div>
        <div class="form__group">
          <input
            type="text"
            name="price"
            onChange={onChange}
            value={Product.price}
            id="price"
            class="form__input"
            placeholder="Price"
            required
          />
          <label for="price" class="form__label">
            Price
          </label>
        </div>
        <div class="form__group">
          <input
            type="text"
            name="offerPrice"
            onChange={onChange}
            value={Product.offerPrice}
            id="offerPrice"
            class="form__input"
            placeholder="Offer Price"
          />
          <label for="OfferPrice" class="form__label">
            Offer Price
          </label>
        </div>
        <div class="form__group">
          <input
            type="file"
            name="image"
            id="image"
            onChange={uploadHandler}
            accept="image/png, image/jpeg"
            label="choose only image"
            class="form__input"
            placeholder="Image"
          />
        </div>
        <div class="form__group">
          <input
            type="text"
            name="brand"
            id="brand"
            onChange={onChange}
            value={Product.brand}
            class="form__input"
            placeholder="Brand"
            required
          />
          <label for="brand" class="form__label">
            Brand
          </label>
        </div>
        <div class="form__group">
          <input
            type="text"
            name="countOfStock"
            onChange={onChange}
            value={Product.countOfStock}
            id="stock"
            class="form__input"
            placeholder="stock in count"
            required
          />
          <label for="stock" class="form__label">
            stock in count
          </label>
        </div>
        <div class="form__group">
          <input
            type="text"
            name="category"
            onChange={onChange}
            value={Product.category}
            id="category"
            class="form__input"
            placeholder="category"
            required
          />
          <label for="category" class="form__label">
            category
          </label>
        </div>
        <div class="form__group">
          <input
            type="text"
            name="description"
            onChange={onChange}
            value={Product.description}
            id="description"
            class="form__input"
            placeholder="Description"
            required
          />
          <label for="" class="form__label">
            Description
          </label>
        </div>
        <div class="form__group">
          <button type="submit" class="btn-1 m-yt" onSubmit={onSubmit}>
            Update
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminEditProductsScreen;
