import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createProfile } from '../../../state/actions';
import Profile from '../../organisms/Profile';

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
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
    avatar: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    securityQuestions: [
      {
        questionOne: '',
        answer: ''
      },
      {
        questionTwo: '',
        answer: ''
      },
      {
        questionThree: '',
        answer: ''
      }
    ],
    errors: {}
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(profile);
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
      profile={profile}
      inputChange={inputChange}
      profileStatus={creatingProfile}
      handleSubmit={handleSubmit}
      setAvatarUrl={inputChange}
    />
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { createProfile })(Signup);
