import conn from "./db.js";
import express from "express";
import router from "./routes/user.js";
import router2   from "./routes/notes.js";
const app = express();
const PORT = 8000;

conn();

app.listen(PORT, () => {
  console.log("Server Started");
});
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/auth", router);
app.use("/api/notes", router2);
