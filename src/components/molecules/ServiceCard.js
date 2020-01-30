import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  dark,
  white,
  boxShadow,
  medium_space,
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
  const { description, postedDate } = props;

  return (
    <ServiceCardStyled to="/details">
      <p>{description}</p>
      <PostedDateStyled>{postedDate}</PostedDateStyled>
    </ServiceCardStyled>
  );
};

export default ServiceCard;

const ServiceCardStyled = styled(Link)`
  width: 300px;
  height: 300px;
  box-shadow: ${boxShadow};
  padding: ${medium_space};
  background: ${white};
  border-radius: ${borderRadius};
  color: ${dark};
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: box-shadow 83ms;
  }
`;

const PostedDateStyled = styled.p`
  color: rgba(0, 0, 0, 0.6);
  font-size: ${small_font_size};
  margin-bottom: 0.5rem;
`;
