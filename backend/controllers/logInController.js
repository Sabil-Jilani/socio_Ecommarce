const passport = require("passport");
const UserModel = require("../model/userModel");
const findUser = require("./findUser");

module.exports = async (req, res, next) => {
  const { username, password } = req.body;
  const user = new UserModel({
    username: username,
    password: password,
  });
  req.login(user, (err) => {
    if (err) {
      next(new Error(err));
    } else {
      passport.authenticate("local", {
        failureRedirect: "/unauthorise",
        failureMessage: true,
      })(req, res, () => {
        findUser(user.username, res);
      });
    }
  });
};
