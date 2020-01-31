import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createProfile } from '../../../state/actions';
import Profile from '../../organisms/Profile';
import validateProfileForm from '../../../util/validateProfileForm';

/**
 * Profile `Container component`
 * Note: container component only contains logic no `JSX`
 * this pattern of composing component allows separation of
 * logic from views
 *
 * @param {*} props
 * @returns {Object}
 */
const Signup = (props) => {
  const { creatingProfile } = props;

  const [profile, setProfileValue] = useState({
    showSecurityQuestions: true,
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
    avatar: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    securityQuestions: {}
  });

  const [errors, setErrors] = useState({});

  const handleFirstQuestion = (data) => {
    setProfileValue((prevState) => {
      return {
        ...prevState,
        securityQuestions: {
          ...prevState.securityQuestions,
          firstQuestion: {
            ...data
          }
        }
      };
    });
  };

  const handleSecondQuestion = (data) => {
    setProfileValue((prevState) => {
      return {
        ...prevState,
        securityQuestions: {
          ...prevState.securityQuestions,
          secondQuestion: {
            ...data
          }
        }
      };
    });
  };

  const handleThirdQuestion = (data) => {
    setProfileValue((prevState) => {
      return {
        ...prevState,
        securityQuestions: {
          ...prevState.securityQuestions,
          thirdQuestion: {
            ...data
          }
        }
      };
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const errors = validateProfileForm(profile);

    if (Object.keys(errors).length) {
      setErrors((prevState) => ({
        ...prevState,
        ...errors
      }));

      return;
    }

    // props.createProfile(profile).then((res) => {
    //   if (res.data !== undefined && res.status === 201) {
    //     return props.history.push('/dashboard');
    //   }
    // });
  };

  const inputChange = (field, value) => {
    setProfileValue({
      ...profile,
      [field]: value
    });
  };

  return (
    <Profile
      errors={errors}
      profile={profile}
      inputChange={inputChange}
      profileStatus={creatingProfile}
      handleSubmit={handleSubmit}
      setAvatarUrl={inputChange}
      handleFirstQuestion={handleFirstQuestion}
      handleSecondQuestion={handleSecondQuestion}
      handleThirdQuestion={handleThirdQuestion}
    />
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { createProfile })(Signup);
