import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  dark,
  white,
  boxShadow,
  normal_space,
  borderRadius,
  small_font_size
} from '../atom';

/**
 * This is a dumb component with no logic
 *
 * @param {*} props
 * @returns {object}
 */
const ServiceCard = (props) => {
  const { description, postedDate, imgSrc } = props;

  return (
    <ServiceCardStyled to="/details">
      <img src={imgSrc} alt={description} />
      <p>{description}</p>
      <PostedDateStyled>{postedDate}</PostedDateStyled>
    </ServiceCardStyled>
  );
};

export default ServiceCard;

const ServiceCardStyled = styled(Link)`
  width: 300px;
  height: auto
  box-shadow: ${boxShadow};
  background: ${white};
  border-radius: ${borderRadius};
  color: ${dark};
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    padding: ${normal_space};
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }

  @media screen and (max-width: 720px) {
    width: 95%;
    height: auto
  }

  &:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: box-shadow 83ms;
  }
`;

const PostedDateStyled = styled.p`
  color: rgba(0, 0, 0, 0.6);
  font-size: ${small_font_size};
  margin-bottom: 0.5rem;
  padding: ${normal_space};
`;
