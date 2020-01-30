import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Header, Footer } from '../molecules';
import { ContainerStyled } from '../atom';
import HeroImg from '../../asset/images/hero-image.jpg';
import ServiceCard from '../molecules/ServiceCard';

const services = [
  {
    id: 1,
    description:
      'Welcome to Tahoe South, where you’ll find Lake Tahoe, the largest alpine Lake in North America; deep and wide, bluer than blue and surrounded by the majestic Sierra Nevada Mountains.',
    postedDate: '1 day ago'
  },
  {
    id: 2,
    description:
      'Welcome to Tahoe South, where you’ll find Lake Tahoe, the largest alpine Lake in North America; deep and wide, bluer than blue and surrounded by the majestic Sierra Nevada Mountains.',
    postedDate: '1 day ago'
  },
  {
    id: 3,
    description:
      'Welcome to Tahoe South, where you’ll find Lake Tahoe, the largest alpine Lake in North America; deep and wide, bluer than blue and surrounded by the majestic Sierra Nevada Mountains.',
    postedDate: '1 day ago'
  },
  {
    id: 4,
    description:
      'Welcome to Tahoe South, where you’ll find Lake Tahoe, the largest alpine Lake in North America; deep and wide, bluer than blue and surrounded by the majestic Sierra Nevada Mountains.',
    postedDate: '1 day ago'
  }
];

/**
 * This is a dumb component with no logic
 *
 * @param {*} props
 * @returns {object}
 */
const Home = () => {
  return (
    <>
      <Header>
        <NavLink to="/">
          <img
            src="https://image.flaticon.com/icons/svg/660/660503.svg"
            alt="logo"
          />
        </NavLink>

        <ul>
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
          <li>
            <NavLink to="/login">login</NavLink>
          </li>
        </ul>
      </Header>

      <main>
        <HeroContainerStyled>
          <ContainerStyled>
            <p>
              Welcome to Lake Tahoe, Lake Tahoe is a large freshwater lake in
              the Sierra Nevada Mountains, straddling the border of California
              and Nevada. It’s known for its beaches and ski resorts. On the
              southwest shore, Emerald Bay State Park contains the 1929
              Nordic-style mansion Vikingsholm.
            </p>
          </ContainerStyled>
        </HeroContainerStyled>

        <ContainerStyled>
          <MainWrapper>
            {services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </MainWrapper>
        </ContainerStyled>
      </main>

      <Footer>
        <p>&copy; 2020</p>
        <p>Made by Yemi</p>
      </Footer>
    </>
  );
};

export default Home;

const HeroContainerStyled = styled.div`
  background: url(${HeroImg}) no-repeat center/cover;
  height: 450px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    background: rgba(255, 255, 255, 0.9);
    color: #0f1721;
    padding: 1em;
    border-radius: 3px;
    font-size: 1em;
    font-weight: bold;
    width: 70%;
    margin: auto;
    line-height: 1.5;
    text-align: center;
  }
`;

const MainWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 300px;
  flex-wrap: wrap;
  padding: 50px 0;
`;
