import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { checkCause, fetchApiJson } from '../util';
import VolunteerContext from '../VolunteerContext';
import CauseCheckboxes from '../CauseCheckboxes';
import SearchResults from '../SearchResults';
import './index.css';

class OrgSearch extends Component {
  static contextType = VolunteerContext;

  static defaultProps = {
    pageLimit: 10
  };

  state = {
    term: '',

    // Only causes that are checked are kept in the state
    checkedCauses: {

    },
    searchResults: [],
    page: 1,
    isSearching: false,
    hasSearched: false,
    error: null
  };

  updateField = (fieldName, fieldValue) => {
    this.setState({
      [fieldName]: fieldValue
    });
  }

  validateCheckedCauses = () => {
    const { checkedCauses } = this.state;

    if (Object.keys(checkedCauses).length === 0) {
      return `You must check at least one cause`;
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      isSearching: true
    });

    const term = this.state.term || '';
    const causes = Object.keys(this.state.checkedCauses);

    const route = `/api/orgs`;
    const queryParams = `term=${term}&causes=${causes.join(',')}`;

    return fetchApiJson(`${route}?${queryParams}`)
      .then((orgs) => {
        this.setState({
          isSearching: false,
          hasSearched: true,
          searchResults: orgs,
          error: null
        })
      })
      .catch((error) => {
        this.setState({
          isSearching: false,
          hasSearched: false,
          error
        });
      });
  }

  render() {
    const { orgs, causes, appError, isFetching } = this.context;
    const usedCauses = causes.filter((cause) => orgs.find((org) => {
        return org.causes.find((elem) => elem.cause_name === cause.cause_name);
      })
    );

    const { checkedCauses, searchResults, isSearching, hasSearched } = this.state;
    const searchError = this.state.error;
    const { pageLimit } = this.props;

    return (
      <main className="OrgSearch">
        <header>
          <h1>Search for Organizations</h1>
        </header>

        {isFetching

          /*
            If the app is waiting for data from the API, only render the fetching message
          */
          ? <p className="fetching">Fetching data from the API...</p>
          : appError

            /*
              Else if there's an error with the app, only render content for the error message
            */
            ? <p className="error">
              {`An error occurred while fetching organizations and causes: ` +
              `${appError.message}. Try refreshing the page.`}
            </p>
            : usedCauses.length === 0

              /*
                If there aren't any causes being used by any organizations, then assume there
                aren't any organizations in the database, and only render content directing the
                user how to create some organizations.
              */
              ? <p className="OrgSearch__no-orgs">
                There aren't any organizations. Feel free to <Link to="/add-org">add some</Link>
              </p>

              /*
                Otherwise, render the content for searching for organizations
              */
              : <>
                <form onSubmit={this.handleSubmit}>
                  <div>
                    <label htmlFor="search-term">Search Term</label>
                    <input
                      type="text"
                      id="search-term"
                      onChange={(e) => this.updateField('term', e.target.value)}
                    />
                  </div>

                  <br />

                  <CauseCheckboxes
                    causes={usedCauses}
                    checkedCauses={checkedCauses}
                    handleClick={checkCause(this)}
                    legend="Causes (select at least one)"
                  />

                  <br />

                  <button
                    type="submit"
                    disabled={this.validateCheckedCauses()}
                  >
                    Search
                  </button>
                </form>

                {searchError && <p className="error">{searchError.message}</p>}

                {isSearching && <p>Searching...</p>}

                {hasSearched && (
                  <SearchResults results={searchResults} pageLimit={pageLimit} />
                )}
              </>}
      </main>
    );
  }
}

OrgSearch.propTypes = {
  pageLimit: PropTypes.number.isRequired
};

export default OrgSearch;