import React from 'react';

const VolunteerContext = React.createContext({
  orgs: [],
  causes: [],
  addOrg: () => {},
  deleteOrg: () => {},
  appError: null,

  // Is the app fetching data from the API?
  isFetching: false
});

export default VolunteerContext;