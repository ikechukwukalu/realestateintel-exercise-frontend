import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NoMatch from "./helpers/no-match.js";

import Header from "./includes/header.jsx";

import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";

class Components extends Component {
  loggedIn = () => {
    if (localStorage.getItem('credentials')) {
      return true
    }

    return false;
  }

  render() {
    return (
      <Fragment>
      <Route path="/" render={(props) => this.loggedIn() ? <Header {...props} /> : <Header />} />
        <main className="py-4">
          <div className="container">
            <Switch>
              <Route exact path="/" render={(props) => this.loggedIn() ? <Redirect to="/home" /> : <Login {...props} />} />
              <Route exact path="/home" render={(props) => this.loggedIn() ? <Home {...props} /> : <Redirect to="/" />} />
              <Route render={(props) => <NoMatch />} />
            </Switch>
          </div>
        </main>
      </Fragment>
    );
  }
}

export default Components;
