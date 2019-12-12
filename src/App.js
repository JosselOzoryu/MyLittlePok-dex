//CORE IMPORTS
import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

//STYLE IMPORTS
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//COMPONENTS IMPORT
import NavBar from "./components/layouts/NavBar";
import Dashboard from "./components/layouts/Dashboard";
import DexterEntry from "./components/PKM/DexterEntry";

import backgroundImage from "../src/background.png";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App" style={{ background: `url(${backgroundImage})` }}>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/PKM/:pkmIndex" component={DexterEntry} />
              <Dashboard />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
