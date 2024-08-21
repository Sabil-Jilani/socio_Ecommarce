const passportLocalMongoose = require("passport-local-mongoose");

const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    hash: String,
    isvarified: { type: Boolean, required: true, default: false },
    isAdmin: { type: Boolean, required: true, default: false },
    googleId: String,
    githubId: String,
    facebookId: String,
  },
  { timestamps: true }
);
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.mongoose.model("UserDB", UserSchema);
