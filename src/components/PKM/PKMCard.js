import React, { Component } from "react";
import styled from "styled-components";

const PKMsprite = styled.img`
  width: 5em;
  heigth: 5em;
`;

export default class PKMCard extends Component {
  state = {
    pkmIndex: "",
    name: "",
    image: "",
    imageIsLoading: true,
    excesiveReq: false,
  };

  componentDidMount() {
    const { name, url } = this.props;
    const pkmIndex = url.split("/")[url.split("/").length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pkmIndex}.png?raw=true`;

    this.setState({ name, imageUrl, pkmIndex });
  }

  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <div className="card">
          <h5 className="card-header">{this.state.pkmIndex}</h5>
          <PKMsprite
            className="card-img-top mx-auto mt-2"
            onLoad={() => this.setState({imageIsLoading: false})}
            onError={() => this.setState({excesiveReq: true})}
            src={this.state.imageUrl}
          />
          {this.state.excesiveReq ? (): null}
          <div class="card-body mx-auto">
            <h6 className="card-title">
              {this.state.name
                .toLocaleLowerCase()
                .split(" ")
                .map(
                  letter => letter.charAt(0).toUpperCase() + letter.substring(1)
                )
                .join(" ")}
            </h6>
          </div>
        </div>
      </div>
    );
  }
}
