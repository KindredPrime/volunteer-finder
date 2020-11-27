import React from 'react';

const VolunteerContext = React.createContext({
  orgs: [],
  causes: [],
  addOrg: () => {},
  deleteOrg: () => {}
});

export default VolunteerContext;