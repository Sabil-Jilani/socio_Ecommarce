const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    user: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserDB",
    },
    profilePic: { type: String, required: true, default: "annonymous.webp" },
    text: { type: String, required: true },
    likes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "UserDB", Required: true },
    ],
    comments: [
      {
        date: { type: Date, default: Date.now() },
        user: { type: mongoose.Types.ObjectId, ref: "UserDB", required: true },
        text: String,
        profilePic: {
          type: String,
          required: true,
          default: "annonymous.webp",
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("PostDB", postSchema);
