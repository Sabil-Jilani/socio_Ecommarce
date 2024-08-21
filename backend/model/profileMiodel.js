const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserDB",
      required: true,
    },
    location: { type: String, require: true },
    profilePic: { type: String, require: true },
    products: [String],
    website: String,
    bio: { type: String, require: true },
    social: {
      facebook: String,
      linkedIn: String,
      youtube: String,
      twitter: String,
      instagram: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ProfileDB", profileSchema);
