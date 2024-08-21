const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const registerController = require("../controllers/registerController");
const logInController = require("../controllers/logInController");
const userModel = require("../model/userModel");
const TokenModel = require("../model/token");
const forgetPass = require("../controllers/forgetPass");
const checkUser = require("../controllers/checkUserController.js");
const changePassController = require("../controllers/changePassController.js");
router.route("/register").post(asyncErrorHandler(registerController));
router.route("/logIn").post(asyncErrorHandler(logInController));
router.route("/forgetPass").post(asyncErrorHandler(forgetPass));
router.route("/checkUser").post(asyncErrorHandler(checkUser));
router.route("/changePass").post(asyncErrorHandler(changePassController));

router.route("/varify").post(
  asyncErrorHandler(async (req, res) => {
    const { userId, token } = req.body;
    const isToken = await TokenModel.findOne({ user: userId, token: token });
    if (isToken) {
      await TokenModel.findOneAndDelete({ user: userId });
      await userModel.findOneAndUpdate({ _id: userId }, { isvarified: true });
      res.status(200).json("varified successfully");
    } else {
      res.status(404).json("invalid link");
    }
  })
);

router.route("/").get(
  isAdmin,
  asyncErrorHandler(async (req, res) => {
    const users = await userModel.find();
    res.status(200).send(users);
  })
);

router.route("/delete/:id").delete(
  isAdmin,
  asyncErrorHandler(async (req, res) => {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (user) {
      res.status(200).json("deleted successfully");
    } else {
      res.status(404).json(" user not found");
    }
  })
);

router.route("/admin/:id").post(
  isAdmin,
  asyncErrorHandler(async (req, res, next) => {
    const user = await userModel.findById(req.params.id);
    if (user) {
      if (user.isAdmin) {
        await userModel.findOneAndUpdate(
          { _id: req.params.id },
          { isAdmin: false }
        );
      } else {
        if (!user.isvarified)
          return next(new Error("must be varified to be admin"));
        await userModel.findOneAndUpdate(
          { _id: req.params.id },
          { isAdmin: true }
        );
      }
      res.status(200).json("updated successfully");
    } else {
      res.status(404).json(" user not found");
    }
  })
);
router.route("/autoLogin").get(
  isLoggedIn,
  asyncErrorHandler(async (req, res) => {
    res.status(200);
  })
);
router.route("/logout").get((req, res) => {
  req.logout(() => {
    res.send({ message: "logged out successfully" });
  });
});

router.route("/userEdit").post(
  asyncErrorHandler(async (req, res, next) => {
    const { name, username, oldPassword, newPassword } = req.body;
    if (oldPassword) {
      const response = await userModel.findOneAndUpdate(
        { _id: req.user._id },
        { name, username }
      );

      response.changePassword(oldPassword, newPassword, (err) => {
        if (err) next(err);
      });
    } else {
      await userModel.findOneAndUpdate(
        { _id: req.user._id },
        { name, username }
      );
    }
    const user = await userModel.findById(req.user._id);
    res.status(200).json(user);
  })
);
module.exports = router;
