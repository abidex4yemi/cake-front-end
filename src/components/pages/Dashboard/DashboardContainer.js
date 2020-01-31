import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { updateProfile } from '../../../state/actions';
import Profile from '../../organisms/Profile';
import validateProfileForm from '../../../util/validateProfileForm';
import Dashboard from './Dashboard';

/**
 * Profile `Container component`
 * Note: container component only contains logic no `JSX`
 * this pattern of composing component allows separation of
 * logic from views
 *
 * @param {*} props
 * @returns {Object}
 */
const DashboardContainer = (props) => {
  const { updatingProfile } = props.data;

  const [profile, setProfileValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: ''
  });

  useEffect(() => {});

  const [errors, setErrors] = useState({});

  const [showEditProfile, setShowEditProfile] = useState(false);

  const toggleProfileEditCard = () => {
    setShowEditProfile((prevState) => !prevState);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const errors = validateProfileForm(profile);

    setErrors(() => errors);

    if (Object.values(errors).length) {
      return;
    }

    const profileData = {
      ...profile
    };

    delete profileData.showSecurityQuestions;

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
    <Dashboard
      showEditProfile={showEditProfile}
      toggleProfileEditCard={toggleProfileEditCard}
    >
      <Profile
        errors={errors}
        profile={profile}
        inputChange={inputChange}
        profileStatus={updatingProfile}
        handleSubmit={handleSubmit}
        setAvatarUrl={inputChange}
      />
    </Dashboard>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { updateProfile })(DashboardContainer);
