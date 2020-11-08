import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { dummyUsers, dummyOrgs, dummyEvents, dummyCauses, dummyTags } from './dummyData';
import VolunteerContext from './VolunteerContext';
import Home from './Home/Home';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import User from './User/User';
import Organization from './Organization/Organization';
import Event from './Event/Event';
import './App.css';

class App extends Component {
  static contextType = VolunteerContext;

  state = {
    user: null,
    users: dummyUsers,
    orgs: dummyOrgs,
    events: dummyEvents,
    causes: dummyCauses,
    tags: dummyTags
  };

  loginUser = (username, password) => {
    const { users } = this.state;

    const user = users.find((elem) => (
      elem.username === username && elem.password === password
    ));

    if (user) {
      window.localStorage.setItem('userId', user.id);
      this.setState({
        user
      });
    }
    else {
      return 'Invalid username and password combination';
    }
  }

  logoutUser = () => {
    window.localStorage.removeItem('userId');
    this.setState({
      user: null
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

  componentDidMount() {
    const storedId = window.localStorage.getItem('userId');
    if (storedId) {
      const { users } = this.state;
      const user = users.find((elem) => elem.id === parseInt(storedId));
      this.setState({
        user
      });
    }
  }

  render() {
    const { user, users, orgs, events, causes, tags } = this.state;
    const contextValue = {
      user,
      users,
      orgs,
      events,
      causes,
      tags,
      loginUser: this.loginUser,
      logoutUser: this.logoutUser,
      signUpUser: this.signUpUser
    };

    return (
      <VolunteerContext.Provider value={contextValue}>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/login" render={({ history }) => (
            !user ? <Login history={history} /> : <Redirect to="/user" />
          )} />
          <Route path="/signup" component={SignUp} />
          <Route path="/user" render={() => user ? <User /> : <Redirect to="/login" />} />
          <Route path="/org/:id" component={Organization} />
          <Route path="/event/:id" component={Event} />
        </div>
      </VolunteerContext.Provider>
    );
  }
}

export default App;
