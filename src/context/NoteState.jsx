import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const state = {
    a: "Khsuhi",
    b: "Sanghvi",
  };
  const [changeText, setChangeText] = useState(state);
  let newState = {
    a: "Romil",
    b: "Sanghvi",
  };

  const update = () => {
    setTimeout(() => {
      setChangeText(newState);
    }, 1000);
  };

  return (
    <NoteContext.Provider value={{ changeText, update }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
