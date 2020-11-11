import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { updateField, getEntitiesById, setCheckboxValue } from '../util';
import VolunteerContext from '../VolunteerContext';
import Nav from '../Nav/Nav';
import EntityCheckboxes from '../EntityCheckboxes/EntityCheckboxes';
import SearchResults from '../SearchResults/SearchResults';

class EventSearch extends Component {
  static contextType = VolunteerContext;

  static defaultProps = {
    pageLimit: 10
  };

  // Only causes and tags that are checked are kept in the state
  state = {
    searchTerm: '',
    orgs: {

    },
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
    const searchOrgs = Object.entries(this.state.orgs);
    const searchCauses = Object.entries(this.state.causes);
    const searchTags = Object.entries(this.state.tags);

    const allOrgs = this.context.orgs;
    const allCauses = this.context.causes;
    const allTags = this.context.tags;
    const allEvents = this.context.events;

    const searchResults = allEvents
      .map((event) => ({
        ...event,
        organization: getEntitiesById([event.organization], allOrgs)[0],
        causes: getEntitiesById(event.causes, allCauses),
        tags: getEntitiesById(event.tags, allTags)
      }))
      .filter((event) => {
        const { name, location, description } = event;
        const eventOrg = event.organization;
        const eventCauses = event.causes;
        const eventTags = event.tags;
        const regEx = new RegExp(searchTerm, 'i');

        return (regEx.test(name) || regEx.test(eventOrg) || regEx.test(location) || regEx.test(description)
          )
          && (searchOrgs.length === 0 || searchOrgs.find(([org, __]) => org === eventOrg.name))
          && (searchCauses.length === 0 || eventCauses
            .find((eventCause) => searchCauses.find(([cause, __]) => (
              cause === eventCause.name
            ))))
          && (searchTags.length === 0 || eventTags
            .find((eventTag) => searchTags.find(([tag, __]) => ( 
              tag === eventTag.name
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
    const { orgs, causes, tags } = this.context;
    const { searchResults, searched } = this.state;
    const { pageLimit } = this.props;

    return (
      <div className="EventSearch">
        <Nav />
        
        <header>
          <h1>Search for Events</h1>
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

          {orgs && orgs.length > 0 && (
            <>
              <EntityCheckboxes 
                entities={orgs} handleClick={setCheckboxValue('orgs', this)}
                type="organizations"
              />

              <br />
            </>
          )}

          {causes && causes.length > 0 && (
            <>
              <EntityCheckboxes 
                entities={causes} handleClick={setCheckboxValue('causes', this)} 
                type="causes" 
              />

              <br />
            </>
          )}

          {tags && tags.length > 0 && (
            <EntityCheckboxes 
              entities={tags} handleClick={setCheckboxValue('tags', this)} 
              type="tags" 
            />
          )}

          <button
            type="submit"
          >
            Search
          </button>
        </form>

        {searched && <SearchResults results={searchResults} pageLimit={pageLimit} />}
      </div>
    );
  }
}

EventSearch.propTypes = {
  pageLimit: PropTypes.number.isRequired
};

export default EventSearch;