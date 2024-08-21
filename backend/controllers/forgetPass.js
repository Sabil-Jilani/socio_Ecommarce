const sendMail = require("../middlewares/sendMail");
const userModel = require("../model/userModel");
const TokenModel = require("../model/token");
const crypto = require("crypto");

module.exports = async (req, res) => {
  const user = await userModel.findOne({ username: req.body.username });
  if (user) {
    const token = new TokenModel({
      user: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    await token.save();
    let link = `${process.env.FRONTEND_BASEURL}/${user._id}/forget/${token.token}`;
    sendMail(user.username, "forget password", link);
    res.status(200).json("link sent");
  } else {
    res.status(404).send({ message: "no user is registered" });
  }
};
