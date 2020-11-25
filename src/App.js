import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { dummyOrgs, dummyCauses } from './dummyData';
import VolunteerContext from './VolunteerContext';
import Home from './Home/Home';
import Organization from './Organization/Organization';
import OrgSearch from './OrgSearch/OrgSearch';
import AddOrg from './AddOrg/AddOrg';
import './App.css';

class App extends Component {
  static contextType = VolunteerContext;

  state = {
    orgs: dummyOrgs,
    causes: dummyCauses
  };

  addOrg = (name, website, phone, email, address, description, causes) => {
    const { orgs } = this.state;
    const id = orgs.length + 1;
    const org = {
      id,
      name,
      website: website || 'Not Available',
      phone: phone || 'Not Available',
      email: email || 'Not Available',
      address: address || 'Not Available',
      description,
      causes
    };

    this.setState({
      orgs: [...orgs, org]
    });

    return id;
  }

  render() {
    const { orgs, causes } = this.state;
    const contextValue = {
      orgs,
      causes,
      addOrg: this.addOrg
    };

    return (
      <VolunteerContext.Provider value={contextValue}>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/org/:id" component={Organization} />
          <Route path="/org-search" render={() => <OrgSearch pageLimit={10} />} />
          <Route path="/add-org" component={AddOrg} />
        </div>
      </VolunteerContext.Provider>
    );
  }
}

export default App;
