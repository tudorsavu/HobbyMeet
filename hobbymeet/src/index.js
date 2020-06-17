import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router } from "react-router-dom";
import LoginComponent from "./login/login";
import SignupComponent from "./signup/signup";
import DashboardComponent from "./dashboard/dashboard";

const firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");
require("firebase/storage")

firebase.initializeApp({
  apiKey: "AIzaSyDTtqaE5nfsfSt3orkoJtRcevEluRe2l5Q",
  authDomain: "hobbymeet-c39a5.firebaseapp.com",
  databaseURL: "https://hobbymeet-c39a5.firebaseio.com",
  projectId: "hobbymeet-c39a5",
  storageBucket: "hobbymeet-c39a5.appspot.com",
  messagingSenderId: "516809106380",
  appId: "1:516809106380:web:ce2834723a53e187543369",
  measurementId: "G-1E1Y24YK81",
});

const routing = (
  <Router>
    <div id="routing-container">
      <Route path="/" exact component={DashboardComponent}></Route>
      <Route path="/login" component={LoginComponent}></Route>
      <Route path="/signup" component={SignupComponent}></Route>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

serviceWorker.unregister();
