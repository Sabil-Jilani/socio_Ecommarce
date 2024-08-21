const express = require("express");
const moment = require("moment");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const OrderModel = require("../model/orederModel");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");

const paymetgateway = require("../controllers/paymetgateway");

const router = express.Router();

router
  .route("/")
  .post(
    isLoggedIn,
    asyncErrorHandler(async (req, res) => {
      const {
        cartItems,
        shippingAddress,
        method,
        price,
        shippingPrice,
        taxPrice,
        totalPrice,
      } = req.body;

      const newOrder = new OrderModel({
        user: req.user._id,
        orderItems: cartItems.map((x) => {
          x.product = x._id;
          x._id = null;
          return x;
        }),
        shippingAddress: shippingAddress,
        method: method,
        price: price,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      });
      const response = await newOrder.save();
      res.send(response);
    })
  )
  .get(
    isAdmin,
    asyncErrorHandler(async (req, res) => {
      const orders = await OrderModel.find();
      res.status(200).send(orders);
    })
  );
router.route("/:id").get(
  isLoggedIn,
  asyncErrorHandler(async (req, res) => {
    const order = await OrderModel.findById(req.params.id)
      .populate("user", "name username")
      .populate("orderItems.product");

    res.send(order);
  })
);
router.route("/pay/:id").get(isLoggedIn, asyncErrorHandler(paymetgateway));

router.post(
  "/:status/:id",
  asyncErrorHandler(async (req, res) => {
    const date = moment();
    const formattedDate = date.format("MMMM DD, YYYY");

    const { status, id } = req.params;
    if (status === "success") {
      const result = await OrderModel.findById(id);

      (result.isPayed = true),
        (result.payedAt = formattedDate),
        (result.paymentResult = {
          id: req.user._id,
          status: "success",
          update__time: formattedDate,
          email__address: req.user.username,
        });
      await result.save();
    }
    res.redirect(`http://localhost:3000/order/${status}/${id}`);
  })
);
router.route("/delete/:id").delete(
  isAdmin,
  asyncErrorHandler(async (req, res) => {
    await OrderModel.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted successfully");
  })
);

module.exports = router;
