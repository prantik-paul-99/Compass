const mongoose = require("mongoose");

const connectToMongo = () => {
  mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB Successfully!");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB: ", err);
    });
};

module.exports = connectToMongo;
