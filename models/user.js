const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    db.collection("users")
      .insertOne(this)
      .then((result) => console.log("user was created"))
      .catch((err) => console.log("error creating a user: ", err));
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then((user) => {
        console.log("here is the user: ", user);
        return user;
      })
      .catch((err) =>
        console.log("there was an error getting the user: ", err)
      );
  }
}

module.exports = User;
