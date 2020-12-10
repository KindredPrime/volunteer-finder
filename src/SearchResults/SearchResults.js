import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchResults.css';

/**
 * Renders a list of organizations search results
 *
 * Props:
 *   results: the search results to render from
 *   pageLimit: how many results can be displayed at once
 */
class SearchResults extends Component {
  static defaultProps = {
    pageLimit: 10
  };

  state = {
    page: 1
  };

  getPageResults = () => {
    const { results, pageLimit } = this.props;
    const { page } = this.state;

    const startIndex = (page - 1) * pageLimit;
    return results.slice(startIndex, startIndex + pageLimit);
  }

  onLastPage = () => {
    const { results, pageLimit } = this.props;
    const { page } = this.state;
    const totalPages = Math.ceil(results.length / pageLimit);
    return page === totalPages;
  }

  render() {
    const { results, pageLimit } = this.props;
    const { page } = this.state;

    const pageResults = this.getPageResults();

    // Grab the URL of the page the Search Results are being rendered on, minus the React Route path
    const endOfBaseUrl = window.location.href.lastIndexOf(window.location.pathname);
    const baseUrl = window.location.href.substring(0, endOfBaseUrl);

    return (
      <section className="SearchResults">
        <header>
          <h2>Results</h2>
        </header>

        <ul>
          {pageResults.length > 0
            ? pageResults.map((result) => {
              const { id, org_name } = result;

              return (
                <li key={`result-${id}`}>
                  {/*
                    Open the link in a new tab, so the user doesn't lose all of their other search
                    results
                  */}
                  <a
                    href={`${baseUrl}/org/${id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {org_name}
                  </a>
                </li>
              );
            })
            : <p>No organizations found</p>
          }
        </ul>

        {results.length > pageLimit && (
          <div className="SearchResults__page-buttons">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => this.setState({
                page: page - 1
              })}
            >
              Previous
            </button>

            <button
              type="button"
              disabled={this.onLastPage()}
              onClick={() => this.setState({
                page: page + 1
              })}
            >
              Next
            </button>
          </div>
        )}
      </section>
    )
  }
}

SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number
  })).isRequired,
  pageLimit: PropTypes.number.isRequired
};

export default SearchResults;