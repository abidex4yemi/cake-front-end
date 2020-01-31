import React from 'react';
import { Redirect } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';

const decodeToken = () => {
  try {
    const token = localStorage.getItem('token');

    const user = jwtDecode(token);

    return user;
  } catch (error) {
    return error.message;
  }
};

export default (Component) => {
  const RequireAuth = (props) => {
    const user = decodeToken();

    if (user && !user.id) {
      return <Redirect to="/login" />;
    }
    return <Component {...props} />;
  };

  return RequireAuth;
};
