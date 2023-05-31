exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get("Cookie");

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true; HttpOnly"); // NOTE: the name 'Set-Cookie' is a reserved header value
  // NOTE: loggedIn=true creates key of loggedIn and value of true
  // can see in Application/storage/cookies
  res.redirect("/");
}; // NOTE: form action = /post will be handled by this route
