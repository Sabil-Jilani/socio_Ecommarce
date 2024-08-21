const express = require("express");
const ProductModel = require("../model/productModel");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const router = express.Router();
const isAdmin = require("../middlewares/isAdmin");
const isLoggedIn = require("../middlewares/isLoggedIn");
const Admin = require("../controllers/productAdminController");
const getOrderController = require("../controllers/getOrderController");
const upload = require("../middlewares/uploadImg");

router.route("/").get(
  asyncErrorHandler(async (req, res) => {
    const products = await ProductModel.find().sort({ updatedAt: -1 });
    res.send(products);
  })
);

router.route("/:id").get(
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    res.send(product);
  })
);

router.route("/addReview/:id").post(
  isLoggedIn,
  asyncErrorHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const { id } = req.params;
    const document = await ProductModel.findById(id);

    if (document.reviews.find((x) => x.name === req.user.name)) {
      throw new Error("allowed to comment once");
    }

    document.reviews.unshift({
      name: req.user.name,
      rating: rating,
      comment: comment,
      user: req.user._id,
    });

    document.numReviews++;
    document.rating = Number(document.rating) + Number(rating);

    await document.save();
    res.status(200).json("review submitted");
  })
);

router.route("/deleteReview/:id").delete(
  isLoggedIn,
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    const review = product.reviews.find((x) => x.user == req.user.id);

    product.reviews = product.reviews.filter((x) => x.user != req.user.id);
    product.numReviews--;
    product.rating = Number(product.rating) - Number(review.rating);
    await product.save();
    res.status(200).json("review deleted");
  })
);

//?admin product routes
router
  .route("/upload")
  .post(
    isLoggedIn,
    upload.single("image"),
    asyncErrorHandler(Admin.uploadImage)
  );
router
  .route("/createProduct")
  .post(isAdmin, asyncErrorHandler(Admin.addProducts));
router
  .route("/updateProduct/:id")
  .post(isAdmin, asyncErrorHandler(Admin.updateProduct));

router
  .route("/deleteProduct/:id")
  .delete(isAdmin, asyncErrorHandler(Admin.deleteProduct));
module.exports = router;
