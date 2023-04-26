const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect("mongodb://localhost:27017/mydatabase")
    .then((client) => {
      console.log("connected to mongo");
      callback(client);
    })
    .catch((err) => console.log("error connecting to mongo: ", err));
};

module.exports = mongoConnect;
