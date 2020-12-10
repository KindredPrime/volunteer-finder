import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VolunteerContext from '../VolunteerContext';
import { fetchApi } from '../util';
import './Organization.css';

class Organization extends Component {
  static contextType = VolunteerContext;

  state = {
    orgError: null
  };

  handleDelete(orgId) {
    const { deleteOrg } = this.context;

    return fetchApi(`/api/orgs/${orgId}`, {
      method: 'DELETE'
    })
      .then(() => {
        deleteOrg(parseInt(orgId));
        this.props.history.push('/org-search');
      })
      .catch((orgError) => {
        this.setState({
          orgError
        });
      });
  }

  render() {
    const orgId = this.props.match.params.id;
    const { orgs, appError, fetching } = this.context;

    /*
      If the app is waiting for the API to respond with data, only display the fetching message
    */
    if (fetching) {
      return (
        <main className="Organization">
          <p className="fetching">Fetching data from the API...</p>
        </main>
      )
    }

    /*
      If there's an error across the app, only display content for that error
    */
    if (appError) {
      return (
        <main className="Organization">
          <p className="error">
            An error occurred while fetching organizations and causes: {appError.message}. Try refreshing the page.
          </p>
        </main>
      );
    }

    const org = orgs.find((elem) => elem.id === parseInt(orgId));

    const { orgError } = this.state;
    const renderedError = orgError && <p className="error">{orgError.message}</p>;

    if (org) {
      const { org_name, website, phone, email, org_address, org_desc, causes } = org;

      return (
        <main className="Organization">
          <header>
            <h1>{org_name}</h1>
          </header>

          {renderedError}

          <section className="Organization__contact-info">
            <header>
              <h2>Contact Info</h2>
            </header>

            <p>Website: <a href={website} target="_blank" rel="noreferrer">{website}</a></p>
            <p>Phone: {phone}</p>
            <p>Email: {email}</p>
            <p>Address: {org_address}</p>
          </section>

          <section>
            <header>
              <h2>About {org_name}</h2>
            </header>

            <p className="Organization__description">{org_desc}</p>
          </section>

          <section className="Organization__causes">
            <header>
              <h2>Causes</h2>
            </header>
            
            <ul className="Organization__causes-list">
              {causes.map((cause, index) => (
                <li key={index}>
                  {cause.cause_name}
                </li>
              ))}
            </ul>
          </section>

          <button
            type="button"
            onClick={() => this.handleDelete(orgId)}
          >
            Delete Organization
          </button>
        </main>
      );
    }

    return (
      <main className="Organization">
        {renderedError}
        <p className="Organization__no-org-found">The organization with id {orgId} doesn't exist</p>
      </main>
    );
  }
}

Organization.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};

export default Organization;