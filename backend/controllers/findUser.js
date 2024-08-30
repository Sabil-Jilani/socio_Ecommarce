const sendMail = require("../middlewares/sendMail");
const UserModel = require("../model/userModel");
const TokenModel = require("../model/token");
const crypto = require("crypto");

module.exports = async (username, res) => {
  const user = await UserModel.findOne({ username: username });
  let message;
  if (!user.isvarified) {
    const token = await TokenModel.findOne({ user: user._id });
    if (token) {
      let link = `${process.env.FRONTEND_BASEURL}user/${user._id}/token/${token.token}`;
      sendMail(user.username, "varification link", link);
      message =
        "varification link has been sent to your mail.please varify account";
    } else {
      const token = new TokenModel({
        user: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
      await token.save();
      let link = `${process.env.FRONTEND_BASEURL}/user/${user._id}/token/${token.token}`;
      sendMail(user.username, "varification link", link);
      message =
        "varification link has been sent to your mail.please varify account";
    }
  }
  res.send({ message, user });
};
