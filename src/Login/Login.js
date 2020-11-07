import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VolunteerContext from '../VolunteerContext';
import Nav from '../Nav/Nav';
import { updateField } from '../util';
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
      this.props.history.push('/user');

      this.setState({
        error: null
      });
    }
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
                  onChange={(e) => updateField("username", e.target.value, this)}
                  required
                />
              </div>

              <br />

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => updateField("password", e.target.value, this)}
                  required
                />
              </div>

              <button type="submit">Login</button>
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