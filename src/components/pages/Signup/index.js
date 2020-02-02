import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createProfile } from '../../../state/actions';
import Profile from '../../organisms/Profile';
import validateProfileForm from '../../../util/validateProfileForm';
import styled from 'styled-components';
import { ContainerStyled } from '../../atom';

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
    showPasswordField: true,
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
      window.scrollTo(0, 0);
      return;
    }

    const {
      firstQuestion,
      secondQuestion,
      thirdQuestion
    } = profile.securityQuestions;

    delete firstQuestion.id;
    delete secondQuestion.id;
    delete thirdQuestion.id;

    const profileData = {
      ...profile,
      securityQuestions: [firstQuestion, secondQuestion, thirdQuestion]
    };

    delete profileData.showSecurityQuestions;
    delete profileData.confirmPassword;
    delete profileData.showPasswordField;

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
    <ContainerStyled>
      <MainWrapper>
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
      </MainWrapper>
    </ContainerStyled>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { createProfile })(Signup);

const MainWrapper = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 4rem;
`;
