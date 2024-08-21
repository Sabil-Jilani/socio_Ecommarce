const express = require("express");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const postModel = require("../model/postModel");
const ProfileModel = require("../model/profileMiodel");
const isLoggedIn = require("../middlewares/isLoggedIn");
const profileMiodel = require("../model/profileMiodel");
const router = express.Router();

router
  .route("/")
  .get(
    asyncErrorHandler(async (req, res) => {
      res
        .status(200)
        .send(
          await postModel
            .find()
            .populate("user", "name username")
            .populate("comments.user")
            .sort({ createdAt: -1 })
        );
    })
  )
  .post(
    isLoggedIn,
    asyncErrorHandler(async (req, res) => {
      const userProfile = await ProfileModel.findOne({ user: req.user._id });

      const post = new postModel({
        user: req.user._id,
        likes: [],
        comments: [],
        text: req.body.text,
        profilePic: userProfile ? userProfile.profilePic : "annonymous.webp",
      });
      await post.save();

      res.status(200).send({ message: "post added" });
    })
  );
router.route("/like/:id").get(
  isLoggedIn,
  asyncErrorHandler(async (req, res) => {
    const post = await postModel.findById(req.params.id);
    if (post) {
      if (post.likes.includes(req.user._id)) {
        post.likes.pop(req.user._id);
        await post.save();
        res.status(200).json("like removed");
      } else {
        post.likes.push(req.user._id);
        await post.save();
        res.status(200).json("like added");
      }
    } else {
      throw new Error("post not found");
    }
  })
);
router.route("/delete/:id").get(
  isLoggedIn,
  asyncErrorHandler(async (req, res) => {
    const response = await postModel.findOneAndDelete({ _id: req.params.id });
    console.log(response, req.params.id, req.user);
    res.status(200).json("post deleted");
  })
);
router.route("/comment/:id").post(
  isLoggedIn,
  asyncErrorHandler(async (req, res) => {
    const post = await postModel.findById(req.params.id);
    const profile = await profileMiodel.findOne({ user: req.user._id });
    if (post) {
      post.comments.unshift({
        profilePic: profile ? profile.profilePic : "annonymous.webp",
        text: req.body.text,
        user: req.user._id,
      });
      await post.save();
      res.status(200).json("comment added");
    } else {
      throw new Error("no post found");
    }
  })
);

router.route("/delete/comment").post(
  isLoggedIn,
  asyncErrorHandler(async (req, res) => {
    const post = await postModel.findById(req.body.postId);
    if (post) {
      post.comments = post.comments.filter((x) => x.id !== req.body.commentId);
      await post.save();
      res.json("comment deleted");
    } else {
      res.status(404).json("post not found");
    }
  })
);
module.exports = router;
