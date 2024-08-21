const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const profileModel = require("../model/profileMiodel");
const PostModel = require("../model/postModel");
const isLoggedIn = require("../middlewares/isLoggedIn");
const express = require("express");
const profileMiodel = require("../model/profileMiodel");
const router = express.Router();

router.route("/").get(
  asyncErrorHandler(async (req, res) => {
    const profiles = await profileModel.find().populate("user");
    res.status(200).send(profiles);
  })
);
router.route("/:id").get(
  asyncErrorHandler(async (req, res) => {
    const isProfile = await profileMiodel.findOne({ user: req.params.id });

    const profile = isProfile
      ? await profileMiodel.findOne({ user: req.params.id }).populate("user")
      : null;

    const isPosts = await PostModel.find({ user: req.params.id }).populate(
      "user",
      "username name"
    );

    const posts = isPosts ? isPosts : [];

    res.status(200).send({ profile, posts });
  })
);
router.route("delete/:id").post(
  asyncErrorHandler(async (req, res) => {
    const profile = await profileMiodel.findOneAndDelete({
      user: req.params.id,
    });

    if (profile) {
      res.status(200).json("profile deleted");
    } else {
      res.status(404).json("error occured");
    }
  })
);
router.route("/edit").post(
  isLoggedIn,
  asyncErrorHandler(async (req, res) => {
    const profile = await profileMiodel.findOne({ user: req.body.user });

    if (profile) {
      const update = { social: {} };
      update.location = req.body.location;
      update.bio = req.body.bio;
      update.profilePic = req.body.profilePic || "annonymous.webp";
      if (req.body.products)
        update.products = req.body.products ? req.body.products : [];
      if (req.body.facebook) update.social.facebook = req.body.facebook;
      if (req.body.linkedIn) update.social.linkedIn = req.body.linkedIn;
      if (req.body.youtube) update.social.youtube = req.body.youtube;
      if (req.body.instagram) update.social.instagram = req.body.instagram;
      if (req.body.twitter) update.social.twitter = req.body.twitter;
      await profileMiodel.findOneAndUpdate({ user: req.body.user }, update);
      res.status(200).json("successfully updated");
    } else {
      const record = {
        user: req.user.id,
        location: req.body.location,
        bio: req.body.bio,
        profilePic: req.body.profilePic || "annonymous.webp",
        social: {},
      };
      if (req.body.products)
        record.products = req.body.products ? req.body.products : [];
      if (req.body.facebook) record.social.facebook = req.body.facebook;
      if (req.body.linkedIn) record.social.linkedIn = req.body.linkedIn;
      if (req.body.instagram) record.social.instagram = req.body.instagram;
      if (req.body.twitter) record.social.twitter = req.body.twitter;
      const data = new profileMiodel(record);
      await data.save();
      res.status(200).json("successfully created");
    }
  })
);
module.exports = router;
