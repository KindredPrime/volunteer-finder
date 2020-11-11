import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/*
  Props:
    - results: the search results to render from
    - pageLimit: how many results can be displayed at once
    - resultType: either 'org' or 'event'
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
    const { results, pageLimit, resultType } = this.props;
    const { page } = this.state;

    const pageResults = this.getPageResults();

    return (
      <section className="SearchResults">
        <header>
          <h2>Results</h2>
        </header>

        <ul>
          {pageResults.map((result) => {
            const { id, name } = result;

            return (
              <li key={`result-${id}`}>
                <Link to={`/${resultType}/${id}`}>{name}</Link>
              </li>
            );
          })}
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
  pageLimit: PropTypes.number.isRequired,
  resultType: PropTypes.oneOf(['org', 'event']).isRequired
};

export default SearchResults;