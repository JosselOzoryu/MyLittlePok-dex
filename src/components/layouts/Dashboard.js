import React, { Component } from "react";

import PKMList from "../PKM/PKMList";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <PKMList />
        </div>
      </div>
    );
  }
}
