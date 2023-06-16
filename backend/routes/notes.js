import express from "express";
import fetchUser from "../middleware/fetchUser.js";
import { body, validationResult } from "express-validator";
const router = express.Router();
import Notes from "../models/Notes.js";

//Route1
// Fetch all the notes created by the user using:Get "/api/notes/fetchNotes"  Require Auth ()Login
router.get("/fetchNotes", fetchUser, async (req, res) => {
  try {
    let notes = await Notes.find({ user: req.user.id });

    res.json({ notes });
  } catch (e) {
    res.status(404).json({ e });
  }
});

//Route2
// Add  the notes created by the user using:Post "/api/notes/addNotes"  Require Auth ()Login
router.post(
  "/addNotes",
  [
    body("title", "Pls enter a title").isLength({ min: 1 }),
    body("description", "Pls enter a description").isLength({ min: 1 }),
  ],
  fetchUser,
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ error: errors.array() });
    }
    try {
      let note = await Notes.create({
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        user: req.body.id,
      });

      res.json({ note });
    } catch (error) {
      console.log(error);
      res.status(500).send("Some internal Issues");
    }
  }
);

// Route3
// Update the note created by the user using:Put "/api/notes/updateNote"  Require Auth ()Login

router.put(
  "/updateNotes/:id",

  fetchUser,
  async (req, res) => {
    try {
      const Note = {
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
      };

      //Find the note to be updated and update it.
      const note = await Notes.findById(req.params.id);

      if (!note) {
        return res.status(404).send("Not Found");
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(404).send("Unauthorized");
      }

      let updatednote = await Notes.findByIdAndUpdate(req.params.id, Note, {
        new: true,
      });
      res.send(Note);
    } catch (e) {
      res.send(e);
    }
  }
);

// Route4
// Delete the note created by the user using:Del "/api/notes/deletenote"  Require Auth ()Login

router.delete(
  "/deletenote/:id",

  fetchUser,
  async (req, res) => {
    try {
      //Find the note to be deleted and delte it.
      const note = await Notes.findById(req.params.id);

      if (!note) {
        return res.status(404).send("Not Found");
          }
        // Allow deletion if User owns this note
      if (note.user.toString() !== req.user.id) {
        return res.status(404).send("Unauthorized");
      }

      let updatednote = await Notes.findByIdAndDelete(req.params.id);
      res.send("success Note has been deleted");
    } catch (e) {
      res.send(e);
    }
  }
);

export default router;
