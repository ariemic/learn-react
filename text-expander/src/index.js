import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App
      collapsedNumWords={20}
      expandButtonText="Show text"
      collapseButtonText="Collapse text"
      buttonColor="#ff6622"
      expanded={true}
      className="box"
    />
  </React.StrictMode>
);
