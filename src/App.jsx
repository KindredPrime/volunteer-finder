import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { fetchApiJson } from './util';
import VolunteerContext from './VolunteerContext';
import Nav from './Nav';
import Home from './Home';
import Organization from './Organization';
import OrgSearch from './OrgSearch';
import AddOrg from './AddOrg';
import './App.css';

class App extends Component {
  static contextType = VolunteerContext;

  state = {
    orgs: [],
    causes: [],
    hasNavExpanded: false,
    error: null,

    // Is the app fetching data from the API?
    isFetching: false
  };

  componentDidMount() {
    this.setState({
      isFetching: true
    });

    return fetchApiJson('/api/orgs')
      .then((orgs) => this.setState({ orgs }))
      .then(() => fetchApiJson(`/api/causes`))
      .then((causes) => this.setState({
          causes,
          error: null,
          isFetching: false
        }))
      .catch((error) => this.setState({
        error,
        isFetching: false
      }));
  }

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

  // Toggle the expanded nav bar (mobile screens only)
  expandCollapseNav = () => {
    const { hasNavExpanded } = this.state;

    this.setState({
      hasNavExpanded: !hasNavExpanded
    });
  };

  render() {
    const { orgs, causes, hasNavExpanded, error, isFetching } = this.state;
    const contextValue = {
      orgs,
      causes,
      addOrg: this.addOrg,
      deleteOrg: this.deleteOrg,
      appError: error,
      isFetching
    };

    return (
      <VolunteerContext.Provider value={contextValue}>
        <div className={hasNavExpanded
          ? "App expanded"
          : "App"}
        >
          <Nav expanded={hasNavExpanded} handleExpander={this.expandCollapseNav} />
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
