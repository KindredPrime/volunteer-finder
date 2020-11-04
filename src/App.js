import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { dummyUsers } from './dummyData';
import VolunteerContext from './VolunteerContext';
import Home from './Home/Home';
import Login from './Login/Login';
import "./App.css";

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
      return "Invalid username and password combination";
    }
  }

  logoutUser = () => {
    this.setState({
      currentUser: null
    });
  }

  render() {
    const { currentUser, users } = this.state;
    const contextValue = {
      user: currentUser,
      users,
      loginUser: this.loginUser,
      logoutUser: this.logoutUser
    };

    return (
      <VolunteerContext.Provider value={contextValue}>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </div>
      </VolunteerContext.Provider>
    );
  }
}

export default App;
