import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import {
  ContainerStyled,
  borderRadius,
  medium_space,
  white,
  boxShadow
} from '../atom';

import { Button, Input } from '../molecules';
import Avatar from '../molecules/Avatar';

/**
 * This is a dumb component with no logic
 *
 * @param {*} props
 * @returns {object}
 */
const Profile = (props) => {
  const {
    profile,
    inputChange,
    profileStatus,
    handleSubmit,
    setAvatarUrl
  } = props;

  return (
    <main>
      <ContainerStyled>
        <MainWrapper>
          <FormContainer>
            <h3>Create Account</h3>
            <form onSubmit={handleSubmit}>
              <Avatar setAvatarUrl={setAvatarUrl} profile={profile} />

              <Input
                type="text"
                name="firstName"
                inputChange={inputChange}
                error={profile.errors.firstName}
                value={profile.firstName}
                labelText="First name"
              />

              <Input
                type="text"
                name="lastName"
                inputChange={inputChange}
                error={profile.errors.lastName}
                value={profile.lastName}
                labelText="Last name"
              />

              <Input
                type="email"
                name="email"
                inputChange={inputChange}
                error={profile.errors.email}
                value={profile.email}
                labelText="Email"
              />

              <Input
                type="password"
                name="password"
                inputChange={inputChange}
                error={profile.errors.password}
                value={profile.password}
                labelText="Password"
              />

              <Input
                type="password"
                name="confirmPassword"
                inputChange={inputChange}
                error={profile.errors.confirmPassword}
                value={profile.confirmPassword}
                labelText="Re-Type Password"
              />

              <Input
                type="text"
                name="phoneNumber"
                inputChange={inputChange}
                error={profile.errors.phoneNumber}
                value={profile.phoneNumber}
                labelText="Phone Number"
              />

              <Input
                type="text"
                name="address"
                inputChange={inputChange}
                error={profile.errors.address}
                value={profile.address}
                labelText="Address"
              />

              <Input
                type="date"
                name="dateOfBirth"
                inputChange={inputChange}
                error={profile.errors.dateOfBirth}
                value={profile.dateOfBirth}
                labelText="DateOfBirth"
              />

              <Button
                buttonText={
                  (profileStatus && (
                    <Loader
                      type="ThreeDots"
                      color="#f4f4f4"
                      height={50}
                      width={50}
                    />
                  )) ||
                  'Submit'
                }
                onClick={handleSubmit}
                type="submit"
              />
            </form>
          </FormContainer>
        </MainWrapper>
      </ContainerStyled>
    </main>
  );
};

export default Profile;

const MainWrapper = styled.section`
  display: flex;
  padding: 10rem 0;
  justify-content: space-around;
  align-items: center;
  min-height: calc(100vh - 100px);
`;

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
`;
