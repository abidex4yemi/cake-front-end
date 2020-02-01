import React from 'react';
import styled from 'styled-components';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  ContainerStyled,
  primary_color,
  secondary_color,
  white,
  boxShadow
} from '../../atom';
import decodeToken from '../../../util/decodeToken';

const Navbar = (props) => {
  const history = useHistory();

  const user = decodeToken();

  const renderAuthLinks = () => {
    if (user.id) {
      return (
        <>
          <li>
            <NavLink
              to="/logout"
              onClick={(evt) => {
                evt.preventDefault();
                localStorage.removeItem('cake-user-token');
                localStorage.removeItem('persist:data-cake');
                history.push('/login');
              }}
            >
              logout
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">profile</NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
          <li>
            <NavLink to="/login">login</NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <HeaderStyled>
      <ContainerStyled>
        <nav role="navigation">
          <NavLink to="/">
            <img
              src="https://image.flaticon.com/icons/svg/660/660503.svg"
              alt="logo"
            />
          </NavLink>

          <ul>{renderAuthLinks()}</ul>
        </nav>
      </ContainerStyled>
    </HeaderStyled>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Navbar);

const HeaderStyled = styled.header`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${white};
  background: ${primary_color}
    linear-gradient(120deg, ${secondary_color} 0, ${primary_color} 100%)
    no-repeat;
  box-shadow: ${boxShadow};

  nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-content: center;

    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        display: inline-block;

        a {
          font-family: Verdana, Geneva, Tahoma, sans-serif;
        }
      }
    }

    img {
      width: 30px;
      height: 30px;
    }
  }
`;
