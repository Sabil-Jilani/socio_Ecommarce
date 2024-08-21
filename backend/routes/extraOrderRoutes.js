const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const isAdmin = require("../middlewares/isAdmin");
const isLoggedIn = require("../middlewares/isLoggedIn");
const orederModel = require("../model/orederModel");

const express = require("express");
const router = express.Router();
router.route("/").get(
  isLoggedIn,
  asyncErrorHandler(async (req, res) => {
    res.status(200).send(await orederModel.find({ user: req.user._id }));
  })
);
router.route("/delivered/:id").post(
  isAdmin,
  asyncErrorHandler(async (req, res) => {
    const order = await orederModel.findById(req.params.id);
    if (order) {
      if (order.isPayed) {
        await orederModel.findByIdAndUpdate(req.params.id, {
          isDelivered: true,
          deliveredAt: Date.now(),
        });
        res.status(200).json("marked as delivered");
      } else {
        res.status(500).json("unpayed order cann't be marked as delivared");
      }
    } else {
      res.status(404).json("order not found");
    }
  })
);
router.route("/payed/:id").post(
  isAdmin,
  asyncErrorHandler(async (req, res) => {
    const result = await orederModel.findByIdAndUpdate(req.params.id, {
      isPayed: true,
      payedAt: Date.now(),
      paymentResult: {
        id: req.user._id,
        status: "successfull",
        update__time: Date.now(),
        email__address: req.user.username,
      },
    });
    if (result) {
      res.status(200).json("payment updated");
    } else {
      res.status(404).json("error updating");
    }
  })
);
module.exports = router;
