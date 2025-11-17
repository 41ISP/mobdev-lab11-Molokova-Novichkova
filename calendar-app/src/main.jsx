import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./pages/MainPage";
import "./index.css";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MainPage />
  </BrowserRouter>
);