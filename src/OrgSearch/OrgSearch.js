import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { updateField, setCheckboxValue } from '../util';
import VolunteerContext from '../VolunteerContext';
import Nav from '../Nav/Nav';
import EntityCheckboxes from '../EntityCheckboxes/EntityCheckboxes';
import SearchResults from '../SearchResults/SearchResults';

class OrgSearch extends Component {
  static contextType = VolunteerContext;

  static defaultProps = {
    pageLimit: 10
  };

  // Only causes/tags that are true are kept in the state
  state = {
    searchTerm: '',
    causes: {

    },
    tags: {

    },
    searchResults: [],
    page: 1,
    searched: false
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { searchTerm } = this.state;
    const searchCauses = Object.entries(this.state.causes);
    const searchTags = Object.entries(this.state.tags);
    
    const allOrgs = this.context.orgs;

    const searchResults = allOrgs
      .filter((org) => {
        const { name, address, description } = org;
        const orgCauses = org.causes;
        const orgTags = org.tags;
        const regEx = new RegExp(searchTerm, 'i');

        return (regEx.test(name) || regEx.test(address) || regEx.test(description))
          && (searchCauses.length === 0 || orgCauses
            .find((orgCause) => searchCauses.find(([cause, __]) => (
              cause === orgCause
            ))))
          && (searchTags.length === 0 || orgTags
            .find((orgTag) => searchTags.find(([tag, __]) => ( 
              tag === orgTag
            ))));
      });

    this.setState({
      searchResults,
      searched: true
    });
  }

  render() {
    // Every time the component is rendered, it grabs the current context for the app's causes and 
    //  tags, to render dynamically on the page.
    const { causes, tags } = this.context;
    const { searchResults, searched } = this.state;
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
                onChange={(e) => updateField('searchTerm', e.target.value, this)}
              />
            </div>

            <br />

            {causes && causes.length > 0 && (
              <>
                <EntityCheckboxes 
                  entities={causes}
                  handleClick={setCheckboxValue('causes', this)} 
                  type="causes"
                  legend="Causes (all are selected by default)"
                />

                <br />
              </>
            )}

            {tags && tags.length > 0 && (
              <EntityCheckboxes 
                entities={tags}
                handleClick={setCheckboxValue('tags', this)} 
                type="tags" 
                legend="Tags (all are selected by default)"
              />
            )}

            <button
              type="submit"
            >
              Search
            </button>
          </form>

          {searched && (
            <SearchResults results={searchResults} pageLimit={pageLimit} resultType='org' />
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