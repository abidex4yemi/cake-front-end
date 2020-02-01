import React from 'react';
import { Redirect } from 'react-router-dom';
import decodeToken from '../../util/decodeToken';

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
