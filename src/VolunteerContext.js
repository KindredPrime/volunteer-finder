import React from 'react';

const VolunteerContext = React.createContext({
  user: {},
  users: [],
  orgs: [],
  events: [],
  loginUser: () => {},
  logoutUser: () => {},
  signUpUser: () => {}
});

export default VolunteerContext;