module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(req.isAuthenticated());
    next();
  } else {
    console.log(req.isAuthenticated(), req.user);
    res.redirect("/unauthorise");
  }
};
