//CORE IMPORTS
import React, { Component } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

//COMPONENT IMPORTS
import loadingGIF from "../PKM/loading.gif";

const PKMsprite = styled.img`
  width: 5em;
  heigth: 5em;
  display: none;
`;

const Card = styled.div`
  box-shadow: 0 1px 3px rgb(0, 0, 0, 1), 0 1px 2px rgb(0, 0, 0, 1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

const StyledLink = styled(Link)`
  color: black,
text-decoration: none,
&:focus,
&:hover,
&:visited,
&:link,
&:active {
    text-decoration: none;
  }
`;
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

  handleOnLoad = () => this.setState({ imageIsLoading: false });
  handleOnError = () => this.setState({ excesiveReq: true });

  render() {
    const {
      pkmIndex,
      imageIsLoading,
      excesiveReq,
      imageUrl,
      name
    } = this.state;

    return (
      <div className="col-md-2 col-sm-6 mb-5">
        <StyledLink to={`PKM/${this.state.pkmIndex}`}>
          <Card className="card">
            <h5 className="card-header">{pkmIndex}</h5>

            {imageIsLoading && (
              <image
                src={loadingGIF}
                style={{ width: "5em", height: "5em" }}
                className="card-img-top mx-auto d-block mt-2"
              ></image>
            )}

            <PKMsprite
              className="card-img-top mx-auto mt-2"
              onLoad={this.handleOnLoad}
              onError={this.handleOnError}
              src={imageUrl}
              style={
                excesiveReq
                  ? { display: "none" }
                  : excesiveReq
                  ? null
                  : { display: "block" }
              }
            />
            {excesiveReq && (
              <h6 className="mx-auto">
                <span className="badge badge-danger mt-2">
                  Excesive Requests
                </span>
              </h6>
            )}
            <div class="card-body mx-auto">
              <h6 className="card-title">
                {name
                  .toLocaleLowerCase()
                  .split(" ")
                  .map(
                    letter =>
                      letter.charAt(0).toUpperCase() + letter.substring(1)
                  )
                  .join(" ")}
              </h6>
            </div>
          </Card>
        </StyledLink>
      </div>
    );
  }
}
