const orederModel = require("../model/orederModel");

module.exports = async (req, res) => {
  console.log("inn");
  const orders = await orederModel.findOne({ user: objectId(req.user._id) });
  res.status(200).send(orders);
};
