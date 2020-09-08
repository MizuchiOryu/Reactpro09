import React, { Component } from "react";
import Qcm from "./Qcm";

class Genre extends Component {
  render() {
    return (
      <>
        <Qcm genre={this.props.id} />
      </>
    );
  }
}

export default Genre;