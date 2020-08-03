import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from "./components/Login";
import Profile from "./components/Profile";
import Admin from "./components/Admin";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3333";

ReactDOM.render(
  <React.StrictMode>
      <Router>
       <Switch>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

