import React from "react";
import "./index.css";
import Router from "./router/router";
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);