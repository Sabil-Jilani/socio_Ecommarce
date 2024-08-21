const userModel = require("../model/userModel");
module.exports = async (req, res, next) => {
  const { userId, credential } = req.body;
  const user = await userModel.findById(userId);
  if (user && credential.password === credential.confirmPassword) {
    user.setPassword(credential.password, function (err) {
      if (err) {
        // Handle error
        next(new Error(err));
      } else {
        user.isvarified = true;
        // Password has been set successfully
        user.save(); // Save the user object
        res.status(200).json("password updated");
      }
    });
  } else {
    res.status(404).send({ message: "passwords didn't match" });
  }
};
