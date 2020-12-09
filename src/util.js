import { API_ENDPOINT } from './config';

function updateField(fieldName, fieldValue, componentInstance) {
  componentInstance.setState({
    [fieldName]: fieldValue
  });
}

function todayDate() {
  const now = new Date();
  const todayString = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate().toString().padStart(2, '0')}T00:00:00`;
  return new Date(todayString);
}

function formatDate(date) {
  const dateComponents = date.split(' ');
  const excludingTimestamp = dateComponents.filter((component) => !component.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/))
  return excludingTimestamp.join(' ');
}

/*
  When checked, add the checkbox value to causes in the state
  When unchecked, remove the checkbox value from causes in the state
*/
const checkCause = (componentInstance) => (checkboxName) => {
  let checkedCauses = componentInstance.state.checkedCauses;
  const isChecked = checkedCauses[checkboxName];

  if (isChecked) {
    delete checkedCauses[checkboxName];
  } else {
    checkedCauses = {
      ...checkedCauses,
      [checkboxName]: true
    };
  }

  componentInstance.setState({
    checkedCauses
  });
}

/**
 * Send a request to the API and return the JSONified response
 * 
 * @param {*} route - The route (and query parameters) to add to the end of the API's base endpoint
 * @param {*} options - Options for the fetch request
 */
function fetchApiJson(route, options={}) {
  return fetch(`${API_ENDPOINT}${route}`, options)
    .then((response) => response.json());
}

/**
 * Send a request to the API
 * 
 * @param {*} route - The route (and query parameters) to add to the end of the API's base endpoint
 * @param {*} options 
 */
function fetchApi(route, options={}) {
  return fetch(`${API_ENDPOINT}${route}`, options);
}

export {
  updateField,
  todayDate,
  formatDate,
  checkCause,
  fetchApiJson,
  fetchApi
};