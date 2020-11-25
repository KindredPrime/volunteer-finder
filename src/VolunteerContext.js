import React from 'react';

const VolunteerContext = React.createContext({
  orgs: [],
  causes: [],
  addOrg: () => {}
});

export default VolunteerContext;