import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { updateProfile } from '../../../state/actions';
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
  const { updatingProfile, user } = props.data;

  const [profile, setProfileValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: ''
  });

  useEffect(() => {
    setProfileValue((prevState) => ({
      ...prevState,
      ...user
    }));
  }, [user]);

  const [errors, setErrors] = useState({});

  const [showEditProfile, setShowEditProfile] = useState(false);

  const inputChange = (field, value) => {
    setProfileValue((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

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
    delete profileData._id;

    props.updateProfile(profileData).then((res) => {
      if (res.data !== undefined && res.status === 201) {
        props.history.push('/dashboard');
      }

      if (res.data !== undefined && res.status === 401) {
        props.history.push('/login');
      }
    });
  };

  return (
    <Dashboard
      showEditProfile={showEditProfile}
      toggleProfileEditCard={toggleProfileEditCard}
      profile={profile}
      errors={errors}
      inputChange={inputChange}
      profileStatus={updatingProfile}
      handleSubmit={handleSubmit}
      setAvatarUrl={inputChange}
    />
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { updateProfile })(DashboardContainer);
