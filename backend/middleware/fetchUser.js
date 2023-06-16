import jwt from "jsonwebtoken";
import User from "../models/User.js";
const JWT_SECRET = "Khushi is a good girl";

const fetchUser = (req, res, next) => {
  try {
    const authtoken = req.header("auth-token");
    let credentials = jwt.verify(authtoken, JWT_SECRET);
    if (!credentials) {
      return res.status(401).json({ error: "Unauthorised token" });
    }
 
    req.body.id = credentials;
    
    

    next();
  } catch (e) {
    return res.status(401).send("Invalid session");
  }
};

export default fetchUser;
