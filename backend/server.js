//base requirements
const express = require("express");
const app = express();
const Mail = require("./middlewares/sendMail");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
const setPassport = require("./config/setPassport");
const DB = require("./config/db-connection");
const UserModel = require("./model/userModel");
// controlers.......

const Auth = require("./routes/auth");
const ProductRoutes = require("./routes/productRoutes");
const extraOrderRoutes = require("./routes/extraOrderRoutes");
const profileRoutes = require("./routes/profileRoutes");
const orderRoutes = require("./routes/orderRoutes");
const postRoutes = require("./routes/postRoutes");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const asyncErrorHandler = require("./middlewares/asyncErrorHandler");
const { none } = require("./middlewares/uploadImg");

const corsOptions = {
  origin: [process.env.FRONTEND_BASEURL, "http://localhost:3000"],
  credentials: true,
  "access-control-allow-credentials": true,
  " Access-Control-Allow-Origin": true,
  optionSuccessStatus: 200,
};
const port = process.env.PORT || 8000;

//app-use
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SSSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
setPassport();
DB();

// routes
app.use("/auth", Auth);
app.use("/products", ProductRoutes);

app.use("/order", orderRoutes);
app.use("/profile", profileRoutes);
app.use("/posts", postRoutes);
app.use("/extraOrder", extraOrderRoutes);

app.get("/isloggedIn", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.redirect("/unauthorise");
  }
});
app.get("/unauthorise", (req, res, next) => {
  const err = new Error("unthorised");
  next(err);
});

//!  serving statci files on img route
app.use("/img", express.static(path.join(`${path.resolve()}`, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(`${path.resolve()}`, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(`${path.resolve()}`, "/frontend/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("welcome to backend");
  });
}
app.use(errorHandler);
app.use(notFound);
app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
