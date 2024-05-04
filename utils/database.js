const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://teddyferdian:teddyferdian98@cluster0.3slbumq.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("client =>", client);
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;
