import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getLatestMessage } from 'redux-flash';

const FlashMessages = ({ flash }) => {
  return (
    <StyledFlashMessage flash={flash}>
      {flash && flash.message}
    </StyledFlashMessage>
  );
};

FlashMessages.propTypes = {
  flash: PropTypes.object
};

const mapStateToProps = (state) => ({ flash: getLatestMessage(state) });

export default connect(mapStateToProps)(FlashMessages);

const StyledFlashMessage = styled.div`
  ${({ flash }) =>
    flash &&
    flash.message &&
    `width: 100%;
  height: 40px;
  background: #4cd964;
  border-radius: 2px;
  padding: 1rem;
  text-align: center;
  margin-bottom: 20px;
  color: #fff;`}
`;
