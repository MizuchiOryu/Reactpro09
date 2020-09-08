import React, { Component } from "react";

// CSS

class Input extends Component {
  handleInputChange = (event) => {
    const { value } = event.target;

    // vérification de la syntaxe du mail et de fait que c'est requis
    let isValid = true;
    if (this.props.required) isValid = value !== "";
    if (this.props.check !== null) {
      isValid = isValid && this.props.check(value);
    }
    this.props.handleInputChange({
      value: value,
      valid: isValid,
      name: this.props.name,
    });
  };

  render() {
    return (
      <input
        className='form-control'
        type={this.props.type || "text"}
        name={this.props.name}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.handleInputChange}
      />
    );
  }
}

export default Input;