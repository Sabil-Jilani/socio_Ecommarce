const mongoose = require("mongoose");
const TokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "UserDB" },
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    required: true,
    expire: 3600,
    default: Date.now(),
  },
});
module.exports = mongoose.model("TokenDB", TokenSchema);
