import React from 'react';

const VolunteerContext = React.createContext({
  user: {},
  users: [],
  orgs: [],
  events: [],
  causes: [],
  tags: [],
  loginUser: () => {},
  logoutUser: () => {},
  signUpUser: () => {},
  addOrg: () => {}
});

export default VolunteerContext;