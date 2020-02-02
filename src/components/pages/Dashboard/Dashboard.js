import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  small_space,
  dark,
  white,
  lightGrey,
  boxShadow,
  medium_space,
  light,
  borderRadius
} from '../../atom';

import { Button } from '../../molecules';
import Profile from '../../organisms/Profile';

/**
 * This is a dumb component with no logic
 *
 * @param {*} props
 * @returns {object}
 */
const Dashboard = (props) => {
  const {
    toggleProfileEditCard,
    showEditProfile,
    errors,
    profile,
    inputChange,
    profileStatus,
    handleSubmit,
    setAvatarUrl,
    sessionExpired
  } = props;

  return (
    <DashboardStyled>
      <MainWrapper>
        <LeftAside>
          <ProfileImageContainer>
            <img src={profile.avatar} alt={`${profile.firstName} avatar`} />
          </ProfileImageContainer>

          <ActionBar>
            <li>
              <Button
                buttonText="Edit profile"
                onClick={toggleProfileEditCard}
                type="button"
              />
            </li>
            <li>
              <Button
                buttonText={<Link to="/reset-password">Reset password</Link>}
                onClick={toggleProfileEditCard}
                type="button"
              />
            </li>
          </ActionBar>
        </LeftAside>

        <MainSection>
          {showEditProfile && (
            <Profile
              errors={errors}
              profile={profile}
              inputChange={inputChange}
              profileStatus={profileStatus}
              handleSubmit={handleSubmit}
              setAvatarUrl={setAvatarUrl}
              sessionExpired={sessionExpired}
            />
          )}
        </MainSection>
      </MainWrapper>
    </DashboardStyled>
  );
};

export default Dashboard;

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 760px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 100px);
  }
`;

const DashboardStyled = styled.div``;

const LeftAside = styled.aside`
  margin-top: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${lightGrey};
  min-height: calc(100vh - 100px);
  width: 350px;
  box-shadow: ${boxShadow};
  padding: ${medium_space};

  @media screen and (max-width: 760px) {
    margin: 20px 0;
    min-height: 200px;
  }

  a {
    color: ${white};
    display: block;
    padding: 5px;

    &:hover {
      color: #283e4a;
    }
  }
`;

const ActionBar = styled.ul`
  list-style: none;
  border-radius: ${borderRadius};
  margin: ${small_space} 0;
  display: flex;
  align-items: center;
  justify-content: center;

  li {
    margin: ${small_space};
  }

  li a {
    padding: 0;
  }

  li button {
    margin-bottom: ${small_space};
    background: #283e4a;
    border-radius: ${borderRadius};
    width: 150px;
    padding: 0;
    transition: 0.2s;
    border: 1px solid transparent;

    &:hover {
      border: 1px solid #283e4a;
      background: ${white};
      color: #283e4a;
    }
  }
`;

const MainSection = styled.section``;

const ProfileImageContainer = styled.div`
  padding: ${small_space};
  background: ${light};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 150px;
    height: 150px;
    border: 1px solid ${dark};
    border-radius: 50%;
  }
`;
