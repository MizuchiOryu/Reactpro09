import React, { Component } from "react";
import PropTypes from "prop-types";

// CSS
import "./Question.scss";

class Question extends Component {
  constructor(props) {
    super(props);

    this.state = { ...this.props };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const success = this.state.choice === (this.props.response || null);

    this.setState({
      success: success,
      status: "closed",
    });
  };

  handleInputChange = (e) => {
    const choice = e.target.value;
    if (choice != null) {
      this.setState({
        choice: choice,
      });
    }
  };

  // remettre à jour les states une fois une question sélectionnée
  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.setState({ ...this.props });
    }
  }

  render() {
    const { title, badge, question, c1, c2, commandes } = this.props;

    const Choices = [c1, c2].map((choice, k) => {
      return (
        <div key={k} className='form-check'>
          <input
            name='choice'
            value={`c${k + 1}`}
            onChange={this.handleInputChange}
            className='form-check-input'
            type='radio'
            checked={this.state.choice === `c${k + 1}`}
            id={`c${k + 1}`}
          />
          <label htmlFor={`c${k + 1}`} className='form-check-label'>
            choice: {k + 1} {choice}
          </label>
        </div>
      );
    });

    const error =
      this.state.status === "closed" ||
      this.state.success ||
      this.state.choice === null;

    return (
      <article className='question'>
        <h1 className='question__title'>
          {title}
          <small>{badge}</small>
        </h1>
        <p>{question}</p>
        {commandes != null ? <code>{commandes}</code> : null}
        <p className='notice'>
          Choisissez une seule et bonne réponse ci-dessous, attention vous
          n'avez qu'une tentative pour répondre :
        </p>
        {this.state.success ? (
          <p className='alert-success'>Bravo vous avez bien répondu</p>
        ) : this.state.success === false && this.state.status === "closed" ? (
          <p className='alert-check'>
            Désolé la bonne réponse était : {this.props.response}
          </p>
        ) : null}
        <div className='form-group'>
          <form onSubmit={this.handleSubmit}>
            {Choices}
            <button disabled={error} type='submit' className='btn btn-primary'>
              Response
            </button>
          </form>
        </div>
      </article>
    );
  }
}

Question.propTypes = {
  id: function (props, propName, componentName) {
    if (!/[1-9][0-9]*/.test(props[propName])) {
      return new Error(
        "Invalid prop `" +
          propName +
          "` supplied to" +
          " `" +
          componentName +
          "`. Validation failed, not a number..."
      );
    }
  },
  title: PropTypes.string.isRequired,
  badge: PropTypes.oneOf(["easy", "hard", "medium"]),
  command: PropTypes.string,
  c1: PropTypes.string,
  c2: PropTypes.string,
  response: PropTypes.string,
  status: PropTypes.PropTypes.oneOf(["open", "closed"]),
  success: PropTypes.bool,
};

export default Question;