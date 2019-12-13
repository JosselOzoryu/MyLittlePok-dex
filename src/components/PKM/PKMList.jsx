//CORE IMPORTS
import React, { Component } from "react";
import axios from "axios";

//COMPONENT IMPORTS
import PKMCard from "./PKMCard";
export default class PKMList extends Component {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon/?limit=151",
    pkm: null
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pkm: res.data["results"] });
  }

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        {this.state.pkm ? (
          <div className="row">
            {this.state.pkm.map((pkmDetail, index) => {
              let pokeKey = `${index}-${pkmDetail.name}`;
              return (
                <PKMCard
                  key={pokeKey}
                  name={pkmDetail.name}
                  url={pkmDetail.url}
                />
              );
            })}
          </div>
        ) : (
          <h1> LOADING </h1>
        )}
      </React.Fragment>
    );
  }
}
