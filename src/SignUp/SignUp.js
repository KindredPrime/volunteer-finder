// This component is being excluded from the client until the API is built
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import VolunteerContext from '../VolunteerContext';
import Nav from '../Nav/Nav';
import ValidationError from '../ValidationError/ValidationError';
import './SignUp.css';

class SignUp extends Component {
  static contextType = VolunteerContext;

  state = {
    userEmail: {
      value: '',
      touched: false
    },
    username: {
      value: '',
      touched: false
    },
    password: {
      value: '',
      touched: false
    },
    confirmPassword: {
      value: '',
      touched: false
    },
    error: null
  };

  updateField = (fieldName, fieldValue) => {
    this.setState({
      [fieldName]: {
        value: fieldValue,
        touched: true
      }
    });
  };

  validateRequiredField = (fieldName) => {
    const field = this.state[fieldName];
    const fieldValue = field.value.trim();
    if (fieldValue.length === 0) {
      return `${_.capitalize(fieldName)} is required`;
    }
  };

  validateConfirmPassword = () => {
    const { password, confirmPassword } = this.state;
    if (confirmPassword.value !== password.value) {
      return `Passwords don't match`;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Implement this after the API is built
    /*
    const { userEmail, username, password } = this.state;
    const { signUpUser } = this.context;
    
    signUpUser(userEmail.value, username.value, password.value);
    this.props.history.push(`/account`);
    */
  };

  render() {
    const { confirmPassword, error } = this.state;

    return (
      <div className="SignUp">
        <Nav />
        <header>
          <h1>Sign Up</h1>
        </header>

        <main>
          {error && <p className="SignUp__error">{error.message}</p>}
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="user-email">Email</label>
              <input
                type="email"
                id="user-email"
                onChange={(e) => this.updateField("userEmail", e.target.value, this)}
                required
              />
            </div>

            <br />


            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                onChange={(e) => this.updateField("username", e.target.value, this)}
                required
              />
            </div>

            <br />

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => this.updateField("password", e.target.value, this)}
                required
              />
            </div>

            <br />

            <div>
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                onChange={(e) => this.updateField("confirmPassword", e.target.value, this)}
                required
              />
            </div>
            {confirmPassword.touched && <ValidationError message={this.validateConfirmPassword()} />}

            <button 
              type="submit"
              disabled={
                this.validateRequiredField('userEmail')
                || this.validateRequiredField('username')
                || this.validateRequiredField('password')
                || this.validateConfirmPassword()
              }
            >
              Sign Up
            </button>
          </form>
        </main>
      </div>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default SignUp;
