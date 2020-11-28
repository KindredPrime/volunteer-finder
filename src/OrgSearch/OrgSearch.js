import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { updateField, checkCause, fetchApiJson } from '../util';
import VolunteerContext from '../VolunteerContext';
import Nav from '../Nav/Nav';
import CauseCheckboxes from '../CauseCheckboxes/CauseCheckboxes';
import SearchResults from '../SearchResults/SearchResults';

class OrgSearch extends Component {
  static contextType = VolunteerContext;

  static defaultProps = {
    pageLimit: 10
  };

  // Only causes that are true are kept in the state
  state = {
    term: '',
    checkedCauses: {

    },
    searchResults: [],
    page: 1,
    searched: false,
    error: null
  };

  validateCheckedCauses = () => {
    const { checkedCauses } = this.state;

    if (Object.keys(checkedCauses).length === 0) {
      return `You must check at least one cause`;
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const term = this.state.term || '';
    const causes = Object.keys(this.state.checkedCauses);

    const route = `/api/orgs`;
    const queryParams = `term=${term}&causes=${causes.join(',')}`;

    return fetchApiJson(`${route}?${queryParams}`)
      .then((orgs) => {
        this.setState({
          searched: true,
          searchResults: orgs,
          error: null
        })
      })
      .catch((error) => {
        this.setState({
          searched: false,
          error
        });
      });
  }

  render() {
    // Every time the component is rendered, it grabs the current context for the app's causes
    // to render dynamically on the page.
    const { causes } = this.context;
    const { searchResults, searched, error } = this.state;
    const { pageLimit } = this.props;

    return (
      <div className="OrgSearch">
        <Nav />
        
        <main>
          <header>
            <h1>Search for Organizations</h1>
          </header>

          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="search-term">Search Term</label>
              <input 
                type="text"
                id="search-term"
                onChange={(e) => updateField('term', e.target.value, this)}
              />
            </div>

            <br />

            {causes && causes.length > 0 && (
              <>
                <CauseCheckboxes 
                  causes={causes}
                  handleClick={checkCause(this)}
                  legend="Causes (select at least one)"
                />

                <br />
              </>
            )}

            <button
              type="submit"
              disabled={this.validateCheckedCauses()}
            >
              Search
            </button>
          </form>

          {error && <p className="error">{error.message}</p>}

          {searched && (
            <SearchResults results={searchResults} pageLimit={pageLimit} />
          )}
        </main>
      </div>
    );
  }
}

OrgSearch.propTypes = {
  pageLimit: PropTypes.number.isRequired
};

export default OrgSearch;