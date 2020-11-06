import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { dummyUsers } from './dummyData';
import VolunteerContext from './VolunteerContext';
import Home from './Home/Home';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import './App.css';

class App extends Component {
  static contextType = VolunteerContext;

  state = {
    currentUser: null,
    users: dummyUsers
  };

  loginUser = (username, password) => {
    const { users } = this.state;

    const user = users.find((elem) => (
      elem.username === username && elem.password === password
    ));

    if (user) {
      this.setState({
        currentUser: user
      });
    }
    else {
      return 'Invalid username and password combination';
    }
  }

  logoutUser = () => {
    this.setState({
      currentUser: null
    });
  }

  signUpUser = (email, username, password) => {
    const { users } = this.state;

    const id = users.length;
    users.push({
      id,
      email,
      username,
      password
    });

    this.setState({
      users
    });

    this.loginUser(username, password);

    return id;
  }

  render() {
    const { currentUser, users } = this.state;
    const contextValue = {
      user: currentUser,
      users,
      loginUser: this.loginUser,
      logoutUser: this.logoutUser,
      signUpUser: this.signUpUser
    };

    return (
      <VolunteerContext.Provider value={contextValue}>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </div>
      </VolunteerContext.Provider>
    );
  }
}

export default App;
