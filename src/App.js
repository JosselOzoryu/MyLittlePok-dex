import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import NavBar from "./components/layouts/NavBar";
import Dashboard from "./components/layouts/Dashboard";
import backgroundImage from "../src/background.png"
class App extends Component {
  render() {
    return (
      <div className="App" style={{background: `url(${backgroundImage})`}}>
        <NavBar />
        <div class="container"><Dashboard></Dashboard></div>
      </div>
    );
  }
}

export default App;
