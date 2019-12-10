//CORE IMPORTS
import React, { Component } from "react";
import axios from "axios";

//COMPONENT IMPORTS
import PKMCard from "./PKMCard";
export default class PKMList extends Component {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon/?limit=500",
    pkm: null
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pkm: res.data["results"] });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.pkm ? (
          <div className="row">
            {this.state.pkm.map(pkm => (
              <PKMCard 
              key={pkm.name}
              name={pkm.name}
              url={pkm.url}
              />
            ))}
          </div>
        ) : (
          <h1> LOADING </h1>
        )}
      </React.Fragment>
    );
  }
}
