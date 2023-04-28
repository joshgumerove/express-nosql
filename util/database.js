const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect("mongodb://localhost:27017/mydatabase")
    .then((client) => {
      console.log("connected to mongo");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log("error connecting to mongo: ", err);
      throw err;
    });
};

module.exports = mongoConnect;
