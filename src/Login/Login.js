import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VolunteerContext from '../VolunteerContext';
import Nav from '../Nav/Nav';
import "./Login.css";

class Login extends Component {
  static contextType = VolunteerContext;

  state = {
    username: "",
    password: "",
    error: null
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state;
    const { loginUser } = this.context;

    const message = loginUser(username, password);
    if (message) {
      this.setState({
        error: { message }
      });
    }
    else {
      this.props.history.goBack();

      this.setState({
        error: null
      });
    }
  }

  updateField = (fieldName, fieldValue) => {
    this.setState({
      [fieldName]: fieldValue
    });
  }

  render() {
    const { error } = this.state;

    return (
      <div className="Login">
        <Nav />
        <header className="page-title">
          <h1>Login</h1>
        </header>

        <main>
          <section>
            {error && <p className="Login__error">{error.message}</p>}
            <form data-testid="login-form" onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  onChange={(e) => this.updateField("username", e.target.value)}
                  required
                />
              </div>

              <br />

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => this.updateField("password", e.target.value)}
                  required
                />
              </div>

              <button type="submit">Submit</button>
            </form>
          </section>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    goBack: PropTypes.func
  }).isRequired
};

export default Login;