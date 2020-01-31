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
  const { creatingProfile } = props.data;

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

    setErrors(() => errors);

    if (Object.values(errors).length) {
      return;
    }

    const {
      firstQuestion,
      secondQuestion,
      thirdQuestion
    } = profile.securityQuestions;

    const profileData = {
      ...profile,
      securityQuestions: [firstQuestion, secondQuestion, thirdQuestion]
    };

    delete profileData.showSecurityQuestions;
    delete profileData.confirmPassword;

    props.createProfile(profileData).then((res) => {
      if (res.data !== undefined && res.status === 201) {
        return props.history.push('/dashboard');
      }

      if (res.response.status === 409) {
        setErrors((prevState) => ({
          ...prevState,
          email: 'email already in use, please login to continue'
        }));
      }
    });
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
