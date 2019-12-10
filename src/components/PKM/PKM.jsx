import React, { Component } from "react";
import axios from "axios";

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
    const imageUrl = pkmRes.data.sprites.font_default;
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
    const 


  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
}
