import React, { Component } from "react";
import { Link } from "react-router-dom";

// CSS
import "./Nav.scss";

class Nav extends Component {
  render() {
    const genresLinks = this.props.genres.map((genre) => (
      <Link className='btn' to={`/genre/${genre.id}`} key={genre.id}>
        QCM {genre.name}
      </Link>
    ));
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='navbar-brand' href='#'>
          QCM JS React Angular
        </div>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <Link className='btn' to='/'>
            Home
          </Link>
          <Link className='btn' to='/qcm'>
            QCM démo
          </Link>
          {this.props.loading ? <p>Loading...</p> : genresLinks}
          <Link className='btn' to='/auth'>
            Login
          </Link>
        </div>
      </nav>
    );
  }
}

export default Nav;