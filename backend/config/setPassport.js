const passport = require("passport");
const UserModel = require("../model/userModel");
module.exports = () => {
  passport.use(UserModel.createStrategy());
  passport.serializeUser(UserModel.serializeUser());
  passport.deserializeUser(UserModel.deserializeUser());
};
