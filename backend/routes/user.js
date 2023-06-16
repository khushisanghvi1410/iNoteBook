import express from "express";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt, { verify } from "jsonwebtoken";
import fetchUser from "../middleware/fetchUser.js";
const JWT_SECRET = "Khushi is a good girl";
const router = express.Router();

// Route1
// Create a user using:Post "/api/auth/createuser" Doesnt require Auth ()Login

router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 6 }),
    body("name", "Enter a valid Name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const JWT_SECRET = "Khushi loves Ajit";
    //if there are errors return bad request and the error.
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = User(req.body);

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    try {
      let ussser = await User.findOne({ email: req.body.email });

      if (ussser) {
        return res.status(500).send("Email already exist");
      }

      console.log(secPass);
      user = User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
        .then((user) => {
          const data = {
            user: {
              id: user.id,
            },
          };
          const authToken = jwt.sign(data, JWT_SECRET);
          // console.log(jwtData);
          res.json({ authToken: authToken });
        })
        .catch((err) => {
          console.log("IS this executed?");
          res.json({
            error: "Something else error",
            MoreError: err.message,
          });
        });
    } catch (e) {
      console.log(e);
      res.status(500).send("Some internal error occured"); //Generally comes in Logs.
    }
  }
);

// Route2
// Authenticate a user using:Post "/api/auth/login" Doesnt require Auth ()Login

router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Enter a Valid password").isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(404).json({ e });
    }

    try {
      let login = await User.findOne({ email: req.body.email });
      if (!login) {
        return res.status(404).send("Please signUp and come");
      }
      let comparedPassword = bcrypt.compare(req.body.password, login.password);
      if (!comparedPassword) {
        return res.status.send("Invalid credentials");
      }

      const authtoken = jwt.sign(login.id, JWT_SECRET);
      return res.json({ authtoken });
    } catch (e) {
      console.log(e);
      res.status(500).send("Some internal error occured");
    }
  }
);

// Router 3
// Get User Data using:Get "/api/auth/getUser"  Require Auth ()Login   Require Auth token

router.get("/getUser", fetchUser, async (req, res) => {

  try {
    let user=await User.findById(req.body.id);
    res.json({user});
    
  } catch (error) {
    res.status(400).send("Invalid")
  }

});

export default router;
