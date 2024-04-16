const mongoose = require("mongoose");
const connectionDB = () => {
  mongoose
    .connect("mongodb://0.0.0.0/book")
    .then((result) => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports =connectionDB;
