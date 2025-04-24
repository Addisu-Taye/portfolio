import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Tailwind CSS should be imported here
import HomePage from "./App"; // or wherever your component is

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
);
