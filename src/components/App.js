import React from "react";
import ReactDOM from "react-dom";
// import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./Nav";
import Home from "./Home";
import Battle from "./Battle";
import PopularRepos from "./PopularRepos";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/popular-repos" component={PopularRepos} />
            <Route render={() => "NOTFOUND"} />
          </Switch>
        </div>
      </Router>
    );
  }
}
