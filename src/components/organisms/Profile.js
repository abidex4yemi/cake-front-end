import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import {
  borderRadius,
  medium_space,
  white,
  boxShadow,
  InputGroupStyled,
  SmallStyled
} from '../atom';

import { Button, Input, Avatar, SecurityQuestion } from '../molecules';
import FlashMessages from '../molecules/FlashMessages';

const questions = [
  { question: 'What is your oldest sibling’s middle name?' },
  { question: 'What is your car’s license plate number?' },
  { question: 'What was your first car’s make and model?' },
  { question: 'What month and day is your anniversary?' },
  { question: 'What was your first car?' },
  { question: 'What is the middle name of your oldest child?' }
];

/**
 * This is a dumb component with no logic
 *
 * @param {*} props
 * @returns {object}
 */
const Profile = (props) => {
  const {
    errors,
    profile,
    inputChange,
    profileStatus,
    handleSubmit,
    setAvatarUrl
  } = props;

  const carTitle = props.profile.showSecurityQuestions
    ? 'Create Account'
    : 'Edit Profile';

  return (
    <FormContainer>
      <h3>{carTitle}</h3>
      <form>
        <Avatar
          setAvatarUrl={setAvatarUrl}
          profile={profile}
          error={errors.avatar}
        />

        <Input
          type="text"
          name="firstName"
          inputChange={inputChange}
          error={errors.firstName}
          value={profile.firstName}
          labelText="First name"
        />

        <Input
          type="text"
          name="lastName"
          inputChange={inputChange}
          error={errors.lastName}
          value={profile.lastName}
          labelText="Last name"
        />

        <Input
          type="email"
          name="email"
          inputChange={inputChange}
          error={errors.email}
          value={profile.email}
          labelText="Email"
        />

        {profile.showPasswordField && (
          <>
            <Input
              type="password"
              name="password"
              inputChange={inputChange}
              error={errors.password}
              value={profile.password}
              labelText="Password"
            />

            <Input
              type="password"
              name="confirmPassword"
              inputChange={inputChange}
              error={errors.confirmPassword}
              value={profile.confirmPassword}
              labelText="Re-Type Password"
            />
          </>
        )}

        <Input
          type="text"
          name="phoneNumber"
          inputChange={inputChange}
          error={errors.phoneNumber}
          value={profile.phoneNumber}
          labelText="Phone Number"
        />

        <Input
          type="text"
          name="address"
          inputChange={inputChange}
          error={errors.address}
          value={profile.address}
          labelText="Address"
        />

        <Input
          type="date"
          name="dateOfBirth"
          inputChange={inputChange}
          error={errors.dateOfBirth}
          value={profile.dateOfBirth}
          labelText="DateOfBirth"
        />

        {profile.showSecurityQuestions && (
          <>
            <p>Choose three(3) security questions</p>
            <SmallStyled>{errors.securityQuestions || ''}</SmallStyled>
            <InputGroupStyled>
              <span>Question 1.</span>
              <SecurityQuestion
                questions={questions}
                getData={props.handleFirstQuestion}
              />
            </InputGroupStyled>

            <InputGroupStyled>
              <small>Question 2.</small>
              <SecurityQuestion
                questions={questions}
                getData={props.handleSecondQuestion}
              />
            </InputGroupStyled>

            <InputGroupStyled>
              <small>Question 3.</small>
              <SecurityQuestion
                questions={questions}
                getData={props.handleThirdQuestion}
              />
            </InputGroupStyled>
          </>
        )}
        <FlashMessages />
        {props.sessionExpired && (
          <StyledSessionExpire>
            <SmallStyled style={{ textAlign: 'center' }}>
              {props.sessionExpired}
            </SmallStyled>
          </StyledSessionExpire>
        )}
        <Button
          buttonText={
            (profileStatus && (
              <Loader type="TailSpin" color="#f4f4f4" height={35} width={35} />
            )) ||
            'Submit'
          }
          onClick={handleSubmit}
          type="button"
        />
      </form>
    </FormContainer>
  );
};

export default Profile;

const FormContainer = styled.div`
  width: 400px;
  box-shadow: ${boxShadow};
  border-radius: ${borderRadius};
  padding: 4rem;
  background: ${white};

  h3 {
    margin-bottom: ${medium_space};
    text-align: center;
  }

  button[type='submit'] {
    line-height: 20px;
  }
`;

const StyledSessionExpire = styled.p`
  text-align: center;
  margin-bottom: 5px;
`;
