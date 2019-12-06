//CORE IMPORTS
import React, { Component } from "react";
import styled from "styled-components";

//COMPONENT IMPORTS
import loadingGIF from "../PKM/loading.gif";

const PKMsprite = styled.img`
  width: 5em;
  heigth: 5em;
  display: none;
`;

const Card = styled.div`
box-shadow: 0 1px 3px rgb(0,0,0,1), 0 1px 2px rgb(0,0,0,1);
`
export default class PKMCard extends Component {
  state = {
    pkmIndex: "",
    name: "",
    image: "",
    imageIsLoading: true,
    excesiveReq: false
  };

  componentDidMount() {
    const { name, url } = this.props;
    const pkmIndex = url.split("/")[url.split("/").length - 2];
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkmIndex}.png`;
    this.setState({ name, imageUrl, pkmIndex });
  }

  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <Card className="card">
          <h5 className="card-header">{this.state.pkmIndex}</h5>
          {this.state.imageIsLoading ? (
            <image
              src={loadingGIF}
              style={{ width: "5em", height: "5em" }}
              className="card-img-top mx-auto d-block mt-2"
            ></image>
          ) : null}
          <PKMsprite
            className="card-img-top mx-auto mt-2"
            onLoad={() => this.setState({ imageIsLoading: false })}
            onError={() => this.setState({ excesiveReq: true })}
            src={this.state.imageUrl}
            style={
              this.state.excesiveReq
                ? { display: "none" }
                : this.state.excesiveReq
                ? null
                : { display: "block" }
            }
          />
          {this.state.excesiveReq ? (
            <h6 className="mx-auto">
              <span className="badge badge-danger mt-2">Excesive Requests</span>
            </h6>
          ) : null}
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
        </Card>
      </div>
    );
  }
}
