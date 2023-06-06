const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
  });
};

exports.postSignup = (req, res, next) => {};

exports.postLogin = (req, res, next) => {
  User.findById("645e2f81324f9b6f30ed36f6")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        if (err) {
          console.log("there has been an error saving the session: ", err);
        }
        res.redirect("/");
      });
    })
    .catch((err) =>
      console.log("there has been an error setting session: ", err)
    );
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("error clearing session: ", err);
    }
    res.redirect("/");
  });
};
