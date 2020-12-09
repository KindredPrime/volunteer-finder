import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchApiJson } from '../util';
import VolunteerContext from '../VolunteerContext';
import CauseCheckboxes from '../CauseCheckboxes/CauseCheckboxes';
import { checkCause } from '../util';
import ValidationError from '../ValidationError/ValidationError';
import './AddOrg.css';

class AddOrg extends Component {
  static contextType = VolunteerContext;

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
    description: {
      touched: false,
      value: ''
    },
    // Only causes that are checked are kept in the state
    checkedCauses: {
      
    },
    adding: false,
    addError: null
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

  validateCheckedCauses = () => {
    const { checkedCauses } = this.state;

    if (Object.keys(checkedCauses).length === 0) {
      return `You must check at least one cause`;
    }
  }

  orgAlreadyExists = () => {
    const { name, website, phone, email, address } = this.state;
    const { orgs } = this.context;

    return orgs.find((org) => {
      const nameEx = new RegExp(`^${name.value.trim()}$`, 'i');
      if (nameEx.test(org.org_name)) {
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
      if (addressEx.test(org.org_address)) {
        return true;
      }

      return false;
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { addOrg, causes } = this.context;
    const { name, website, phone, email, address, description, checkedCauses } = this.state;

    this.setState({
      adding: true
    });

    const newOrg = { 
      org_name: name.value,
      website: website.value,
      phone: phone.value,
      email: email.value,
      org_address: address.value,
      org_desc: description.value,
      causes: causes.filter((cause) => Object.keys(checkedCauses).find((checkedCause) => checkedCause === cause.cause_name))
    };

    if (this.orgAlreadyExists()) {
      this.setState({
        adding: false,
        addError: new Error('The organization already exists')
      });
    }
    else {
      return fetchApiJson(`/api/orgs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrg)
      })
        .then((org) => {
          const { id } = org;
          addOrg({
            id,
            ...newOrg
          });
          this.props.history.push(`/org/${org.id}`);
        })
        .catch((addError) => {
          this.setState({
            adding: false,
            addError
          });
        });
    }
  }

  render() {
    const { causes, appError, fetching } = this.context;
    const {
      name,
      website,
      phone,
      email,
      address,
      description,
      checkedCauses,
      adding,
      addError
    } = this.state;



    return (
      <main className="AddOrg">
        <header>
          <h1>Add an Organization</h1>
        </header>

        {fetching
          /*
            If the app is waiting for data from the API, only render the fetching message
          */
          ? <p>Fetching causes from the API...</p>
          : appError
            /*
              Else if there's an error with the app, only render content for the error message
            */
            ? <p className="error">
              An error occurred while fetching organizations and causes: {appError.message}. Try refreshing the page.
            </p>
            /*
              Otherwise, render the content for adding an organization
            */
            : <>
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
                  <legend>Contact Info (enter at least one)</legend>

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

                <br />

                <div className="AddOrg__description">
                  <div className="AddOrg__description-form-elements">
                    <label htmlFor="description">Description*</label>
                    <textarea
                      id="description"
                      name="description"
                      onChange={(e) => this.updateField('description', e.target.value)}
                      required
                    />
                  </div>
                  {description.touched && <ValidationError message={this.validateRequiredInput('description')} />}
                </div>

                <br />

                {causes && causes.length > 0 && (
                  <>
                    <CauseCheckboxes 
                      causes={causes}
                      checkedCauses={checkedCauses}
                      handleClick={checkCause(this)}
                      legend="Causes* (select at least one)"
                    />

                    <br />
                  </>
                )}

                <button
                  type="submit"
                  disabled={
                    this.validateRequiredInput('name')
                    || this.validateRequiredInput('description')
                    || this.validateContactInfo()
                    || this.validateCheckedCauses()}
                >
                  Add Organization
                </button>
              </form>

              {adding && <p>Adding...</p>}

              {addError && <p className="error">{addError.message}</p>}
            </>}
      </main>
    );
  }
}

AddOrg.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default AddOrg;