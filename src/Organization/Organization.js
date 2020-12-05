import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VolunteerContext from '../VolunteerContext';
import { fetchApi } from '../util';
import './Organization.css';

class Organization extends Component {
  static contextType = VolunteerContext;

  state = {
    error: null
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
      .catch((error) => {
        this.setState({
          error
        });
      });
  }

  render() {
    const orgId = this.props.match.params.id;
    
    const { orgs } = this.context;
    const org = orgs.find((elem) => elem.id === parseInt(orgId));

    const { error } = this.state;
    const renderedError = error && <p className="error">{error.message}</p>;

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
        <p>No organization found</p>
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