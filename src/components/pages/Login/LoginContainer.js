import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../../state/actions';
import Login from './Login';
import validateLoginForm from '../../../util/validateLoginForm';

/**
 * Login `Container component`
 * Note: container component only contains logic no `JSX`
 * this pattern of composing component allows separation of
 * logic from views
 *
 * @param {*} props
 * @returns {Object}
 */
const LoginContainer = (props) => {
  const { loginIn } = props.data;

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const [invalidCredentials, setInvalidCredentials] = useState('');

  const inputChange = (field, value) => {
    setUser({
      ...user,
      [field]: value
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const errors = validateLoginForm(user);

    setErrors(() => errors);

    if (Object.values(errors).length) {
      return;
    }

    props.login(user).then((res) => {
      if (res.data !== undefined && res.status === 200) {
        return props.history.push('/dashboard');
      }

      setInvalidCredentials('Invalid email/password');
    });
  };

  return (
    <Login
      user={user}
      errors={errors}
      inputChange={inputChange}
      loginIn={loginIn}
      handleSubmit={handleSubmit}
      invalidCredentials={invalidCredentials}
    />
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { login })(LoginContainer);
