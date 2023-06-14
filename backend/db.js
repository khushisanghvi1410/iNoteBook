import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017";
const conn = () => {
  mongoose
    .connect(MONGO_URI)
    .then(console.log("Connected to MongoDb"))
    .catch((e) => {
      console.log(e);
    });
};

export default conn;
