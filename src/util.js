import { API_ENDPOINT } from './config';

function updateField(fieldName, fieldValue, componentInstance) {
  componentInstance.setState({
    [fieldName]: fieldValue
  });
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
  checkCause,
  fetchApiJson,
  fetchApi
};