import React from "react";
import { createRoot } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import App from "./App.js";
// import "./styles.scss";

const appRouting = (
  <Router>
    <Routes>
      <Route exact path="/" element={<App />} />
    </Routes>
  </Router>
);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(appRouting);