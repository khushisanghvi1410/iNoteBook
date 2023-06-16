import React, { useState } from "react";
import NoteContext from "./NoteContext";

let Allnotes=[
  {
    "_id": {
      "$oid": "648c5cca73379acb7b406b89"
    },
    "user": {
      "$oid": "648afcbe4f95ed985c040412"
    },
    "title": "I can do it",
    "description": "This is Khushi Sanghvi",
    "tag": "General",
    "date": {
      "$date": "2023-06-16T12:59:54.825Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "648c5cdf73379acb7b406b8b"
    },
    "user": {
      "$oid": "648afcbe4f95ed985c040412"
    },
    "title": "I can do it",
    "description": "This is ROmil Sanghvi",
    "tag": "General",
    "date": {
      "$date": "2023-06-16T13:00:15.054Z"
    },
    "__v": 0
  }
]

const NoteState = (props) => {
 const [notes,setNote]=useState(Allnotes)

  return (
    <NoteContext.Provider value={{ notes, setNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
