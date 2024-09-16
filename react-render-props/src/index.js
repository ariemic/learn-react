import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CompoundComponent from "./CompoundComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <CompoundComponent />
  </React.StrictMode>
);
