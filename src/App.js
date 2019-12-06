import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import NavBar from "./components/layouts/NavBar";
import Dashboard from "./components/layouts/Dashboard";
class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <div class="container"><Dashboard></Dashboard></div>
      </div>
    );
  }
}

export default App;
