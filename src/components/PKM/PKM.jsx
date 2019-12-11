import React, { Component } from "react";
import axios from "axios";
import { yellow } from "ansi-colors";

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
export default class PKM extends Component {
  state = {
    name: "",
    pkmIndex: "",
    imageUrl: "",
    types: [],
    description: "",
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      specialAttack: "",
      specialDefense: ""
    },
    height: "",
    weight: "",
    genderRatioMale: "",
    genderRatioFemale: ""
  };

  async componentDidMount() {
    const { pkmIndex } = this.props.match.params;

    // Urls for PKM data
    const pkmUrl = `https://pokeapi.co/api/v2/pokemon/${pkmIndex}`;
    const pkmSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pkmIndex}`;

    //Get PKM data
    const pkmRes = await axios.get(pkmUrl);
    const name = pkmRes.data.name;
    const imageUrl = pkmRes.data.sprites.front_default;
    let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

    pkmRes.data.stats.map(stat => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          attack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
        case "specia-attack":
          specialAttack = stat["base_stat"];
          break;
        case "special-defense":
          specialDefense = stat["base_stat"];
          break;
      }
    });

    const height = Math.round((pkmRes.data.height + 0.0001) * 100) / 100;
    const weight = Math.round((pkmRes.data.weight + 0.0001) * 100) / 100;
    const types = pkmRes.data.types.map(type => type.type.name);

    await axios.get(pkmSpeciesUrl).then(res => {
      let description = "";
      res.data.flavor_text_entries.some(flavor => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
          return;
        }
      });

      const femaleRate = res.data["gender_rate"];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5*(8 - femaleRate);
      const catchRate = Math.round((100 / 255) * res.data["capture_rate"]);

      this.setState({
        description,
        genderRatioFemale,
        genderRatioMale,
        catchRate
      });
    });

    this.setState({
      imageUrl,
      pkmIndex,
      name,
      types,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense
      },
      height,
      weight
    });
  }

  render() {
    return (
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                <h5>{this.state.pkmIndex}</h5>
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
                  <img
                    src={this.state.imageUrl}
                    className="card-img-top mx-auto mt-2"
                  />
                </div>
                <div className="col-md-9">
                  <h4 className="mx-auto">
                    {this.state.name
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
                          style={{ width: `${this.state.stats.hp}` }}
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
