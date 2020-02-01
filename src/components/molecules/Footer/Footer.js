import React from 'react';
import styled from 'styled-components';
import { ContainerStyled, dark, small_font_size } from '../../atom';

export const Footer = (props) => {
  return (
    <FooterStyled>
      <ContainerStyled>
        <section>
          <p>&copy; 2020</p>
          <p>Made by Yemi</p>
        </section>
      </ContainerStyled>
    </FooterStyled>
  );
};

const FooterStyled = styled.footer`
  height: 50px;
  font-size: ${small_font_size};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${dark};
  border-top: 1px solid ${dark};

  section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
`;
