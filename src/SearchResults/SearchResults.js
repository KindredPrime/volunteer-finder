import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
                <Link to={`/org/${id}`}>{name}</Link>
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
    id: PropTypes.number,
    name: PropTypes.string,
    website: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    description: PropTypes.string,
    causes: PropTypes.arrayOf(PropTypes.number),
    tags: PropTypes.arrayOf(PropTypes.number)
  })).isRequired,
  pageLimit: PropTypes.number.isRequired
};

export default SearchResults;