import React, { Component } from "react";
import axios from "axios";

export default class PKMstats extends Component {
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

    //TODO Service layer
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
      const genderRatioMale = 12.5 * (8 - femaleRate);
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
}
