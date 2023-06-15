import mongoose from "mongoose";

const MONGO_URI = "mongodb://127.0.0.1:27017/inotebook";
const conn =  () => {
   mongoose
    .connect(MONGO_URI)
    .then(()=>{
      console.log("DB connected")
    })
    .catch((e) => {
      console.log(e);
    });
};

export default conn;
