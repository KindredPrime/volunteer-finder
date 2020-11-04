import React from 'react';

const VolunteerContext = React.createContext({
  user: {},
  users: [],
  loginUser: () => {},
  logoutUser: () => {}
});

export default VolunteerContext;