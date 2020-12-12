import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router } from "react-router-dom";
import LoginComponent from "./login/login";
import SignupComponent from "./signup/signup";
import DashboardComponent from "./dashboard/dashboard";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

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

const theme = createMuiTheme({
  palette: {
     primary: {
        main: "#005ce6" 
               },
     secondary: {
        main: "#cccccc" 
                }
           }
});

const Footer = () => (
  <footer className="footer"/>
);


const routing = (
  <ThemeProvider theme={theme} key="1">
  <Router>
    <div id="routing-container" className="content">
      <Route path="/" exact component={DashboardComponent}></Route>
      <Route path="/login" component={LoginComponent}></Route>
      <Route path="/signup" component={SignupComponent}></Route>
    </div>
  </Router>
  </ThemeProvider>
);

ReactDOM.render([routing, <Footer key="2" />], document.getElementById("root"));

serviceWorker.unregister();
