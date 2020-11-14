import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { dummyUsers, dummyOrgs, dummyCauses, dummyTags } from './dummyData';
import VolunteerContext from './VolunteerContext';
import { setUserId } from './storageManager';
import Home from './Home/Home';
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
    user: dummyUsers[setUserId(1) - 1],
    users: dummyUsers,
    orgs: dummyOrgs,
    causes: dummyCauses,
    tags: dummyTags
  };

  /*
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
  */

  addOrg = (name, website, phone, email, address, causes, tags, creator) => {
    const { orgs } = this.state;
    const id = orgs.length + 1;
    const org = {
      id,
      name,
      website: website || 'Not Available',
      phone: phone || 'Not Available',
      email: email || 'Not Available',
      address: address || 'Not Available',
      causes,
      tags,
      creator
    };

    this.setState({
      orgs: [...orgs, org]
    });

    return id;
  }

  render() {
    const { user, users, orgs, causes, tags } = this.state;
    const contextValue = {
      user,
      users,
      orgs,
      causes,
      tags,
      //loginUser: this.loginUser,
      //logoutUser: this.logoutUser,
      //signUpUser: this.signUpUser,
      addOrg: this.addOrg
    };

    return (
      <VolunteerContext.Provider value={contextValue}>
        <div className="App">
          {/* 
            login-related components and checks have been temporarily removed/replaced until
            after the API is completed
          */}
          <Route exact path="/" component={Home} />
          {/*<Route path="/login" render={({ history }) => (
            !user ? <Login history={history} /> : <Redirect to="/account" />
          )} />*/}
          <Route path="/signup" component={SignUp} />
          {/*<Route path="/account" render={() => user ? <Account /> : <Redirect to="/login" />} />*/}
          <Route path="/account" component={Account} />
          <Route path="/org/:id" component={Organization} />
          <Route path="/user/:id" component={PublicUser} />
          <Route path="/org-search" render={() => <OrgSearch pageLimit={10} />} />
          {/*<Route path="/add-org" render={({ history }) => (
            user ? <AddOrg history={history}/> : <Redirect to="/login" />
          )} />*/}
          <Route path="/add-org" component={AddOrg} />
        </div>
      </VolunteerContext.Provider>
    );
  }
}

export default App;
