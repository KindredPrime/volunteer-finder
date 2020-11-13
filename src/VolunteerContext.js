import React from 'react';

const VolunteerContext = React.createContext({
  user: {},
  users: [],
  orgs: [],
  causes: [],
  tags: [],
  loginUser: () => {},
  logoutUser: () => {},
  signUpUser: () => {},
  addOrg: () => {}
});

export default VolunteerContext;