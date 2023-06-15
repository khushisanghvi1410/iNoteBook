import express from "express";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

const router = express.Router();

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
      user =User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
        .then((user) => {
          res.json(user);
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

export default router;
