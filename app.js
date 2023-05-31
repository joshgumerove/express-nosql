const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoose = require("mongoose");
const session = require("express-session");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret", //should be long string in production
    resave: false, // improves performance
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  User.findById("645e2f81324f9b6f30ed36f6")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://jgumerove1:pizzapizza@cluster0.t0lxwuo.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(3005);
    console.log("listening on port 3005");
  })
  .catch((err) => console.log("error connecting to mongoose: ", err));
