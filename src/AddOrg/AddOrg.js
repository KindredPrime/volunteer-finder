import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VolunteerContext from '../VolunteerContext';
import Nav from '../Nav/Nav';
import EntityCheckboxes from '../EntityCheckboxes/EntityCheckboxes';
import { setCheckboxValue } from '../util';
import ValidationError from '../ValidationError/ValidationError';
import './AddOrg.css';

class AddOrg extends Component {
  static contextType = VolunteerContext;

  // Only causes and tags that are checked are kept in the state
  state = {
    name: {
      touched: false,
      value: ''
    },
    website: {
      touched: false,
      value: ''
    }, 
    phone: {
      touched: false,
      value: ''
    },
    email: {
      touched: false,
      value: ''
    },
    address: {
      touched: false,
      value: ''
    },
    causes: {

    },
    tags: {

    },
    error: null
  };

  updateField = (fieldName, fieldValue) => {
    this.setState({
      [fieldName]: {
        touched: true,
        value: fieldValue
      }
    });
  };

  validateRequiredInput = (fieldName) => {
    const fieldValue = this.state[fieldName].value;

    if (fieldValue.trim().length === 0) {
      return `You must provide a ${fieldName}`;
    }
  }

  validateContactInfo = () => {
    const { website, phone, email, address } = this.state;

    if (
      website.value.trim().length === 0 
      && phone.value.trim().length === 0 
      && email.value.trim().length === 0
      && address.value.trim().length === 0) {
        return `You must fill out at least one contact info field`;
      }
  }

  orgExists = () => {
    const { name, website, phone, email, address } = this.state;
    const { orgs } = this.context;

    return orgs.find((org) => {
      const nameEx = new RegExp(`^${name.value.trim()}$`, 'i');
      if (nameEx.test(org.name)) {
        return true;
      }
      
      const websiteEx = new RegExp(`^${website.value.trim()}/*$`, 'i');
      if (websiteEx.test(org.website)) {
        return true;
      }

      const phoneEx = new RegExp(`^${phone.value.trim()}$`);
      if (phoneEx.test(org.phone)) {
        return true;
      }

      const emailEx = new RegExp(`^${email.value.trim()}$`, 'i');
      if (emailEx.test(org.email)) {
        return true;
      }

      const addressEx = new RegExp(`^${address.value.trim()}$`, 'i');
      if (addressEx.test(org.address)) {
        return true;
      }

      return false;
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, website, phone, email, address, causes, tags } = this.state;
    const { user, addOrg } = this.context;

    if (this.orgExists()) {
      this.setState({
        error: new Error('The organization already exists')
      });
    }
    else {
      const newId = addOrg(
        name.value,
        website.value,
        phone.value,
        email.value,
        address.value,
        Object.entries(causes).map(([cause, __]) => cause), // Converts causes into an array
        Object.entries(tags).map(([tag, __]) => tag),
        user.username
      );

      this.props.history.push(`/org/${newId}`);
    }
  }

  render() {
    const { causes, tags } = this.context;
    const { name, website, phone, email, address, error } = this.state;

    return (
      <div className="AddOrg">
        <Nav />
        <header>
          <h1>Add an Organization</h1>
        </header>

        <form id="AddOrg__form" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="org-name">Name*</label>
            <input 
              type="text"
              id="org-name"
              name="org-name"
              onChange={(e) => this.updateField('name', e.target.value)}
              required
            />
            {name.touched && <ValidationError message={this.validateRequiredInput('name')} />}
          </div>

          <br />

          <fieldset>
            <legend>Contact Info</legend>

            <div>
              <label htmlFor="website">Website</label>
              <input 
                type="text"
                id="website"
                name="website"
                onChange={(e) => this.updateField('website', e.target.value)}
              />
            </div>

            <br />

            <div>
              <label htmlFor="phone">Phone</label>
              <input 
                type="tel"
                id="phone"
                name="phone"
                onChange={(e) => this.updateField('phone', e.target.value)}
              />
            </div>

            <br />

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => this.updateField('email', e.target.value)}
                onBlur={() => this.setState({
                  email: {
                    value: this.state.email.value,
                    touched: true
                  }
                })}
              />
            </div>

            <br />

            <div>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={(e) => this.updateField('address', e.target.value)}
              />
            </div>

            {(website.touched && phone.touched && email.touched && address.touched) && 
              <ValidationError message={this.validateContactInfo()} />}
          </fieldset>

          {causes && causes.length > 0 && (
            <>
              <br />

              <EntityCheckboxes 
                entities={causes} 
                handleClick={setCheckboxValue('causes', this)} 
                type="causes"
                legend="Causes"
              />
            </>
          )}

          {tags && tags.length > 0 && (
            <>
              <br />

              <EntityCheckboxes 
                entities={tags} 
                handleClick={setCheckboxValue('tags', this)} 
                type="tags"
                legend="Tags"
              />
            </>
          )}

          <br />

          <button
            type="submit"
            disabled={
              this.validateRequiredInput('name')
              || this.validateContactInfo()}
          >
            Add Organization
          </button>
        </form>

        {error && <p className="AddOrg__error">{error.message}</p>}
      </div>
    );
  }
}

AddOrg.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default AddOrg;