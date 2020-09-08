import React, { Component } from "react";
import Input from "../Forms/Input";
import { firebase as fb } from "../Config";
import { verifEmail, verifPassword } from "../utils/check";

const initialState = {
  email: {
    value: "",
    valid: false,
  },
  password: {
    value: "",
    valid: false,
  },
  registered: false,
  message: "",
  messageClass: "primary",
};
const controls = {
  email: {
    name: "email",
    type: "email",
    placeholder: "Email...",
    required: true,
    check: verifEmail,
  },
  password: {
    name: "password",
    type: "password",
    placeholder: "Password...",
    required: true,
    check: verifPassword,
  },
};

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  componentDidMount() {
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ registered: true });
      }
    });
  }

  handleLogout = () => {
    fb.auth()
      .signOut()
      .then(() => {
        this.setState({
          registered: false,
          message: "Vous êtes maintenant déconnecté.",
          messageClass: "primary",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleInputChange = (data) => {
    const name = data.name;
    this.setState({
      [name]: {
        value: data.value,
        valid: data.valid,
      },
    });
  };

  handleSubmit = (e) => {
    // pour l'instant on empêche l'envoi de requête vers le serveur
    e.preventDefault();

    const email = this.state.email.value;
    const password = this.state.password.value;
    console.log(email, "email", password, "password");

    // vérification du couple login/password
    fb.auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        this.setState({
          registered: true,
          message: "Vous êtes maintenant connecté",
          messageClass: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          registered: false,
          message: "Identifiants incorrects",
          messageClass: "danger",
        });
      });
  };
  render() {
    const isValid = this.state.email.valid && this.state.password.valid;
    const authForm = (
      <form onSubmit={this.handleSubmit}>
        <h1>Identifiez-vous</h1>
        <div className='form-group'>
          <label htmlFor='email'>Email address</label>
          <Input
            {...this.state.email}
            {...controls.email}
            handleInputChange={this.handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <Input
            {...this.state.password}
            {...controls.password}
            handleInputChange={this.handleInputChange}
          />
        </div>
        <button
          disabled={isValid === false}
          type='submit'
          className='btn btn-primary'
        >
          Se connecter
        </button>
      </form>
    );
    return (
      <div className='container'>
        {this.state.message !== "" && (
          <div className={`alert alert-${this.state.messageClass}`}>
            {this.state.message}
          </div>
        )}
        {this.state.registered ? (
          <button className='btn btn-warning' onClick={this.handleLogout}>
            Logout
          </button>
        ) : (
          authForm
        )}
      </div>
    );
  }
}

export default Auth;