import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { API_ENDPOINT } from './config';
import { fetchJson } from './util';
import VolunteerContext from './VolunteerContext';
import Home from './Home/Home';
import Organization from './Organization/Organization';
import OrgSearch from './OrgSearch/OrgSearch';
import AddOrg from './AddOrg/AddOrg';
import './App.css';

class App extends Component {
  static contextType = VolunteerContext;

  state = {
    orgs: [],
    causes: []
  };

  addOrg = (org) => {
    const { orgs } = this.state;

    this.setState({
      orgs: [...orgs, {
        id: org.id,
        org_name: org.org_name,
        website: org.website || 'Not Available',
        phone: org.phone || 'Not Available',
        email: org.email || 'Not Available',
        org_address: org.org_address || 'Not Available',
        org_desc: org.org_desc,
        causes: org.causes
      }]
    });
  };

  deleteOrg = (id) => {
    const { orgs } = this.state;

    const newOrgs = orgs.filter((org) => org.id !== id);

    this.setState({
      orgs: newOrgs
    });
  };

  componentDidMount() {
    return fetchJson(`${API_ENDPOINT}/api/orgs`)
      .then((orgs) => this.setState({ orgs }))
      .then(() => fetchJson(`${API_ENDPOINT}/api/causes`))
      .then((causes) => this.setState({ causes }));
  }

  render() {
    const { orgs, causes } = this.state;
    const contextValue = {
      orgs,
      causes,
      addOrg: this.addOrg,
      deleteOrg: this.deleteOrg
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
