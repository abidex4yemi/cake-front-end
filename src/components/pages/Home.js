import React from 'react';
import styled from 'styled-components';
import { ContainerStyled } from '../atom';
import HeroImg from '../../asset/images/hero-image.jpg';
import ServiceCard from '../molecules/ServiceCard';
import services from '../pages/services';

/**
 * This is a dumb component with no logic
 *
 * @param {*} props
 * @returns {object}
 */
const Home = () => {
  return (
    <main>
      <HeroContainerStyled>
        <ContainerStyled>
          <p>
            Welcome to Lake Tahoe, Lake Tahoe is a large freshwater lake in the
            Sierra Nevada Mountains, straddling the border of California and
            Nevada. It’s known for its beaches and ski resorts. On the southwest
            shore, Emerald Bay State Park contains the 1929 Nordic-style mansion
            Vikingsholm.
          </p>
        </ContainerStyled>
      </HeroContainerStyled>

      <ContainerStyled>
        <StyledHeader>Places to Stay</StyledHeader>
        <MainWrapper>
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </MainWrapper>
      </ContainerStyled>
    </main>
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

    @media screen and (max-width: 760px) {
      width: 95%;
    }
  }
`;

const StyledHeader = styled.p`
  text-align: center;
  margin: 40px 0 0 0;
  font-size: 2em;
  font-weight: bold;
`;

const MainWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 300px;
  flex-wrap: wrap;
  padding: 50px 0;

  @media screen and (max-width: 720px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
