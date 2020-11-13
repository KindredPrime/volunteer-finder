import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { dummyUsers, dummyOrgs, dummyCauses, dummyTags } from './dummyData';
import VolunteerContext from './VolunteerContext';
import Home from './Home/Home';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Account from './Account/Account';
import Organization from './Organization/Organization';
import PublicUser from './PublicUser/PublicUser';
import OrgSearch from './OrgSearch/OrgSearch';
import AddOrg from './AddOrg/AddOrg';
import './App.css';

class App extends Component {
  static contextType = VolunteerContext;

  state = {
    user: null,
    users: dummyUsers,
    orgs: dummyOrgs,
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

    const id = users.length + 1;
    users.push({
      id,
      email,
      username,
      password,
      orgsAdded: []
    });

    this.setState({
      users
    });

    this.loginUser(username, password);

    return id;
  }

  addOrg = (name, website, phone, email, address, causes, tags) => {
    const { user, users, orgs } = this.state;
    const id = orgs.length + 1;
    const org = {
      id,
      name,
      website: website || 'Not Available',
      phone: phone || 'Not Available',
      email: email || 'Not Available',
      address: address || 'Not Available',
      causes,
      tags
    };

    const newUser = {
      ...user,
      orgsAdded: [...user.orgsAdded, org.name]
    };
    const newUsers = users.map((elem) => {
      if (elem.id === user.id) {
        return newUser
      }

      return elem;
    });
    this.setState({
      user: newUser,
      users: newUsers,
      orgs: [...orgs, org]
    });

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
    const { user, users, orgs, causes, tags } = this.state;
    const contextValue = {
      user,
      users,
      orgs,
      causes,
      tags,
      loginUser: this.loginUser,
      logoutUser: this.logoutUser,
      signUpUser: this.signUpUser,
      addOrg: this.addOrg
    };

    return (
      <VolunteerContext.Provider value={contextValue}>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/login" render={({ history }) => (
            !user ? <Login history={history} /> : <Redirect to="/account" />
          )} />
          <Route path="/signup" component={SignUp} />
          <Route path="/account" render={() => user ? <Account /> : <Redirect to="/login" />} />
          <Route path="/org/:id" component={Organization} />
          <Route path="/user/:id" component={PublicUser} />
          <Route path="/org-search" render={() => <OrgSearch pageLimit={10} />} />
          <Route path="/add-org" render={({ history }) => (
            window.localStorage.getItem('userId') ? <AddOrg history={history}/> : <Redirect to="/login" />
          )} />
        </div>
      </VolunteerContext.Provider>
    );
  }
}

export default App;
