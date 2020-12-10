import { API_ENDPOINT } from './config';

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
 * Send a request to the API
 *
 * @param {String} route - The route (and query parameters) to add to the end of the API's base
 *  endpoint
 * @param {Object} options - Options for the fetch request
 * @return {Promise}
 */
function fetchApi(route, options={}) {
  return fetch(`${API_ENDPOINT}${route}`, options);
}

/**
 * Send a request to the API and return the JSONified response
 *
 * @param {String} route - The route (and query parameters) to add to the end of the API's base
 *  endpoint
 * @param {Object} options - Options for the fetch request
 * @return {Promise}
 */
function fetchApiJson(route, options={}) {
  return fetchApi(route, options)
    .then((response) => response.json());
}

export {
  checkCause,
  fetchApiJson,
  fetchApi
};