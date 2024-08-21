const path = require("path");
const ProductModel = require("../model/productModel");
const fs = require("fs");
module.exports.addProducts = async (req, res) => {
  const document = new ProductModel({
    name: "sample name",
    image: "sample.jpg",
    brand: "sample brand",
    category: "sample",
    description: "sample description",

    user: req.user._id,
  });
  await document.save();
  res.status(200).json("product created successfully");
};
module.exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    image,
    brand,
    category,
    description,
    price,
    countOfStock,
    offerPrice,
  } = req.body;
  const document = await ProductModel.findById(id);

  if (document) {
    if (name) document.name = name;

    if (
      image &&
      image !== document.image &&
      document.image !== "sample.jpg" &&
      document.image !== "annonymous.webp"
    ) {
      // File path to delete
      const filePath = "./uploads/" + document.image;

      // Delete the files
      fs.unlink(filePath, (err) => {
        console.log(err);
      });
    }
    if (image) document.image = image;
    if (brand) document.brand = brand;
    if (category) document.category = category;
    if (description) document.description = description;
    document.offerPrice = offerPrice ? offerPrice : null;
    if (price) document.price = price;
    if (countOfStock) document.countOfStock = countOfStock;

    await document.save();
    res.status(200).json("updated successfully");
  } else {
    res.status(404).json("product not found");
  }
};
module.exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  const deleteProduct = await ProductModel.findByIdAndDelete(id);
  if (!deleteProduct) {
    const err = new Error("product not deleted");
    next(err);
  } else {
    res.status(200).json("product deleted");
  }
};

module.exports.uploadImage = async (req, res) => {
  res.send({
    message: "image uploaded",
    image: `${req.file.filename}`,
  });
};
