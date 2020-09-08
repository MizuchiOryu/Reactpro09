import React, { Component } from "react";
import { Link } from "react-router-dom";
class NotFound extends Component {
  render() {
    return (
      <div className='container'>
        <div className='home__page'>
          <h1>Route inconnue</h1>
          <p>
            <Link to='/'>Home</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default NotFound;