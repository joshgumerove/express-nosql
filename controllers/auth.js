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

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect("/signup");
      }

      const user = new User({
        email: email,
        password: password,
        cart: { items: [] },
      });

      return user.save();
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => console.log("error with signup: ", err));
};

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
