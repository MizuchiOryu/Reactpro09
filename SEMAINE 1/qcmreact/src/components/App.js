import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Qcm from "./Qcm";
import Genre from "./Genre";
import Nav from "./Nav";
import NotFound from "./NotFound";
import PropTypes from "prop-types";

const url = process.env.PUBLIC_URL + "/data";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { genres: [], loading: false };
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetch(`${url}/qcm.json`).then((response) => {
      if (response.ok) {
        // objet JSON avec une promesse
        response.json().then((content) => {
          let genres = content["genres"];
          // met à jour le render
          this.setState({
            genres: genres,
            loading: false,
          });
        });
      }
    });
  }

  render() {
    return (
      <>
        <Router>
          <Nav genres={this.state.genres} loading={this.state.loading} />
          <Route exact path='/' component={Home} />
          <Route exact path='/qcm' component={Qcm} />
          <Route
            exact
            path='/genre/:id'
            render={({ match }) =>
              /^[1-9][0-9]{0,1}$/.test(match.params.id) ? (
                <Genre id={parseInt(match.params.id)} />
              ) : (
                <NotFound />
              )
            }
          />
        </Router>
      </>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default App;
