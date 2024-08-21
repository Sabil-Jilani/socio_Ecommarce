const TokenModel = require("../model/token");
module.exports = async (req, res) => {
  const { userId, token } = req.body;
  const isToken = await TokenModel.findOne({ user: userId, token: token });
  console.log("inn");
  if (isToken) {
    await TokenModel.findOneAndDelete({ user: userId });
    res.status(200).json("user varified");
  } else {
    res.status(404).send({ message: "invalid link" });
  }
};
