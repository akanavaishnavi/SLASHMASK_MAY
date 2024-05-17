import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { initialstate, reducer } from "../src/components/Reducer";
import StateProvider from "./components/StateProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StateProvider reducer={reducer} initialState={initialstate}>
    <App />
  </StateProvider>
);
