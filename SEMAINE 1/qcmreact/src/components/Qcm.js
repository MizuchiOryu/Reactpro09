import React, { Component } from "react";
import Question from "./Question";
import Title from "./Title";
import PropTypes from "prop-types";

const url = process.env.PUBLIC_URL + "/data";

class Qcm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      question: null,
      isQuestion: false,
    };
  }

  getQcm(genre_id = null) {
    fetch(`${url}/qcm.json`).then((response) => {
      if (response.ok) {
        // objet JSON avec une promesse
        response.json().then((content) => {
          let qcm = content["qcm"];
          if (genre_id != null) {
            qcm = qcm.filter((question) => question.genre_id === genre_id);
          }
          // met à jour le render
          this.setState({
            questions: qcm,
          });
        });
      }
    });
  }

  // se lance qu'une fois après que le Component
  // soient montés dans le DOM
  componentDidMount() {
    this.getQcm(this.props.genre);
  }

  // se lance à chaque fois que les props changent
  componentDidUpdate(prevProps) {
    if (prevProps.genre !== this.props.genre) {
      this.getQcm(this.props.genre);
    }
  }

  onSelected = (id) => {
    // récupérer la question dans le tableau questions dans le state
    // [0] pour avoir la question dans un objet JSON.
    const question = this.state.questions.filter((q) => q.id === id)[0];

    this.setState({
      question: question,
      isQuestion: true, // d'afficher la question dans le colonne de droite
    });
  };

  render() {
    const titles = this.state.questions.map((qcm, i) => (
      <Title
        onSelected={this.onSelected}
        key={i}
        title={qcm.title}
        badge={qcm.badge}
        id={parseInt(qcm.id)}
      />
    ));

    return (
      <div className='container'>
        {this.props.genre != null && <p>Genre: {this.props.genre}</p>}
        <div className='row'>
          <div className='col-md-4'>{titles}</div>
          <div className='col-md-8'>
            {this.state.isQuestion ? (
              <Question {...this.state.question} />
            ) : (
              <p>{"Aucune question sélectionnée"}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Qcm.propTypes = {
  genre: PropTypes.number,
};

export default Qcm;