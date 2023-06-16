import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import NoteState from "./context/NoteState.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AboutPage from "./pages/AboutPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element:<NoteState> <App></App></NoteState>,
  },
  {
    path: "/about",
    element: (
      <NoteState>
        <AboutPage></AboutPage>
      </NoteState>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
