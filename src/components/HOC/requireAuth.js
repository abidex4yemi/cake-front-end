import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default (Component) => {
  const RequireAuth = (props) => {
    switch (props.data.auth) {
      case false:
        return <Redirect to="/login" />;
      default:
        return <Component {...props} />;
    }
  };

  const mapStateToProps = ({ data }) => ({ data });

  return connect(mapStateToProps)(RequireAuth);
};
