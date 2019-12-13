import React, { Component } from "react";
import { yellow } from "ansi-colors";
import PKMStats from "./PKMStats";

const colorType = {
  bug: "#b1c12e",
  dark: "#4f3a2d",
  dragon: "#755edf",
  electric: yellow,
  fairy: "#f4b1f4",
  fire: "#e73b0c",
  flying: "#a3b3f7",
  ghost: "#6060b2",
  grass: "#74c236",
  ground: "#d3b357",
  ice: "#a3e7fd",
  normal: "#c8c4bc",
  poison: "#934594",
  psychic: "#ed4882",
  rock: "#b9a156",
  steel: "#b5b5c3",
  water: "#3295f6"
};

const toCapital = s => {
  s = s || "";
  return s.charAt(0).toUpperCase() + s.substring(1);
};

export default class DexterEntry extends Component {
  render() {
    const { pkmIndex, imageUrl, name, stats } = this.state;
    return (
        <div className="col">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-5">
                  <h5>{!pkmIndex ? " " : pkmIndex}</h5>
                </div>
                <div className="col-7">
                  <div className="float-right">
                    {this.state.types.map(type => (
                      <span
                        key={type}
                        className="badge badge-primary badge-pill mr-1"
                        style={{
                          backgroundColor: `#${colorType[type]}`,
                          color: "white"
                        }}
                      >
                        {type
                          .toLowerCase()
                          .split(" ")
                          .map(toCapital)
                          .join(" ")}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <img src={imageUrl} className="card-img-top mx-auto mt-2" />
                  </div>
                  <div className="col-md-9">
                    <h4 className="mx-auto">
                      {name
                        .toLowerCase()
                        .split(" ")
                        .map(toCapital)
                        .join(" ")}
                    </h4>
                    <div className="row align-items-center">
                      <div className="col-12 col-md-3">HP</div>
                      <div className="col-12 col-md-9">
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressBar"
                            style={{ width: `${stats.hp}` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
