import React, { Component } from "react";
//import styled from "styled-components";

// const NavBarStyle = style.nav``;

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0 align-item-center">
            POKÉDEX
          </a>
        </nav>
      </div>
    );
  }
}
