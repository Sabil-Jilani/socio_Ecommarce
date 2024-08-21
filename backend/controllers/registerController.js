const passport = require("passport");
const UserModel = require("../model/userModel");
const findUser = require("./findUser");

module.exports = async (req, res, next) => {
  const { name, username, password } = req.body;
  UserModel.register(
    { name: name, username: username },
    password,
    (error, user) => {
      if (error) {
        const err = new Error(error);
        next(err);
      } else {
        passport.authenticate("local")(req, res, () => {
          findUser(user.username, res);
        });
      }
    }
  );
};
